/* eslint-disable react-hooks/refs */
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

import { publicMenu, roleMenu } from "../HeaderMenuItems";
import { useAuth } from "../../../context/AuthContext";
import HeaderMenuDropdown from "./HeaderMenuDropdown";
import useDropdown from "../../../hooks/useDropdown";
import HeaderProfile from "./HeaderProfile";

export default function HeaderHomeLogin({ handleLogout }) {
  const { user } = useAuth();

  const role = user?.role;
  const roleMenus = roleMenu[role] || [];

  const mobileMenus = [
    ...publicMenu,
    ...roleMenus.flatMap((m) => m.children || []),
  ];

  const mobile = useDropdown();

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {/* Navigation links */}
        <nav className="flex items-center gap-9">
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-other-border rounded-[10px] bg-other-basebg md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
            {/* Public Menu */}
            {publicMenu.map((menu) => (
              <NavLink
                key={menu.label}
                to={menu.href}
                className="block py-2 px-3 text-text-dark-secondary hover:text-text-dark-primary text-other-body-medium-h3 transition-colors duration-300 ease-in-out"
              >
                {menu.label}
              </NavLink>
            ))}
            {/* End Public Menu */}

            {/* Role Menu Dropdown */}
            {roleMenus.map((menu) => {
              const dropdown = useDropdown();

              return (
                <div
                  key={menu.label}
                  ref={dropdown.ref}
                  className="relative"
                  onMouseEnter={dropdown.openDropdown}
                  onMouseLeave={dropdown.close}
                >
                  {/* Toggle Menu Dropdown  */}
                  <button className="block py-2 px-3 text-text-dark-secondary hover:text-text-dark-primary text-other-body-medium-h3 transition-colors duration-300 ease-in-out">
                    {menu.label}
                  </button>

                  {/* Menu Dropdown  */}
                  <HeaderMenuDropdown open={dropdown.open} width="220px">
                    {menu.children.map((item) => (
                      <motion.div
                        key={item.label}
                        whileHover={{
                          backgroundColor: "rgba(247,248,249,1)",
                          scale: 1.02,
                        }}
                        transition={{ duration: 0.15 }}
                      >
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block w-full font-dm font-medium text-base leading-[1.4] tracking-[0.2px] border-b border-other-border px-4 py-3 text-text-dark-secondary hover:text-text-dark-primary transition-colors duration-300 ease-in-out"
                          onClick={dropdown.close}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </HeaderMenuDropdown>
                </div>
              );
            })}
            {/* End Role Menu Dropdown */}
          </ul>
          <HeaderProfile handleLogout={handleLogout} />
        </nav>
        {/* End Navigation links */}
      </div>
      {/* End Desktop */}

      {/* Mobile */}
      <div ref={mobile.ref} className="md:hidden">
        {/* Mobile menu toggle button */}
        <button
          className="overflow-hidden p-2 rounded focus:outline-none"
          onClick={mobile.toggle}
        >
          <span className="sr-only">Open main menu</span>
          {mobile.open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobile.open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute w-full top-20 left-0 right-0 bg-white shadow-lg z-20 overflow-hidden"
              style={{
                boxShadow:
                  "rgba(62, 67, 74, 0.31) 0px 0px 1px 0px, rgba(62, 67, 74, 0.15) 0px 18px 28px 0px",
              }}
            >
              <nav className="flex flex-col">
                {mobileMenus.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{
                      backgroundColor: "rgba(247,248,249,1)",
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block w-full font-dm font-medium text-base leading-[1.4] tracking-[0.2px] border-b border-other-border px-4 py-3 text-text-dark-secondary hover:text-text-dark-primary transition-colors duration-300 ease-in-out"
                      onClick={mobile.close}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.button
                  type="button"
                  whileHover={{
                    backgroundColor: "rgba(255, 240, 240, 1)",
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.15 }}
                  className="flex w-full font-dm font-medium text-base leading-[1.4] tracking-[0.2px] items-center gap-[5px] px-4 py-3 text-main-tertiary-400 cursor-pointer"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Keluar
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* End Mobile */}
    </>
  );
}
