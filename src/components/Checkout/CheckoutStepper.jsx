import { Check } from "lucide-react";

import { useCheckoutStep } from "../../hooks/useCheckoutStep";


export default function CheckoutStepper({ classStyle = "" }) {
  const { steps, active } = useCheckoutStep();

  return (
    <div className={`md:hidden bg-transparent ${classStyle}`}>
      <div className="flex items-center justify-between w-full">
        {steps.map((step, i) => {
          const isCompleted = i < active;
          const isActive = i === active;

          return (
            <div key={step.label} className="flex-1 flex items-center gap-3">
              {/* Row circle + connector */}
              <div className="flex items-center gap-3">
                {/* Circle */}
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

                {/* Label */}
                <span
                  className={
                    isCompleted || isActive
                      ? "font-dm font-bold text-sm text-text-dark-primary"
                      : "font-dm font-bold text-sm text-text-dark-secondary"
                  }
                >
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 w-full h-[3px] ${
                    i < active ? "bg-main-primary" : "bg-text-dark-disabled"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
