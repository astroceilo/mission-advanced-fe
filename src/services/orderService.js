import { mockApi } from "./api";


export const getOrders = async () => {
  const res = await mockApi.get("/orders");
  return res.data;
};

export const createOrderApi = async (data) => {
  const res = await mockApi.post("/orders", data);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await mockApi.put(`/orders/${id}`, {
    status,
    updatedAt: new Date().toISOString(),
  });
  return res.data;
};
