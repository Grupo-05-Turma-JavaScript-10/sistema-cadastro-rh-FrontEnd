import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import type UsuarioLogin from "../models/UsuarioLogin";

export function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
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
      <div className="w-full max-w-md bg-surface-white rounded-2xl shadow-md border border-gray-100 px-8 py-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-teal text-white font-extrabold flex items-center justify-center shadow-sm">
            C+
          </div>
          <h1 className="mt-5 text-2xl font-bold text-corporate-slate">
            Bem-vindo ao Colab+
          </h1>
          <p className="mt-2 text-sm text-metallic-silver">
            Entre para acessar o sistema
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
              value={usuarioLogin.usuario}
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
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-corporate-slate placeholder:text-gray-400 outline-none transition focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/recuperar-senha"
              className="text-sm font-semibold text-primary-teal hover:brightness-90"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-base"
            isLoading={isLoading}
          >
            Entrar
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-metallic-silver">
          Não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="font-semibold text-primary-teal hover:brightness-90"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
