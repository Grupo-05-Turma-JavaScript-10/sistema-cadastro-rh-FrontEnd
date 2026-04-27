import { type ReactNode } from "react"; 

interface CardProps {
  children: ReactNode;
  className?: string; 
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-surface-white rounded-lg border border-gray-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}