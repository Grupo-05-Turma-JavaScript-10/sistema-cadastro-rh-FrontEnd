import { useState } from "react";
import type Worker from "../../models/Worker";
import { Button } from "../ui/Button";
import { ChecklistAdmissao } from "./ChecklistAdmissao";
import { HistoricoColaborador } from "./HistoricoColaborador";

// Hooks
import { usePositions } from "../../hooks/usePositions";
import { usePacotesBeneficios } from "../../hooks/usePacotesBeneficios";
import { useCollaboratorForm } from "../../hooks/useCollaboratorForm";

// Form Components
import { PersonalDataFields } from "./form/PersonalDataFields";
import { ContractDataFields } from "./form/ContractDataFields";
import { DeadlinesFields } from "./form/DeadlinesFields";
import { StatusToggle } from "./form/StatusToggle";

interface Props {
  initial?: Worker | null;
  onSubmit: (payload: Worker) => void | Promise<void>;
  onCancel?: () => void;
}

export default function CollaboratorForm({ initial, onSubmit, onCancel }: Props) {
  const [activeTab, setActiveTab] = useState<"dados" | "admissao" | "historico">("dados");
  
  // Custom Hooks encapsulando a lógica
  const { form, handleChange, handleSubmit, isLoading } = useCollaboratorForm(initial, onSubmit);
  const { data: cargos } = usePositions();
  const { pacotes } = usePacotesBeneficios();

  const tabClass = (tab: "dados" | "admissao" | "historico") => 
    `pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
      activeTab === tab 
        ? "border-primary-teal text-primary-teal" 
        : "border-transparent text-metallic-silver hover:text-corporate-slate"
    }`;

  return (
    <div className="space-y-6">
      {/* Tabs - Só exibe as extras se já estiver editando um colaborador existente */}
      {initial && (
        <div className="flex gap-6 border-b border-gray-100">
          <button type="button" onClick={() => setActiveTab("dados")} className={tabClass("dados")}>
            Dados do Colaborador
          </button>
          <button type="button" onClick={() => setActiveTab("admissao")} className={tabClass("admissao")}>
            Documentos/Admissão
          </button>
          <button type="button" onClick={() => setActiveTab("historico")} className={tabClass("historico")}>
            Histórico
          </button>
        </div>
      )}

      {activeTab === "dados" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <PersonalDataFields 
            form={form} 
            handleChange={handleChange} 
            pacotes={pacotes} 
          />

          <ContractDataFields 
            form={form} 
            handleChange={handleChange} 
            cargos={cargos} 
          />

          <DeadlinesFields 
            form={form} 
            handleChange={handleChange} 
          />

          <StatusToggle 
            status={form.status} 
            onChange={(val) => handleChange("status", val)} 
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 flex-wrap">
            {onCancel && (
              <Button
                type="button"
                variant="ghost" 
                onClick={onCancel}
                disabled={isLoading}
                className="text-gray-500 hover:text-corporate-slate hover:bg-gray-100"
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" isLoading={isLoading}>
              {form.id ? "Salvar Alterações" : "Cadastrar Colaborador"}
            </Button>
          </div>
        </form>
      )}

      {activeTab === "admissao" && initial && <ChecklistAdmissao colaborador={initial} />}
      {activeTab === "historico" && initial && <HistoricoColaborador colaborador={initial} />}
    </div>
  );
}
