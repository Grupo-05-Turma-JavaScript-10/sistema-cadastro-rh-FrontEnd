import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Navbar } from "./components/landing/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Cargos } from "./pages/Positions";
import { LandingPage } from "./pages/LandingPage";
import { Footer } from "./components/landing/Footer";
import { Collaborators } from "./pages/Collaborators";
import UsersPage from "./pages/Users";
import { Login } from "./pages/Login";
import { RegisterForm } from "./pages/Register";
import { Settings } from "./pages/Settings";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CookiePolicy } from "./pages/CookiePolicy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ReactNode } from "react";

function Layout() {
  const location = useLocation();

  const publicPaths = [
    "/",
    "/login",
    "/cadastro",
    "/privacidade",
    "/termos",
    "/cookies",
  ];
  const isPublicPage = publicPaths.includes(location.pathname);

  const navbarPaths = ["/", "/privacidade", "/termos", "/cookies"];
  const showNavbar = navbarPaths.includes(location.pathname);

  const footerPaths = ["/", "/privacidade", "/termos", "/cookies"];
  const showFooter = footerPaths.includes(location.pathname);

  function PrivateRoute({ children }: { children: ReactNode }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      {showNavbar && <Navbar />}

      <div className="flex flex-1">
        {!isPublicPage && <Sidebar />}

        <div
          className={`flex-1 transition-all duration-300 ${
            !isPublicPage
              ? "ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8"
              : `flex flex-col w-full ${showNavbar ? "pt-20" : ""}`
          }`}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<RegisterForm />} />
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/colaboradores"
              element={
                <PrivateRoute>
                  <Collaborators />
                </PrivateRoute>
              }
            />
            <Route
              path="/cargos"
              element={
                <PrivateRoute>
                  <Cargos />
                </PrivateRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <PrivateRoute>
                  <UsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/configuracoes"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />

            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-full min-h-[60vh]">
                  <h1 className="text-xl font-bold text-corporate-slate">
                    Página não encontrada
                  </h1>
                </div>
              }
            />
          </Routes>
        </div>
      </div>

      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </BrowserRouter>
  );
}

export default App;
