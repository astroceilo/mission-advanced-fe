import { normalizeUserForLists } from "./normalizeUserForLists";
import { getUserAvatar } from "../getUserAvatar";


export const normalizeUserForDetails = (user) => {
  if (!user) return null;

  const avatar = getUserAvatar(user);

  return {
    ...normalizeUserForLists(user),
    gender: user.gender ?? "-",
    phone: user.phone ?? "-",
    avatar,
  };
};
