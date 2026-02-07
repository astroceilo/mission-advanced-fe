/* eslint-disable react-hooks/refs */
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { authActions, publicMenu } from "../HeaderMenuItems";
import HeaderMenuDropdown from "./HeaderMenuDropdown";
import useDropdown from "../../../hooks/useDropdown";

export default function HeaderHomeLogout() {
  const mobile = useDropdown();

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {/* Navigation links */}
        <nav className="flex items-center gap-9">
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-other-border rounded-[10px] bg-other-basebg md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
            {publicMenu.map((menu) => (
              <li key={menu.label}>
                <NavLink
                  to={menu.href}
                  className="block py-2 px-3 text-text-dark-secondary hover:text-text-dark-primary text-other-body-medium-h3 transition-colors duration-300 ease-in-out"
                >
                  {menu.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex md:gap-4">
          <Link
            to={authActions.login.href}
            className="text-white hover:text-main-primary bg-main-primary hover:bg-white border border-main-primary focus:ring focus:ring-main-primary shadow-xs text-other-body-medium-h1 rounded-[10px] px-[26px] py-2.5 focus:outline-none transition-colors duration-300 ease-in-out"
          >
            {authActions.login.label}
          </Link>
          <Link
            to={authActions.register.href}
            className="text-main-primary hover:text-white bg-white hover:bg-main-primary border border-main-primary focus:ring focus:ring-main-primary shadow-xs text-other-body-medium-h1 rounded-[10px] px-[26px] py-2.5 focus:outline-none transition-colors duration-300 ease-in-out"
          >
            {authActions.register.label}
          </Link>
        </div>
      </div>

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
        <HeaderMenuDropdown
          open={mobile.open}
          width="100%"
          offsetY="20px"
          rounded="0px"
        >
          {publicMenu.map((menu) => (
            <Link
              key={menu.label}
              to={menu.href}
              className="block w-full px-4 py-3 border border-other-border text-other-body-medium-h3 text-text-dark-secondary hover:text-text-dark-primary transition-colors duration-300 ease-in-out"
            >
              {menu.label}
            </Link>
          ))}

          <div className="flex flex-col items-center gap-4 px-4 py-3">
            <Link
              to={authActions.login.href}
              className="w-full text-white hover:text-main-primary bg-main-primary hover:bg-white border border-main-primary text-other-body-medium-h1 rounded-[10px] px-4 py-2 text-center transition-colors duration-300"
            >
              {authActions.login.label}
            </Link>
            <Link
              to={authActions.register.href}
              className="w-full text-main-primary hover:text-white bg-white hover:bg-main-primary border border-main-primary text-other-body-medium-h1 rounded-[10px] px-4 py-2 text-center transition-colors duration-300"
            >
              {authActions.register.label}
            </Link>
          </div>
        </HeaderMenuDropdown>
      </div>
    </>
  );
}
