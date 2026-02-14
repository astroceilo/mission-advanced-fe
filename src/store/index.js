import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import checkoutReducer from "./checkoutSlice";
import orderReducer from "./orderSlice";


const persistConfig = {
  key: "checkout",
  storage,
};

const persistedReducer = persistReducer(persistConfig, checkoutReducer);

export const store = configureStore({
  reducer: {
    checkout: persistedReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
