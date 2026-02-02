import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import type UsuarioLogin from "../models/UsuarioLogin";
import { User, Lock } from "lucide-react"; 

export function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin,
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/dashboard");
    }
  }, [usuario, navigate]);

  function atualizarEstado(event: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleLogin(usuarioLogin);
  }

 return (
      <div className="min-h-screen bg-background-light flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 px-8 py-10">
          
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-teal text-white font-extrabold flex items-center justify-center shadow-lg shadow-primary-teal/20 text-xl">
              C+
            </div>
            <h1 className="mt-6 text-2xl font-bold text-corporate-slate tracking-tight">
              Bem-vindo ao Colab+
            </h1>
            <p className="mt-2 text-sm text-metallic-silver">
              Acesse sua conta para gerenciar sua equipe
            </p>
          </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-corporate-slate">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Seu usuário"
              value={usuarioLogin.usuario || ""}
              onChange={atualizarEstado}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-corporate-slate placeholder:text-gray-400 outline-none transition focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-corporate-slate">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="••••••••"
              value={usuarioLogin.senha || ""}
              onChange={atualizarEstado}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-corporate-slate placeholder:text-gray-400 outline-none transition focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
              required
            />
          </div>

          <p className="mt-8 text-center text-sm text-metallic-silver">
            Novo por aqui?{" "}
            <Link
              to="/cadastro"
              className="font-bold text-primary-teal hover:underline"
            >
              Crie uma conta gratuita
            </Link>
          </p>
        </div>
      </div>
  );
}