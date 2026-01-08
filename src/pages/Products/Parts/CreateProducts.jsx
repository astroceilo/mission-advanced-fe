export default function CreateProducts() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) {
      toast.error("Masih ada data yang belum valid. Periksa kembali input.");
      return;
    }

    const parsed = parsePhoneNumberFromString(form.phone || "");
    if (!parsed || !parsed.isValid()) {
      toast.error("Nomor telepon tidak valid!");
      return;
    }

    try {
      // cek email
      const checkEmail = await api.get("/users");

      const isExist = checkEmail.data.some(
        (u) => u.email === form.email.trim()
      );

      if (isExist) {
        toast.warning("Email sudah terdaftar");
        return;
      }

      // register
      const res = await api.post("/users", {
        fullName: form.fullName,
        email: form.email,
        gender: form.gender,
        phone: parsed.number,
        password: form.password,
        avatar: null,
        role: "student",
      });

      toast.success("Pendaftaran berhasil! 🎉", { autoClose: 2000 });

      login(res.data);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err, "Terjadi kesalahan server. Coba lagi.");
      // console.error(err);

      // console.log("STATUS:", err.response?.status);
      // console.log("URL:", err.config?.url);
      // console.log("PARAMS:", err.config?.params);
      // console.log("RESPONSE:", err.response?.data);
    }

    // setPayload(data);
  };

  return (
    <>
      {/* Section Create Products */}
      <section className="relative w-full flex flex-col gap-6 md:gap-8!">
        {/* Title */}
        <div className="w-fit flex flex-col gap-2.5">
          <h3 className="font-pop font-semibold text-2xl md:text-[32px]! leading-[1.1] tracking-[0] text-text-dark-primary">
            Buat Product Baru
          </h3>
        </div>
        {/* End Title */}

        <div className="flex flex-col gap-4 md:gap-6!">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 text-left"
          >
            <div className="flex flex-col gap-3 md:gap-4!">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="fullName"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Nama Lengkap <span className="text-error-default">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Lengkap"
                  className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-400"
                      : "border-other-border focus:ring-primary-400"
                  }
                        ${
                          form.fullName === ""
                            ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                            : "text-text-dark-primary"
                        }`}
                  required
                />
                {/* Error Message */}
                {errors.fullName && (
                  <span className="text-red-500 text-sm">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-other-border focus:ring-primary-400"
                  }
                        ${
                          form.email === ""
                            ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                            : "text-text-dark-primary"
                        }
                        `}
                  required
                />
                {/* Error Message */}
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="gender"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>

                <GenderDropdown
                  value={form.gender}
                  onChange={(val) => handleCustomChange("gender", val)}
                  errors={
                    typeof errors.gender === "string" ? errors.gender : ""
                  }
                />
              </div>

              {/* Number Phone */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  No. Hp <span className="text-red-500">*</span>
                </label>

                <PhoneInputCustom
                  value={form.phone}
                  onChange={(val) => handleCustomChange("phone", val)}
                  errors={typeof errors.phone === "string" ? errors.phone : ""}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Kata Sandi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    // onChange={handlePasswordChange}
                    onChange={handleChange}
                    placeholder="Masukkan kata sandi"
                    className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                      errors.password
                        ? "border-red-500 focus:ring-red-400"
                        : "border-other-border focus:ring-primary-400"
                    }
                          ${
                            form.password === ""
                              ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                              : "text-text-dark-primary"
                          }`}
                    required
                  />

                  {/* Tombol toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center justify-center p-1.5 transition cursor-pointer"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={showPassword ? "eye-off" : "eye"}
                        initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        {showPassword ? (
                          <Eye className="w-6 h-6 text-text-dark-secondary" />
                        ) : (
                          <EyeOff className="w-6 h-6 text-text-dark-disabled" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
                {/* Error Message */}
                {errors.password &&
                  (Array.isArray(errors.password) ? (
                    <ul className="text-red-500 text-sm list-disc list-inside">
                      Password must meet the following requirements:
                      {errors.password.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-red-500 text-sm">
                      {errors.password}
                    </span>
                  ))}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="block font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary"
                >
                  Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi kata sandi"
                    className={`w-full font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] border rounded-md px-3 py-2 focus:ring-2 focus:outline-none transition ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-400"
                        : "border-other-border focus:ring-primary-400"
                    }
                          ${
                            form.confirmPassword === ""
                              ? "placeholder:text-text-dark-disabled text-text-dark-disabled"
                              : "text-text-dark-primary"
                          }`}
                    required
                  />

                  {/* Tombol toggle */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-2 flex items-center justify-center p-1.5 transition cursor-pointer"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={showConfirmPassword ? "eye-off" : "eye"}
                        initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        {showConfirmPassword ? (
                          <Eye className="w-6 h-6 text-text-dark-secondary" />
                        ) : (
                          <EyeOff className="w-6 h-6 text-text-dark-disabled" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
                {/* Error Message */}
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="text-right">
                <Link
                  to="#"
                  className="font-dm font-medium text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary hover:text-text-dark-primary"
                >
                  Lupa Password?
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Button Login */}
              <Link
                to="/login"
                className="w-full rounded-[10px] text-center bg-main-primary hover:bg-transparent py-2.5 px-[26px] font-dm font-bold text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-light-primary hover:text-main-primary border border-main-primary transition cursor-pointer"
              >
                Masuk
              </Link>

              {/* Button Register */}
              <button
                type="submit"
                className="w-full rounded-[10px] text-center bg-main-primary-100 hover:bg-transparent py-2.5 px-[26px] font-dm font-bold text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-main-primary hover:text-main-primary border border-transparent hover:border-main-primary transition cursor-pointer"
              >
                Daftar
              </button>
            </div>

            {/* {payload && (
                      <pre className="mt-4 text-xs text-left bg-gray-100 p-2 rounded">
                        {JSON.stringify(payload, null, 2)}
                      </pre>
                    )} */}
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2.5">
            <hr className="grow border-other-border border-t-2" />
            <span className="font-dm font-normal text-sm md:text-base! leading-[1.4] tracking-[0.2px] text-text-dark-secondary">
              atau
            </span>
            <hr className="grow border-other-border border-t-2" />
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center rounded-[10px] border border-other-border bg-text-light-primary px-2 py-2.5 gap-2 font-dm font-bold text-sm md:text-base! text-text-dark-secondary hover:text-text-dark-primary transition cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Masuk dengan Google
          </button>
        </div>
      </section>
      {/* End Section Card */}
    </>
  );
}
