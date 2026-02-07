import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingScreen from "../components/LoadingScreen";
import Forbidden from "../pages/Errors/Forbidden";
import ErrorLayout from "../layouts/ErrorLayout";
import NotFound from "../pages/Errors/NotFound";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

// Home/Public pages
const Home = lazy(() => import("../pages/Browse/Home"));
const BrowseProducts = lazy(() => import("../pages/Browse/Products"));
const BrowseProductDetails = lazy(
  () => import("../pages/Browse/Products/ProductDetails"),
);

// Product Management (Protected) pages
const ListProducts = lazy(() => import("../pages/Dashboard/Products"));
const ProductDetails = lazy(
  () => import("../pages/Dashboard/Products/ProductDetails"),
);
const NewProducts = lazy(
  () => import("../pages/Dashboard/Products/CreateProducts"),
);
const UpdateProducts = lazy(
  () => import("../pages/Dashboard/Products/UpdateProducts"),
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
          <Route path="/products" element={<BrowseProducts />} />
          <Route
            path="/products/detail/:slug"
            element={<BrowseProductDetails />}
          />
        </Route>

        {/* Auth pages (public) */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout bgClass="bg-[rgba(255,253,243)]" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Instructor routes */}
        <Route element={<ProtectedRoute allow={["instructor"]} />}>
          <Route element={<DashboardLayout bgClass="bg-[rgba(255,253,243)]" />}>
            <Route
              path="/instructor/product-lists"
              element={<ListProducts />}
            />
            <Route
              path="/instructor/products/detail/:slug"
              element={<ProductDetails />}
            />
            <Route
              path="/instructor/products/create"
              element={<NewProducts />}
            />
            <Route
              path="/instructor/products/update/:id/:slug"
              element={<UpdateProducts />}
            />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allow={["admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/product-lists" element={<ListProducts />} />
            <Route
              path="/admin/products/detail/:slug"
              element={<ProductDetails />}
            />
            <Route path="/admin/products/create" element={<NewProducts />} />
            <Route
              path="/admin/products/update/:id/:slug"
              element={<UpdateProducts />}
            />
            {/* <Route path="/admin/users" element={<Users />} /> */}
          </Route>
        </Route>

        {/* Error pages */}
        <Route element={<ErrorLayout />}>
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
