import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ErrorBoundary from "./components/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";


export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastContainer position="top-right" limit={3} />
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
