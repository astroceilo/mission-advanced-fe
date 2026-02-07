import { getUserAvatar } from "../getUserAvatar";


export const normalizeInstructor = (user) => {
  if (!user) return null;

  const firstName = user.firstName ?? "User";
  const lastName = user.lastName ?? "";

  const avatar = getUserAvatar(user);

  return {
    id: String(user.id),
    fullName: `${firstName} ${lastName}`.trim(),
    avatar,
    company: user.company?.name ?? "-",
    position: user.company?.title ?? "-",
  };
};
