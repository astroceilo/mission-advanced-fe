import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import CheckoutStepper from "../../../../components/Checkout/CheckoutStepper";
import deferred from "../../../../assets/images/payments/deferred.webp";
import { resetCheckout } from "../../../../store/checkoutSlice";

export default function OrderResultFailed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderDetails = () => {
    dispatch(resetCheckout());
    navigate("/orders", { replace: true });
  };
  return (
    <>
      <CheckoutStepper />
      <section className="mx-auto w-full mt-0 md:mt-8 flex flex-col justify-center md:flex-row gap-6 md:gap-9">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full md:w-[608px]! flex flex-col rounded-xl pt-3 md:pt-6! pb-8 md:pb-16! px-5 md:px-9! bg-other-primarybg border border-other-border"
        >
          <motion.img
            src={deferred}
            alt="Failed Payment"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-[280px] md:w-[562px]! h-[210px] md:h-[421.5px]!"
          />

          <div className="w-full flex flex-col items-center gap-4 md:gap-6!">
            <div className="w-full flex flex-col items-center gap-1.5 md:gap-3!">
              <h4 className="font-pop font-semibold text-xl md:text-2xl! leading-[1.2] text-text-dark-primary">
                Pembayaran Gagal!
              </h4>
              <p className="font-pop font-semibold text-xl md:text-2xl! leading-[1.2] text-text-dark-primary">
                Buat Pesanan Baru
              </p>
              <p className="font-dm font-normal text-base md:text-lg leading-[1.4] text-center text-text-dark-secondary">
                Silakan cek email kamu untuk informasi lebih lanjut. Hubungi
                kami jika ada kendala.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOrderDetails()}
              className="w-full md:w-auto rounded-[10px] px-6 py-3 md:py-3.5! bg-main-primary hover:bg-white text-white hover:text-main-primary focus:ring focus:ring-main-primary border border-main-primary font-dm font-medium text-sm md:text-base transition-colors duration-200 cursor-pointer"
            >
              Lihat Detail Pesanan
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}
