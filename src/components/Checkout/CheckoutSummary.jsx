import { formatPriceFull } from "../../utils/price";

export default function CheckoutSummary({
  product,
  priceFull,
  adminFee,
  totalPayment,
  children,
}) {
  return (
    <div className="w-full flex flex-col gap-5 md:gap-6 rounded-[10px] bg-other-primarybg border border-other-border p-5 md:p-6">
      <h5 className="font-pop font-semibold text-lg md:text-xl text-text-dark-primary">
        Ringkasan Pesanan
      </h5>

      <div className="flex justify-between">
        <p className="text-text-dark-secondary">{product.title}</p>
        <p className="font-bold text-text-dark-secondary">
          {priceFull.formatted.final}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-text-dark-secondary">Biaya Admin</p>
        <p className="font-bold text-text-dark-secondary">
          {formatPriceFull(adminFee)}
        </p>
      </div>

      <div className="border-t border-other-border" />

      <div className="flex justify-between">
        <p className="font-bold text-text-dark-primary">Total Pembayaran</p>
        <p className="font-semibold text-main-primary">
          {formatPriceFull(totalPayment)}
        </p>
      </div>

      {children}
    </div>
  );
}
