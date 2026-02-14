import { useLocation } from "react-router-dom";


const steps = [
  { label: "Metode", path: "/checkout/method" },
  { label: "Bayar", path: "/checkout/payment" },
  { label: "Selesai", path: "/orders/detail" },
];

export function useCheckoutStep() {
  const { pathname } = useLocation();
  const active =
    pathname.startsWith("/orders/detail")
      ? 2
      : steps.findIndex((s) => pathname.startsWith(s.path));

  return { steps, active };
}
