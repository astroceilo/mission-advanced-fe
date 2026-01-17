import { useEffect, useState } from "react";

export default function usePaginationDelta() {
  const getDelta = () => (window.innerWidth < 640 ? 1 : 2);
  const [delta, setDelta] = useState(getDelta);

  useEffect(() => {
    const onResize = () => setDelta(getDelta());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return delta;
}
