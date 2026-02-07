import { motion, AnimatePresence } from "framer-motion";

export default function HeaderMenuDropdown({
  open,
  align = "right",
  width = "100%",
  offsetY = "4px",
  children,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`absolute z-20 origin-top-right top-full ${
            align === "right" ? "right-0" : "left-0"
          }`}
          style={{ width, marginTop: offsetY }}
          role="menu"
        >
          <div
            className="rounded-[10px] border border-other-border bg-white overflow-hidden"
            style={{
              boxShadow:
                "rgba(62, 67, 74, 0.31) 0px 0px 1px 0px, rgba(62, 67, 74, 0.15) 0px 18px 28px 0px",
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
