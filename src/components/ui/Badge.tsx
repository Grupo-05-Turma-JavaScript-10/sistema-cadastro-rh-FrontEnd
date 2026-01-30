import { type ReactNode } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "neutral" | "brand";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  
  const styles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-success-green/10 text-success-green", 
    warning: "bg-orange-100 text-orange-700",
    neutral: "bg-gray-100 text-metallic-silver", 
    brand: "bg-primary-teal/10 text-primary-teal",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
}