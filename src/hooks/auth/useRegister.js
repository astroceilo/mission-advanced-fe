import { api } from "../../services/api";


export function useRegister() {
  const register = async (form) => {
    try {
      const res = await api.post("/auth/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        gender: form.gender,
        phone: form.phone,
      });

      return {
        user: res.data.user,
        token: res.data.accessToken,
      };
    } catch (err) {
      if (err.response?.status === 409) {
        throw new Error("EMAIL_EXISTS");
      }

      throw new Error("REGISTER_FAILED");
    }
  };

  return { register };
}
