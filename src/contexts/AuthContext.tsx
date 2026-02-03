import { createContext, useEffect, useState, type ReactNode, type Dispatch, type SetStateAction} from "react";
import { login } from "../services/Service";
import type UsuarioLogin from "../models/UsuarioLogin";


interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
  setUsuario: Dispatch<SetStateAction<UsuarioLogin>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login(`usuarios/logar`, usuarioLogin, setUsuario);
      alert("Usuário foi autenticado com sucesso!")
    } catch (error) {
      alert("Os dados do Usuário estão inconsistentes!")
    }
    setIsLoading(false);
  
  }

   function handleLogout() {
      setUsuario({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
      });
    }

  useEffect(() => {
    if (usuario.token) {
      const sanitized = usuario.token.replace(/^"+|"+$/g, "").trim();
      localStorage.setItem("token", sanitized);
    } else {
      localStorage.removeItem("token");
    }
  }, [usuario.token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const sanitized = token.replace(/^"+|"+$/g, "").trim();
      setUsuario((prev) => ({ ...prev, token: sanitized }));
    }
  }, []);

   return(
    <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading, setUsuario}}>
        {children}
    </AuthContext.Provider>
   )
}
