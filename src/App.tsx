import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Cargos } from './pages/Cargos';
import { LandingPage } from './pages/LandingPage';

function Layout() {
  const location = useLocation();
  const isPublicPage = location.pathname === '/';


  return (
      <div className="flex min-h-screen bg-background-light">

        {!isPublicPage && <Sidebar />}


       <div className={`flex-1 transition-all duration-300 ${!isPublicPage ? 'ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cargos" element={<Cargos />} />
          
          <Route path="/colaboradores" element={
            <div><h1>Em construção...</h1></div>
          } />
            
            <Route path="*" element={<div>Página não encontrada</div>} />
          </Routes>
        </div>

      </div>
    
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;