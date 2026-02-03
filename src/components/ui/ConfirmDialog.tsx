import Popup from "reactjs-popup";
import { Button } from "./Button";

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({ open, title, description, onConfirm, onClose }: Props) {
  return (
    <Popup
      open={open}
      onClose={onClose}
      closeOnDocumentClick
      modal
      overlayStyle={{ background: "rgba(0,0,0,0.3)" }}
      contentStyle={{ background: "transparent", border: "none", padding: 0 }}
    >
      <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {description && <p className="text-gray-600 text-sm">{description}</p>}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </Popup>
  );
}
