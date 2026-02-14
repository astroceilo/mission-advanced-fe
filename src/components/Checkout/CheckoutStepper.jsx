import { useCheckoutStep } from "../../hooks/useCheckoutStep";

export default function CheckoutStepper({ classStyle = "" }) {
  const { steps, active } = useCheckoutStep();

  return (
    <div
      className={`md:hidden rounded-[10px] border bg-transparent p-4 ${classStyle}`}
    >
      <div className="flex justify-between gap-2">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className={`flex flex-col items-center flex-1 text-center ${
              i <= active ? "text-primary" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border mb-1 ${
                i <= active ? "border-primary" : "border-gray-300"
              }`}
            >
              {i + 1}
            </div>
            <span className="text-xs">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
