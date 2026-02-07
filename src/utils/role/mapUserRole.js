export const MAP_USER_ROLE = {
  admin: "admin",
  moderator: "instructor",
  user: "student",
};

export const mapUserRole = (role) =>
  MAP_USER_ROLE[String(role).toLowerCase()] ?? "student";
