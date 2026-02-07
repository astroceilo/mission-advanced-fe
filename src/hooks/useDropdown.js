import { useRef, useState } from "react";

import useClickOutsideMulti from "./useClickOutsideMulti";


export default function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const openDropdown = () => setOpen(true);
  const toggle = () => setOpen((p) => !p);
  const close = () => setOpen(false);

  useClickOutsideMulti([ref], close);

  return {
    open,
    openDropdown,
    toggle,
    close,
    ref,
  };
}
