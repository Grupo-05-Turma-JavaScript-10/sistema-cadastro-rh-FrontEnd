import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background-light">
        
        <Sidebar />

        <div className="flex-1 ml-64 p-8">
          <Routes>
           
            <Route path="/dashboard" element={
              <div>
                <h1 className="text-3xl font-bold text-corporate-slate">Dashboard</h1>
                <p className="text-metallic-silver mt-2">Bem-vindo ao painel de controle.</p>
                <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-500">Teste</p>
                </div>
              </div>
            } />

            <Route path="/colaboradores" element={
              <div>
                <h1 className="text-3xl font-bold text-corporate-slate">Colaboradores</h1>
                <button className="mt-4 bg-primary-teal text-white px-4 py-2 rounded-md hover:brightness-90 transition">
                  + Novo Colaborador
                </button>
              </div>
            } />
            
            <Route path="*" element={
              <div className="text-center mt-20">
                <h2 className="text-2xl text-corporate-slate">Selecione uma opção no menu</h2>
                <p className="text-metallic-silver">Tente clicar em Dashboard ou Colaboradores</p>
              </div>
            } />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;