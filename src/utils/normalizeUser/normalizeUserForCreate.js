import { mapUserRole } from "../role/mapUserRole";


export const normalizeUserForUpdate = (form) => {
  if (!form) return null;

  const firstName = form.firstName ?? "User";
  const lastName = form.lastName ?? "";

  const avatar =
    form.image ??
    (firstName || lastName
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(`${firstName} ${lastName}`.trim())}`
      : "/user-round.svg");

  return {
    id: String(form.id),
    email: form.email,

    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),

    avatar,

    company: form.company?.name ?? "-",
    position: form.company?.title ?? "-",

    gender: form.gender,
    phone: form.phone,

    role: mapUserRole(form.role),
  };
};
