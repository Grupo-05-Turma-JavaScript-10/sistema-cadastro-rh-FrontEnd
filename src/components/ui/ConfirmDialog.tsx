import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "info"; 
  isLoading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  
  return (
    <Modal 
      isOpen={open} 
      onClose={onClose} 
      title={title}
    >
      <div className="space-y-6">
        
        {description && (
            <div className={`flex items-start gap-4 p-4 rounded-xl border ${
                variant === 'danger' 
                ? 'bg-red-50 border-red-100' 
                : 'bg-blue-50 border-blue-100'
            }`}>
                {variant === 'danger' && (
                    <div className="bg-white p-2 rounded-full text-error-red shadow-sm shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                )}
                <p className="text-corporate-slate text-sm leading-relaxed mt-1">
                    {description}
                </p>
            </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
            
            <button 
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-corporate-slate hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
                {cancelText}
            </button>
            
            <Button 
                onClick={onConfirm}
                isLoading={isLoading}
                className={variant === 'danger' 
                    ? "bg-error-red hover:bg-red-600 border-error-red text-white" 
                    : ""
                }
            >
                {confirmText}
            </Button>
        </div>
      </div>
    </Modal>
  );
}