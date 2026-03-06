export const metadata = {
  title: "Admin Dashboard - Engazium",
  description:
    "Manage users, squads, moderation, and platform operations from the Engazium admin dashboard.",
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
