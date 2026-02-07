import { useMemo } from "react";

import { useAuth } from "../context/AuthContext";


/**
 * @param {Array} products - hasil normalizeProductForView / Lists
 */
export function useProductsByRole(products = []) {
  const { user } = useAuth();

  const visibleProducts = useMemo(() => {
    if (!user) return [];

    // ADMIN → SEMUA
    if (user.role === "admin") {
      return products;
    }

    // INSTRUCTOR → MILIK SENDIRI
    return products.filter(
      (product) =>
        String(product.instructor?.id) === String(user.id),
    );
  }, [products, user]);

  return {
    products: visibleProducts,
    isAdmin: user?.role === "admin",
    isInstructor: user?.role === "instructor",
  };
}
