import { useEffect, useState } from "react";
import type Worker from "../../models/Worker";
import type { Pendencia } from "../../models/NovosRecursos";
import { listarPendenciasColaborador, gerarPendenciasPadrao, atualizarPendencia } from "../../services/colaboradorService";
import { Button } from "../ui/Button";
import { CheckSquare, FileText, Plus } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  colaborador: Worker;
}

export function ChecklistAdmissao({ colaborador }: Props) {
  const [pendencias, setPendencias] = useState<Pendencia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendencias();
  }, [colaborador.id]);

  async function fetchPendencias() {
    setIsLoading(true);
    try {
      const data = await listarPendenciasColaborador(colaborador.id);
      setPendencias(data);
    } catch (error) {
      console.error("Erro ao buscar pendências", error);
      toast.error("Não foi possível carregar o checklist de admissão.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGerarPadrao() {
    try {
      const data = await gerarPendenciasPadrao(colaborador.id);
      setPendencias(data);
      toast.success("Checklist padrão gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar checklist padrão", error);
      toast.error("Erro ao gerar checklist padrão.");
    }
  }

  async function handleToggleConcluida(pendencia: Pendencia) {
    try {
      const updated = await atualizarPendencia({
        ...pendencia,
        concluida: !pendencia.concluida,
      });
      setPendencias((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      toast.success(`Item marcado como ${updated.concluida ? 'concluído' : 'pendente'}.`);
    } catch (error) {
      console.error("Erro ao atualizar pendência", error);
      toast.error("Erro ao atualizar status do documento.");
    }
  }

  async function handleSaveObservacao(pendencia: Pendencia, novaObs: string) {
    if (pendencia.observacao === novaObs) return;
    try {
      const updated = await atualizarPendencia({
        ...pendencia,
        observacao: novaObs,
      });
      setPendencias((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    } catch (error) {
      console.error("Erro ao atualizar observação", error);
      toast.error("Erro ao salvar observação.");
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center text-metallic-silver">Carregando checklist...</div>;
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-bold text-corporate-slate flex items-center gap-2">
          <CheckSquare size={18} className="text-primary-teal" />
          Documentos de Admissão
        </h4>
        {pendencias.length === 0 && (
          <Button variant="outline" size="sm" onClick={handleGerarPadrao}>
            <Plus size={16} className="mr-1" /> Gerar Checklist Padrão
          </Button>
        )}
      </div>

      {pendencias.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-8 text-center flex flex-col items-center justify-center">
          <FileText size={32} className="text-gray-300 mb-2" />
          <p className="text-metallic-silver text-sm">
            Nenhuma pendência cadastrada para este colaborador.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendencias.map((pendencia) => (
            <div
              key={pendencia.id}
              className={`p-3 rounded-lg border flex flex-col gap-2 transition-colors ${
                pendencia.concluida ? "bg-green-50/50 border-green-100" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-teal rounded border-gray-300 focus:ring-primary-teal cursor-pointer"
                    checked={pendencia.concluida}
                    onChange={() => handleToggleConcluida(pendencia)}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      pendencia.concluida ? "text-green-800 line-through opacity-70" : "text-corporate-slate"
                    }`}
                  >
                    {pendencia.titulo}
                  </p>
                  <input
                    type="text"
                    placeholder="Adicionar observação opcional..."
                    className={`mt-1 text-xs w-full bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary-teal focus:outline-none transition-colors pb-1 ${
                      pendencia.concluida ? "text-green-700/70" : "text-metallic-silver"
                    }`}
                    defaultValue={pendencia.observacao || ""}
                    onBlur={(e) => handleSaveObservacao(pendencia, e.target.value)}
                    disabled={pendencia.concluida}
                  />
                </div>
                {pendencia.concluida && pendencia.dataConclusao && (
                  <span className="text-[10px] text-green-600 font-medium whitespace-nowrap bg-green-100 px-2 py-0.5 rounded-full">
                    Concluído em {new Date(pendencia.dataConclusao).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}