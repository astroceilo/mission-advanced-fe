import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchOrders, updateOrderStatus } from "../../../store/orderSlice";
import OrderResultCompleted from "./components/OrderResultCompleted";
import OrderResultDeferred from "./components/OrderResultDeffered";
import OrderResultFailed from "./components/OrderResultFailed";

export default function OrderDetails() {
  const { invoice } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.orders);
  const order = list.find((o) => o.invoice === invoice);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchOrders());
    }
  }, [list.length, dispatch]);

  useEffect(() => {
    if (!loading && list.length > 0 && !order) {
      navigate("/orders", { replace: true });
    }
  }, [loading, list.length, order, navigate]);

  // simulate payment gateaway
  useEffect(() => {
    if (order?.status === "pending") {
      const random = Math.random();

      let delay;
      let finalStatus;

      if (random < 0.6) {
        // fast delay
        delay = Math.floor(Math.random() * 3000) + 1000; // 1–4 second
        finalStatus = "paid";
      } else if (random < 0.85) {
        // medium delay
        delay = Math.floor(Math.random() * 4000) + 4000; // 4-8 second
        finalStatus = "paid";
      } else {
        // failed
        delay = Math.floor(Math.random() * 4000) + 3000; // 3–7 second
        finalStatus = "failed";
      }

      const timer = setTimeout(() => {
        // console.log("Dispatching update:", finalStatus);

        dispatch(
          updateOrderStatus({
            id: order.id,
            status: finalStatus,
          }),
        );
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [order, dispatch]);

  if (loading) return null;
  if (!order) return null;

  if (order.status === "paid") {
    return <OrderResultCompleted />;
  }

  if (order.status === "pending") {
    return <OrderResultDeferred />;
  }

  if (order.status === "failed") {
    return <OrderResultFailed />;
  }

  if (!loading && list.length === 0) {
    return <div>Pesanan tidak ditemukan</div>;
  }

  return <div>Status tidak dikenal</div>;
}
