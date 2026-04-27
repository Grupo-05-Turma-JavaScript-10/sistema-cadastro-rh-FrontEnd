import {
  CheckCircle2Icon,
  Plus,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import UsersTable from "../components/users/UsersTable";
import PermissionLevels from "../components/users/PermissionsLevel";
import type Worker from "../models/Worker";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";
import { PageTransition } from "../components/ui/PageTransition";
import { listarColaboradores } from "../services/colaboradorService";

function Users() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarColaboradores() {
    try {
      setLoading(true);
      setError(null);

      const response = await listarColaboradores();
      setWorkers(response);
    } catch (err) {
      console.error("Erro ao listar colaboradores:", err);
      setError("Erro ao carregar usuários do sistema.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarColaboradores();
  }, []);

  function handleNewUser() {
    alert("Abrir modal de novo usuário");
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Usuários do Sistema"
          subtitle="Controle quem pode acessar e gerenciar o sistema"
        >
          <Button onClick={handleNewUser}>
            <Plus size={20} />
            Novo Usuário
          </Button>
        </PageHeader>

        <SearchBar
          placeholder="Buscar por nome, e-mail ou perfil"
          className="mb-6"
        />

        <PermissionLevels />

        {loading && (
          <p className="text-sm text-gray-500">
            Carregando usuários...
          </p>
        )}

        {error && (
          <p className="text-sm text-error-red">
            {error}
          </p>
        )}

        {!loading && !error && (
          <UsersTable
            workers={workers}
            onEdit={(worker) => console.log("Editar", worker)}
          />
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total de Usuários"
            value={workers.length}
            icon={UsersIcon}
          />
          <StatCard
            title="Usuários Ativos"
            value={workers.filter(w => w.status).length}
            variant="success"
            icon={CheckCircle2Icon}
          />
          <StatCard
            title="Administradores"
            value={workers.filter(w => w.usuario).length}
            variant="brand"
            icon={ShieldCheckIcon}
          />
        </section>
      </div>
    </PageTransition>
  );
}

export default Users;
