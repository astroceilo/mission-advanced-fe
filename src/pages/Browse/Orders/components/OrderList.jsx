import { Link } from "react-router-dom";

import { formatPriceFull } from "../../../../utils/price";
import { formatDateTime } from "../../../../utils/date";
import Chip from "../../../../components/Chip";

export default function OrderList({ order }) {
  const paymentTime =
    order.status === "paid" || order.status === "failed"
      ? order.updatedAt
      : order.createdAt;

  return (
    <div className="w-full flex flex-col rounded-[10px] border border-other-border">
      {/* Header */}
      <div className="w-full flex flex-row justify-between items-center py-2 md:py-4! px-2.5 md:px-5! rounded-t-[10px] bg-[rgba(226,252,217,0.2)] border-b border-other-border">
        <div className="w-fit flex flex-row gap-3 md:gap-6!">
          {/* No. Invoice */}
          <div className="flex flex-row gap-1 md:gap-2!">
            <span className="font-dm font-medium text-base md:text-lg! leading-[1.4] text-text-dark-secondary">
              No. Invoice:
            </span>
            <Link to={`/orders/detail/${order.invoice}`}>
              <span className="font-dm font-medium text-base md:text-lg! leading-[1.4] text-info-default">
                {order.invoice}
              </span>
            </Link>
          </div>

          {/* Waktu Pembayaran */}
          <div className="flex flex-row gap-1 md:gap-2!">
            <span className="font-dm font-medium text-base md:text-lg! leading-[1.4] text-text-dark-secondary">
              Waktu Pembayaran:
            </span>
            <span className="font-dm font-medium text-base md:text-lg! leading-[1.4] text-text-dark-secondary">
              {formatDateTime(paymentTime)}
            </span>
          </div>
        </div>

        <Chip status={order.status} />
      </div>
      {/* End Header */}

      {/* Body */}
      <div className="w-full flex flex-row items-center p-2.5 md:p-5! gap-5 md:gap-9! bg-other-primarybg border-b border-other-border">
        <div className="w-[523.5px] flex flex-row items-center gap-2 md:gap-4!">
          <img
            src={order.thumbnail}
            alt={order.thumbnail}
            className="w-[52px] h-[52px] rounded-[10px] object-cover"
          />
          <Link to={`/orders/detail/${order.invoice}`}>
            <span className="w-[455px] font-dm font-medium text-base md:text-lg! leading-[1.4] text-text-dark-primary">
              {order.productTitle}
            </span>
          </Link>
        </div>
        <div className="w-0.5 h-[52px] border border-other-border" />
        <div className="w-fit flex flex-col gap-2 md:gap-4!">
          <span className="w-fit font-dm font-medium text-sm md:text-base! leading-[1.4] text-text-dark-secondary">
            Harga
          </span>
          <span className="w-fit font-pop font-semibold text-base md:text-lg! leading-[1.2] text-text-dark-primary">
            {formatPriceFull(order.totalPayment)}
          </span>
        </div>
      </div>
      {/* End Body */}

      {/* Footer */}
      <div className="w-full flex flex-row items-center py-2 md:py-4! px-2.5 md:px-5! gap-5 md:gap-9! bg-[rgba(226,252,217,0.2)]">
        <span className="w-[523.5px] font-dm font-medium text-sm md:text-base! leading-[1.4] text-text-dark-secondary">
          Total Pembayaran
        </span>
        <div className="w-0.5 h-[22px] border border-other-border" />
        <span className="w-fit font-pop font-semibold text-base md:text-lg! leading-[1.2] text-main-primary">
          {formatPriceFull(order.totalPayment)}
        </span>
      </div>
      {/* End Footer */}
    </div>
  );
}
