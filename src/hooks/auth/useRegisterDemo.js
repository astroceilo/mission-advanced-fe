import { dummyApi } from "../../services/api";


export function useRegisterDemo() {
  const checkEmailExists = async (email) => {
    const res = await dummyApi.get("/users");
    return res.data.users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  };

  const registerDemo = async (form) => {
    const emailExists = await checkEmailExists(form.email);

    if (emailExists) {
      throw new Error("EMAIL_EXISTS");
    }

    // fake payload (not really saved on server)
    const data = {
      fullName: form.fullName,
      email: form.email,
      gender: form.gender,
      phone: form.phone,
      role: "user",
    };

    console.log("REGISTER DEMO PAYLOAD:", data);

    return data;
  };

  return { registerDemo };
}
