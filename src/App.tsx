import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar'; 

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background-light">

        <Sidebar />

        <div className="flex-1 transition-all duration-300 ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
          <Routes>

            <Route path="/dashboard" element={
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-corporate-slate">Dashboard</h1>
                <p className="text-metallic-silver mt-2 text-sm md:text-base">Bem-vindo ao painel de controle.</p>
                <div className="mt-6 p-6 bg-surface-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-500">Teste</p>
                </div>
              </div>
            } />

            <Route path="/colaboradores" element={
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-corporate-slate">Colaboradores</h1>
                  <button className="w-full md:w-auto bg-primary-teal text-white px-4 py-2 rounded-md hover:brightness-90 transition shadow-sm font-medium">
                    + Novo Colaborador
                  </button>
                </div>

                <div className="mt-6 p-6 bg-surface-white rounded-lg shadow-sm border border-gray-100 h-64 flex items-center justify-center text-metallic-silver">
                  Tabela de colaboradores
                </div>
              </div>
            } />

            <Route path="*" element={
              <div className="text-center mt-20">
                <h2 className="text-2xl text-corporate-slate">Selecione uma opção</h2>
                <p className="text-metallic-silver"> Use o menu para navegar</p>
              </div>
            } />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;