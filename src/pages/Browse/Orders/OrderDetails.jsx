import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchOrders, updateOrderStatus } from "../../../store/orderSlice";
import OrderResultCompleted from "./components/OrderResultCompleted";
import OrderResultDeferred from "./components/OrderResultDeffered";

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
      const timer = setTimeout(() => {
        dispatch(
          updateOrderStatus({
            id: order.id,
            status: "paid",
          }),
        );
      }, 5000);

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

  if (!loading && list.length === 0) {
    return <div>Pesanan tidak ditemukan</div>;
  }

  return <div>Status tidak dikenal</div>;
}
