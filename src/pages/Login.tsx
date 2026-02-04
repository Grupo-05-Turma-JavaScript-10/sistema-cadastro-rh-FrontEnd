import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../contexts/AuthContext";
import type UsuarioLogin from "../models/UsuarioLogin";
import { User, Lock } from "lucide-react";
import { PageTransition } from "../components/ui/PageTransition";
import { toast } from "react-toastify";

export function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    usuario: "",
    senha: "",
  } as UsuarioLogin);
  const [showPassword, setShowPassword] = useState(false);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await handleLogin(usuarioLogin);
    } catch (error) {
      toast.error("Erro ao entrar. Verifique seu usuário e senha.");
    }
  }
  return (
    <PageTransition>
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

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-corporate-slate ml-1">
                Usuário
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-teal transition-colors">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="usuario"
                  placeholder="ex: maria.silva"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/30 outline-none transition-all focus:bg-white focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 text-sm text-corporate-slate"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-corporate-slate">
                  Senha
                </label>
                <Link
                  to="/recuperar-senha"
                  className="text-xs font-semibold text-primary-teal hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-teal transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  placeholder="••••••••"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50/30 outline-none transition-all focus:bg-white focus:border-primary-teal focus:ring-4 focus:ring-primary-teal/10 text-sm text-corporate-slate"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 my-auto rounded px-2 text-xs font-semibold text-primary-teal hover:brightness-90"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-base font-bold shadow-lg shadow-primary-teal/20 transition-transform active:scale-[0.98]"
              isLoading={isLoading}
            >
              Entrar na plataforma
            </Button>
          </form>

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
    </PageTransition>
  );
}
