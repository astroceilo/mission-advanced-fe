import { mapUserRole } from "../role/mapUserRole";
import { getUserAvatar } from "../getUserAvatar";


export const normalizeUser = (user) => {
  if (!user) return null;

  const firstName = user.firstName ?? "User";
  const lastName = user.lastName ?? "";

  const avatar = getUserAvatar(user);

  return {
    id: String(user.id),
    email: user.email,

    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),

    avatar,

    company: user.company?.name ?? "-",
    position: user.company?.title ?? "-",

    gender: user.gender,
    phone: user.phone,

    role: mapUserRole(user.role),
  };
};
