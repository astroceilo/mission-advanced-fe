export const serializeUserPayload = (form) => {
  return {
    firstName: form.firstName?.trim() || null,
    lastName: form.lastName?.trim() || null,
    email: form.email?.trim(),
    phone: form.phone?.trim() || null,
    gender: form.gender || null,
    role: form.role, // ex.: "admin", "instructor", "student"
    company_id: form.companyId || null,
  };
};
