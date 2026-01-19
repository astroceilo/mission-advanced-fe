import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import DashboardLayout from "../layouts/DashboardLayout.jsx";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

// Home/Public pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));

// Product Management (Protected) pages
const DetailProducts = lazy(
  () => import("../pages/Products/Parts/DetailProducts.jsx"),
);
const ListProducts = lazy(
  () => import("../pages/Products/Parts/ListProducts.jsx"),
);
const NewProducts = lazy(
  () => import("../pages/Products/Parts/CreateProducts.jsx"),
);
const UpdateProducts = lazy(
  () => import("../pages/Products/Parts/UpdateProducts.jsx"),
);

// Auth pages
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public pages */}
        <Route element={<MainLayout bgClass="bg-[rgba(255,253,243)]" />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
        </Route>

        {/* Auth pages (public) */}
        <Route element={<AuthLayout bgClass="bg-[rgba(255,253,243)]" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout bgClass="bg-[rgba(255,253,243)]" />}>
            <Route path="/list-products" element={<ListProducts />} />
            <Route
              path="/list-products/detail-products/:slug"
              element={<DetailProducts />}
            />
            <Route
              path="/list-products/create-products"
              element={<NewProducts />}
            />
            <Route
              path="/list-products/update-products/:id/:slug"
              element={<UpdateProducts />}
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
