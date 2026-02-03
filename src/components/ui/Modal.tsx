import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-corporate-slate/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-surface-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 z-10 border border-metallic-silver/20">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-metallic-silver hover:text-error-red hover:bg-error-red/10 p-2 rounded-full transition-all"
          title="Fechar"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-corporate-slate mb-6 pr-8">
          {title}
        </h2>

        {children}
        
      </div>
    </div>
  );
}