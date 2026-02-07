import { mapUserRole } from "../role/mapUserRole";


export const normalizeUserForLists = (user) => {
  if (!user) return null;

  const firstName = user.firstName ?? "User";
  const lastName = user.lastName ?? "";

  return {
    id: String(user.id),
    email: user.email,

    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),

    company: user.company?.name ?? "-",
    position: user.company?.title ?? "-",


    role: mapUserRole(user.role),
  };
};
