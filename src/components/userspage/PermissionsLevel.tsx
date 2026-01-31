import { Shield } from "lucide-react";

export default function PermissionLevels() {
  return (
    <section className="bg-[var(--color-surface-white)] rounded-xl shadow-sm">
      <header className="flex items-center gap-2 border-b px-6 py-4">
        <Shield className="text-[var(--color-primary-teal)]" />
        <h2 className="font-semibold text-lg">Níveis de Permissão</h2>
      </header>

      <div className="grid gap-4 p-6 sm:grid-cols-2">
        <PermissionCard
          title="Administrador"
          description="Acesso total ao sistema e gerenciamento completo de usuários"
          bg="bg-primary-teal/10"
          text="text-[var(--color-primary-teal)]"
        />

        <PermissionCard
          title="Visualizador"
          description="Apenas visualização de dados, sem permissão para edição"
          bg="bg-gray-50"
          text="text-gray-400"
        />
      </div>
    </section>
  );
}

function PermissionCard({
  title,
  description,
  bg,
  text,
}: {
  title: string;
  description: string;
  bg: string;
  text: string;
}) {
  return (
    <article className={`rounded-xl p-5 ${bg}`}>
      <h3 className={`font-semibold text-lg ${text}`}>{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-corporate-slate)]">
        {description}
      </p>
    </article>
  );
}
