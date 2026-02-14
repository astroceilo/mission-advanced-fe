import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { updateOrderStatus as updateOrderStatusApi } from "../services/orderService";
import { getOrders, createOrderApi } from "../services/orderService";


export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }) => {
    return await updateOrderStatusApi(id, status);
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    return await getOrders();
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
    return await createOrderApi(orderData);
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (o) => o.id === action.payload.id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default orderSlice.reducer;
