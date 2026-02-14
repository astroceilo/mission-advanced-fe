import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  product: null,
  // quantity: 1,
  payment: {
    method: null,
    // provider: null,
    number: null,
    expiredAt: null,
  },
  isCheckoutCompleted: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
      state.payment = { method: null, number: null, expiredAt: null };
      state.isCheckoutCompleted = false;
    },

    setPaymentMethod(state, action) {
      state.payment.method = action.payload;
      state.payment.number = null;
      state.payment.expiredAt = null;
    },

    setPaymentDetail(state, action) {
      state.payment.number = action.payload.paymentNumber;
      state.payment.expiredAt = action.payload.expiredAt;
    },

    setCheckoutCompleted(state, action) {
      state.isCheckoutCompleted = action.payload;
    },

    resetCheckout() {
      return initialState;
    },
  },
});

export const {
  setProduct,
  setPaymentMethod,
  setPaymentDetail,
  setCheckoutCompleted,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
