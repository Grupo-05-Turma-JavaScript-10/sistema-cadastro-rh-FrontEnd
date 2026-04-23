interface Props {
  status: boolean;
  onChange: (status: boolean) => void;
}

export function StatusToggle({ status, onChange }: Props) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-corporate-slate">Situação Cadastral</span>
        <span className="text-xs text-metallic-silver">Define se o colaborador está ativo ou inativo na empresa.</span>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold transition-colors ${status ? 'text-primary-teal' : 'text-gray-400'}`}>
          {status ? 'Ativo' : 'Inativo'}
        </span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={status}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-teal"></div>
        </label>
      </div>
    </div>
  );
}
