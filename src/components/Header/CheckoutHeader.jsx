import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCheckoutStep } from "../../hooks/useCheckoutStep";
import logo from "../../assets/images/logo.png";

export default function CheckoutHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { steps, active } = useCheckoutStep();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-other-border bg-white backdrop-blur-md transition-all 
      ${scrolled ? "bg-white/70 shadow-[0_2px_10px_rgba(0,0,0,0.06)]" : ""}`}
    >
      <div className="h-20 max-w-[1440px] mx-auto flex items-center justify-between md:gap-9 px-5 md:px-10! lg:px-[120px]! py-4 md:py-3.5! lg:py-3!">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="sr-only">Home</span>
          <img
            src={logo}
            className="w-[152px] h-[42px] md:w-[194.5px]! md:h-12! lg:w-[237px]! lg:h-14! object-contain"
            alt="Videobelajar Logo"
          />
        </Link>

        {/* Desktop stepper */}
        <div className="hidden md:flex w-[486px] gap-4">
          {steps.map((s, i) => {
            const isCompleted = i < active;
            const isActive = i === active;

            return (
              <div key={s.label} className="flex items-center flex-1">
                {/* Step */}
                <div className="flex items-center gap-3">
                  <span
                    className={`
              w-6 h-6 flex items-center justify-center rounded-full border
              ${
                isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : isActive
                    ? "border-green-500 ring-4 ring-green-200 text-green-600"
                    : "border-gray-300 text-gray-400"
              }
            `}
                  >
                    {isCompleted ? "✓" : i + 1}
                  </span>

                  <span
                    className={
                      isCompleted || isActive
                        ? "font-dm font-bold text-sm text-text-dark-primary"
                        : "font-dm font-medium text-sm text-text-dark-secondary"
                    }
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 ${
                      i < active ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile step */}
      {/* <div className="md:hidden px-5 py-2 border-t text-sm">
        Step {active + 1} dari {steps.length} – {steps[active]?.label}
      </div> */}
    </header>
  );
}
