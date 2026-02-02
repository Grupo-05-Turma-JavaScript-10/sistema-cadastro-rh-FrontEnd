import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    adminName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const API_URL =
      "https://sistema-cadastro-rh-f16u.onrender.com/usuarios/cadastrar";

    const dadosUsuario = {
      nome: formData.adminName,
      usuario: formData.email,
      senha: formData.password,
      foto: "https://i.imgur.com/I86rSBy.png",
    };

    try {
      await axios.post(API_URL, dadosUsuario);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error: any) {
      console.error("Erro na requisição:", error.response);

      const status = error.response?.status;
      const apiMessage = error.response?.data?.message;

      if (
        status === 409 ||
        (typeof apiMessage === "string" &&
          apiMessage.toLowerCase().includes("existe"))
      ) {
        alert(
          "Este e-mail já está cadastrado. Tente usar outro ou faça login.",
        );
      } else if (status === 400) {
        alert(
          "Dados inválidos. Verifique se a senha atende aos requisitos mínimos.",
        );
      } else {
        alert("Erro ao realizar cadastro. Verifique os dados e sua conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md md:p-8 shadow-md">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-primary-teal w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6">
            <div className="w-5 h-5 border-2 border-white rounded-[1px] transform rotate-45" />
          </div>

          <h1 className="text-2xl font-bold text-corporate-slate">
            Crie sua Conta no Colab<span className="text-primary-teal">+</span>
          </h1>
          <p className="mt-2 text-sm text-metallic-silver">
            Comece a gerenciar seu RH agora
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-corporate-slate block mb-1.5">
              Nome da Empresa
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Minha Empresa Ltda"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-corporate-slate placeholder:text-gray-300 outline-none transition focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-corporate-slate block mb-1.5">
              Nome do Administrador
            </label>
            <input
              type="text"
              name="adminName"
              placeholder="João Silva"
              value={formData.adminName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-corporate-slate placeholder:text-gray-300 outline-none transition focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-corporate-slate block mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-corporate-slate placeholder:text-gray-300 outline-none transition focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-corporate-slate block mb-1.5">
              Senha
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-corporate-slate placeholder:text-gray-400 outline-none transition focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="w-full py-3 text-base mt-4"
          >
            Criar Conta
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-metallic-silver">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary-teal hover:brightness-90"
          >
            Faça login
          </Link>
        </p>
      </Card>
    </div>
  );
}
