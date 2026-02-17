import { Outlet } from "react-router-dom";

import CheckoutHeader from "../components/Header/CheckoutHeader";


export default function CheckoutLayout({ bgClass }) {
  return (
    <>
      <CheckoutHeader />

      <div className={`min-h-screen w-full ${bgClass}`}>
        <main className="mx-auto max-w-[1440px] w-full flex flex-col gap-6 md:gap-12! lg:gap-16! px-5 md:px-10! lg:px-30! py-7 md:py-12! lg:py-16!">
          <Outlet />
        </main>
      </div>
    </>
  );
}
