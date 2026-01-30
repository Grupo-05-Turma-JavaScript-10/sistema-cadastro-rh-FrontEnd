import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background-light">

        <Sidebar />

       <div className="flex-1 transition-all duration-300 ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
          <Routes>
            
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/colaboradores" element={
              <div>
                 <h1>Em construção...</h1>
              </div>
            } />
            
            <Route path="*" element={<div>Página não encontrada</div>} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;