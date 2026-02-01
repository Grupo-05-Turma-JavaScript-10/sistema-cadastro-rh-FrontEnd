import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Cargos } from "./pages/Position";
import { LandingPage } from "./pages/LandingPage";
import { Footer } from "./components/landing/Footer";
import { Collaborators } from "./pages/Collaborators";
import UsersPage from "./pages/Users";


function Layout() {
  const location = useLocation();
  const isPublicPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <div className="flex flex-1">
        {!isPublicPage && <Sidebar />}

        <div
          className={`flex-1 transition-all duration-300 ${!isPublicPage
              ? "ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8"
              : "flex flex-col"
            }`}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/colaboradores" element={<Collaborators />} />
            <Route path="/cargos" element={<Cargos />} />
            <Route path="/usuarios" element={<UsersPage />} />

            <Route
              path="/colaboradores"
              element={
                <div className="p-8 text-corporate-slate italic">
                  <h1>Em construção...</h1>
                </div>
              }
            />

            <Route
              path="*"
              element={<div className="p-8">Página não encontrada</div>}
            />
          </Routes>
        </div>
      </div>
      {isPublicPage && <Footer />}
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
