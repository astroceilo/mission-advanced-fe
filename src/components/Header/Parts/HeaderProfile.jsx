import { LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
/* eslint-disable react-hooks/refs */
import { motion } from "framer-motion";

import { useAuth } from "../../../context/AuthContext";
import HeaderMenuDropdown from "./HeaderMenuDropdown";
import useDropdown from "../../../hooks/useDropdown";
import { accountMenu } from "../HeaderMenuItems";

export default function HeaderProfile({ handleLogout }) {
  const { user } = useAuth();
  const profile = useDropdown();
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [user?.avatar]);

  const role = user?.role || "student";
  const menus = accountMenu[role] || [];

  return (
    <div ref={profile.ref} className="relative w-10 h-10">
      <button
        onClick={profile.toggle}
        className="overflow-hidden rounded-md cursor-pointer"
      >
        <span className="sr-only">Profile menu</span>
        {user && !error ? (
          <img
            src={user?.avatar}
            alt={user?.fullname || "User"}
            className="size-10 object-cover rounded-[10px]"
            onError={() => setError(true)}
          />
        ) : (
          <div className="flex items-center justify-center size-10 hover:bg-gray-100 rounded-[10px]">
            <UserRound className="w-6 h-6 text-gray-500" />
          </div>
        )}
      </button>

      {/* Menu Profile Dropdown */}
      <HeaderMenuDropdown open={profile.open} width="200px">
        {menus.map((item) => {
          // Logout
          if (item.action === "logout") {
            return (
              <motion.button
                key={item.label}
                whileHover={{
                  backgroundColor: "rgba(255, 240, 240, 1)",
                  scale: 1.02,
                }}
                transition={{ duration: 0.15 }}
                className="flex w-full font-dm font-medium text-base leading-[1.4] tracking-[0.2px] items-center gap-[5px] px-4 py-3 text-main-tertiary-400 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                {item.label}
              </motion.button>
            );
          }

          // Menu Dropdown
          return (
            <motion.div
              key={item.label}
              whileHover={{
                backgroundColor: "rgba(247,248,249,1)",
                scale: 1.02,
              }}
              transition={{ duration: 0.15 }}
            >
              <Link
                to={item.href}
                className="block w-full font-dm font-medium text-base leading-[1.4] tracking-[0.2px] border-b border-other-border px-4 py-3 text-text-dark-secondary hover:text-text-dark-primary transition-colors duration-300 ease-in-out"
                role="menuitem"
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </HeaderMenuDropdown>
      {/* End Menu Profile Dropdown */}
    </div>
  );
}
