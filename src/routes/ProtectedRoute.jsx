import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allow }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />; // atau loading screen

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  // console.log("ProtectedRoute check:", {
  //   role: user?.role,
  //   allow,
  // });

  return <Outlet />;
}
