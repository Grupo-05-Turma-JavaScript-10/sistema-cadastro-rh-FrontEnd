import { Shield } from "lucide-react";

export default function PermissionLevels() {
  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <header className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
        <Shield className="text-primary-teal" />
        <h2 className="font-bold text-lg text-corporate-slate">Níveis de Permissão</h2>
      </header>

      <div className="grid gap-4 p-6 sm:grid-cols-2">
        <PermissionCard
          title="Administrador"
          description="Acesso total ao sistema e gerenciamento completo de usuários"
          className="bg-primary-teal/5 border border-primary-teal/10"
          titleColor="text-primary-teal"
        />

        <PermissionCard
          title="Visualizador"
          description="Apenas visualização de dados, sem permissão para edição"
          className="bg-gray-50 border border-gray-100"
          titleColor="text-gray-500"
        />
      </div>
    </section>
  );
}

interface PermissionCardProps {
  title: string;
  description: string;
  className: string;  
  titleColor: string; 
}

function PermissionCard({
  title,
  description,
  className,
  titleColor,
}: PermissionCardProps) {
  return (

    <article className={`rounded-xl p-5 transition-all hover:shadow-md ${className}`}>

      <h3 className={`font-bold text-lg ${titleColor}`}>{title}</h3>


      <p className="mt-2 text-sm text-corporate-slate leading-relaxed">
        {description}
      </p>
    </article>
  );
}
