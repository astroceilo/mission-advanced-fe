import { useMemo } from "react";

import { useAuth } from "../../context/AuthContext";


export function useMenuByRole(menus = []) {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) return [];

    return menus.filter((menu) => {
      if (!menu.roles) return true;
      return menu.roles.includes(user.role);
    });
  }, [menus, user]);
}
