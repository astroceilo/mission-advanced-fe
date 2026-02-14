import "./index.css";
import "flowbite";

import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";

import { AuthProvider } from "./context/AuthContext";
import { persistor, store } from "./store";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
