export const isAdminUser = (user) =>
  Boolean(user?.isUserAdmin || user?.isAdmin || user?.role === "admin");

export const getPostAuthRedirect = (redirectTo, user) => {
  if (isAdminUser(user)) {
    if (!redirectTo || redirectTo === "/" || redirectTo === "/dashboard" || redirectTo === "/squads") {
      return "/admin-dashboard";
    }
    return redirectTo;
  }

  if (!redirectTo || redirectTo === "/" || redirectTo === "/dashboard") {
    return "/squads";
  }

  return redirectTo;
};

