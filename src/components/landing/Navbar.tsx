import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../ui/Button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Soluções", href: "#solucoes" },
    { name: "Funcionalidades", href: "#funcionalidades" },
    { name: "Recursos", href: "#recursos" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="bg-primary-teal w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
            <div className="w-3.5 h-3.5 border-2 border-white rounded-[1px] transform rotate-45" />
          </div>

          <span className="text-xl font-bold text-corporate-slate tracking-tight">
            Colab<span className="text-primary-teal">+</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-corporate-slate hover:text-primary-teal transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline">Entrar</Button>
          </Link>

          <Link to="/cadastro">
            <Button>Teste Grátis</Button>
          </Link>
        </div>

        <button
          className="md:hidden text-corporate-slate p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-gray-600 font-medium hover:text-primary-teal"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <hr className="border-gray-100 my-2" />
          <a
            href="/login"
            className="block py-2 text-center font-semibold text-corporate-slate"
          >
            Entrar
          </a>
          <Link to="/cadastro" onClick={() => setIsMenuOpen(false)}>
            <Button className="w-full">Teste Grátis</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
