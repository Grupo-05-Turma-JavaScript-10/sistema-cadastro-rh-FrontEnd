import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { usuario, isLoading } = useContext(AuthContext);
  const stored = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const effectiveToken = usuario?.token || stored || "";
  const isAuthenticated = !!effectiveToken || (usuario && usuario.id > 0);
  if (isLoading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
