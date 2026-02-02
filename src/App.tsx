import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Cargos } from "./pages/Positions";
import { LandingPage } from "./pages/LandingPage";
import { Footer } from "./components/landing/Footer";
import { Collaborators } from "./pages/Collaborators";
import UsersPage from "./pages/Users";
import { Login } from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./routes/PrivateRoute";


function Layout() {
  const location = useLocation();
  const isPublicPage =
    location.pathname === "/" || location.pathname === "/login";

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
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/colaboradores" element={<PrivateRoute><Collaborators /></PrivateRoute>} />
            <Route path="/cargos" element={<PrivateRoute><Cargos /></PrivateRoute>} />
            <Route path="/usuarios" element={<PrivateRoute><UsersPage /></PrivateRoute>} />

            

            <Route
              path="*"
              element={<div className="p-8">Página não encontrada</div>}
            />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
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
