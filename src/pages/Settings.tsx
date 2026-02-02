import { User, Lock, Bell, Save, Camera, ChevronRight } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        subtitle="Gerencie suas preferências e dados da conta"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          <Card>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <User className="text-primary-teal" size={20} />
              <h3 className="font-bold text-lg text-corporate-slate">Meu Perfil</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group cursor-pointer">
                   <User size={40} className="text-metallic-silver group-hover:opacity-50 transition-opacity" />
                   
                   <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all">
                      <Camera size={24} className="text-white" />
                   </div>
                </div>
                <button className="text-sm text-primary-teal font-medium hover:underline">Alterar foto</button>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-corporate-slate">Nome Completo</label>
                    <input 
                      type="text" 
                      defaultValue="Admin Master"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary-teal transition-colors text-corporate-slate"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-corporate-slate">E-mail</label>
                    <input 
                      type="email" 
                      defaultValue="admin@empresa.com"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary-teal transition-colors text-corporate-slate bg-gray-50 cursor-not-allowed"
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-corporate-slate">Cargo</label>
                   <input 
                      type="text" 
                      defaultValue="Administrador do Sistema"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none text-corporate-slate bg-gray-50"
                      disabled
                    />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button>
                    <Save size={18} /> Salvar Alterações
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <Lock className="text-primary-teal" size={20} />
              <h3 className="font-bold text-lg text-corporate-slate">Segurança</h3>
            </div>

            <div className="space-y-4 max-w-lg">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-corporate-slate">Senha Atual</label>
                    <input 
                      type="password" 
                      placeholder="Digite sua senha atual"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary-teal transition-colors text-corporate-slate"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                      <label className="text-sm font-medium text-corporate-slate">Nova Senha</label>
                      <input 
                        type="password" 
                        placeholder="Mínimo 8 caracteres"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary-teal transition-colors text-corporate-slate"
                      />
                  </div>
                  <div className="space-y-1.5">
                      <label className="text-sm font-medium text-corporate-slate">Confirmar Senha</label>
                      <input 
                        type="password" 
                        placeholder="Repita a nova senha"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary-teal transition-colors text-corporate-slate"
                      />
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline">
                    Atualizar Senha
                  </Button>
                </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          
          <Card>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <Bell className="text-primary-teal" size={20} />
              <h3 className="font-bold text-lg text-corporate-slate">Notificações</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="notif_email" className="mt-1 w-4 h-4 text-primary-teal rounded border-gray-300 focus:ring-primary-teal" defaultChecked />
                <label htmlFor="notif_email" className="text-sm text-corporate-slate cursor-pointer select-none">
                  <span className="font-medium block">Alertas por E-mail</span>
                  <span className="text-metallic-silver text-xs">Receba atualizações sobre novos cadastros.</span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="notif_sys" className="mt-1 w-4 h-4 text-primary-teal rounded border-gray-300 focus:ring-primary-teal" defaultChecked />
                <label htmlFor="notif_sys" className="text-sm text-corporate-slate cursor-pointer select-none">
                  <span className="font-medium block">Notificações no Sistema</span>
                  <span className="text-metallic-silver text-xs">Mostrar balão de alerta no dashboard.</span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="notif_marketing" className="mt-1 w-4 h-4 text-primary-teal rounded border-gray-300 focus:ring-primary-teal" />
                <label htmlFor="notif_marketing" className="text-sm text-corporate-slate cursor-pointer select-none">
                  <span className="font-medium block">Novidades do Produto</span>
                  <span className="text-metallic-silver text-xs">Receba notícias sobre novas features.</span>
                </label>
              </div>
            </div>
            
           <div className="mt-6 pt-4 border-t border-gray-50">
  <button className="flex items-center justify-between w-full group text-sm font-medium text-metallic-silver hover:text-primary-teal transition-colors">
    <span>Gerenciar preferências avançadas</span>
    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
  </button>
</div>
          </Card>
        </div>

      </div>
    </div>
  );
}