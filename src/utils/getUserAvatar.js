export const getUserAvatar = (user) =>
  user.image ??
  (user.firstName || user.lastName
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      )}`
    : "/user-round.svg");
