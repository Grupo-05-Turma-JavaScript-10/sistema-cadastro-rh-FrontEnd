import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface PageTransitionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export function PageTransition({ children, ...props }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props} 
    >
      {children}
    </motion.div>
  );
}
