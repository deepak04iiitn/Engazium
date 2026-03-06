import mongoose from "mongoose";
import Squad from "../models/squad.model.js";
import SquadMember from "../models/squadMember.model.js";

export const removeUserFromAllSquads = async (userId) => {
  const memberships = await SquadMember.find({ user: userId }, { squad: 1 }).lean();

  const affectedSquadIds = [
    ...new Set(memberships.map((m) => m.squad?.toString()).filter(Boolean)),
  ];

  const removedMemberships = await SquadMember.deleteMany({ user: userId });

  // Also clean stale block references for deleted users.
  await Squad.updateMany({ blockedUsers: userId }, { $pull: { blockedUsers: userId } });

  if (affectedSquadIds.length === 0) {
    return {
      affectedSquads: 0,
      removedMemberships: removedMemberships.deletedCount || 0,
    };
  }

  const affectedObjectIds = affectedSquadIds.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const [counts, squads] = await Promise.all([
    SquadMember.aggregate([
      { $match: { squad: { $in: affectedObjectIds } } },
      { $group: { _id: "$squad", memberCount: { $sum: 1 } } },
    ]),
    Squad.find({ _id: { $in: affectedObjectIds } }, { _id: 1, maxMembers: 1 }).lean(),
  ]);

  const countMap = {};
  counts.forEach((item) => {
    countMap[item._id.toString()] = item.memberCount;
  });

  const maxMembersMap = {};
  squads.forEach((s) => {
    maxMembersMap[s._id.toString()] = s.maxMembers;
  });

  const bulkUpdates = affectedObjectIds.map((squadId) => {
    const memberCount = countMap[squadId.toString()] || 0;
    const maxMembers = maxMembersMap[squadId.toString()] || 1;
    const status = memberCount >= maxMembers ? "Full" : "Active";
    return {
      updateOne: {
        filter: { _id: squadId },
        update: { $set: { memberCount, status } },
      },
    };
  });

  if (bulkUpdates.length > 0) {
    await Squad.bulkWrite(bulkUpdates);
  }

  return {
    affectedSquads: affectedSquadIds.length,
    removedMemberships: removedMemberships.deletedCount || 0,
  };
};


