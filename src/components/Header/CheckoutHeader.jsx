import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

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
        <div className="hidden md:flex w-[486px] justify-end">
          {steps.map((s, i) => {
            const isCompleted = i < active;
            const isActive = i === active;

            return (
              <div key={s.label} className="flex items-center flex-1 gap-3">
                {/* Step */}
                <div className="flex items-center gap-3">
                  <span
                    className={`relative w-[30px] h-[30px] flex items-center justify-center rounded-full border-[3px] transition-all
                      ${
                        isCompleted
                          ? "bg-main-primary border-main-primary"
                          : isActive
                            ? "border-main-primary"
                            : "border-text-dark-disabled"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-full h-full text-text-light-primary" />
                    ) : (
                      <span
                        className={`w-4 h-4 rounded-full ${
                          isActive ? "bg-main-primary" : "bg-text-dark-disabled"
                        }`}
                      />
                    )}
                  </span>

                  <span
                    className={
                      isCompleted || isActive
                        ? "font-dm font-bold text-sm text-text-dark-primary"
                        : "font-dm font-bold text-sm text-text-dark-secondary"
                    }
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 w-[73.5px] h-[3px] ${
                      i < active ? "bg-main-primary" : "bg-text-dark-disabled"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
