import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react"; 

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean; 
  className?: string; 
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  ...props 
}: ButtonProps) {

  const variants = {
    primary: "bg-primary-teal text-white hover:brightness-90 shadow-sm border border-transparent",
    outline: "bg-transparent border border-gray-300 text-corporate-slate hover:bg-gray-50",
    ghost: "bg-transparent text-metallic-silver hover:text-corporate-slate hover:bg-gray-100",
    danger: "bg-error-red text-white hover:bg-red-600 shadow-sm",
  };

  return (
    <button
      className={`
        flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Aguarde...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}