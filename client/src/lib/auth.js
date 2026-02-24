export const isAdminUser = (user) =>
  Boolean(user?.isUserAdmin || user?.isAdmin || user?.role === "admin");

export const getPostAuthRedirect = (redirectTo, user) => {
  if (!isAdminUser(user)) return redirectTo;
  if (!redirectTo || redirectTo === "/" || redirectTo === "/dashboard") {
    return "/admin-dashboard";
  }
  return redirectTo;
};

