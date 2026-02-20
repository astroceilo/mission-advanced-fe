export const authActions = {
  login: {
    label: "Login",
    href: "/login",
  },
  register: {
    label: "Register",
    href: "/register",
  },
};

export const publicMenu = [{ label: "Kategori", href: "/products" }];

export const roleMenu = {
  instructor: [
    {
      label: "Menu Instruktur",
      children: [
        { label: "Produk Kursus Saya", href: "/instructor/product-lists" },
        { label: "Produk Kursus Baru", href: "/instructor/products/create" },
        // { label: "Kurikulum", href: "/instructor/curriculum" },
        // { label: "Quiz & Tugas", href: "/instructor/assignments" },
      ],
    },
  ],

  admin: [
    {
      label: "Menu Admin",
      children: [
        { label: "Pengguna", href: "/admin/users" },
        { label: "Semua Produk Kursus", href: "/admin/product-lists" },
        { label: "Produk Kursus Baru", href: "/admin/products/create" },
      ],
    },
  ],
};

export const accountMenu = {
  student: [
    { label: "Profile Saya", href: "/profile" },
    { label: "Kelas Saya", href: "/class" },
    { label: "Pesanan Saya", href: "/orders" },
    { label: "Pengaturan", href: "/settings" },
    { label: "Keluar", action: "logout" },
  ],

  instructor: [
    { label: "Profile Saya", href: "/profile" },
    { label: "Kelas Saya", href: "/class" },
    { label: "Pesanan Saya", href: "/orders" },
    { label: "Pengaturan", href: "/settings" },
    { label: "Keluar", action: "logout" },
  ],

  admin: [
    { label: "Profile Saya", href: "/profile" },
    { label: "Kelas Saya", href: "/class" },
    { label: "Pesanan Saya", href: "/orders" },
    { label: "Pengaturan", href: "/settings" },
    { label: "Keluar", action: "logout" },
  ],
};
