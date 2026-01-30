import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    UserCog,
    Settings,
    LogOut
} from 'lucide-react';

export function Sidebar() {
    const location = useLocation();

    const getLinkStyle = (path: string) => {
        const isActive = location.pathname === path;

        return isActive
            ? "flex items-center gap-3 px-4 py-3 bg-primary-teal text-surface-white rounded-lg transition-all shadow-md font-medium"
            : "flex items-center gap-3 px-4 py-3 text-metallic-silver hover:text-surface-white hover:bg-surface-white/10 rounded-lg transition-all font-medium";
    };

    return (
        <aside className="w-64 min-h-screen bg-corporate-slate flex flex-col fixed left-0 top-0 font-sans">

            <div className="h-24 flex items-center px-6 border-b border-metallic-silver/20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-teal rounded-md flex items-center justify-center text-surface-white font-bold text-sm shadow-sm">
                        C+
                    </div>
                    <span className="text-xl font-bold text-surface-white tracking-wide">
                        Colab<span className="text-primary-teal">+</span>
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">

                <Link to="/dashboard" className={getLinkStyle('/dashboard')}>
                    <LayoutDashboard size={22} />
                    <span>Dashboard</span>
                </Link>

                <Link to="/colaboradores" className={getLinkStyle('/colaboradores')}>
                    <Users size={22} />
                    <span>Colaboradores</span>
                </Link>

                <Link to="/cargos" className={getLinkStyle('/cargos')}>
                    <Briefcase size={22} />
                    <span>Cargos & Estrutura</span>
                </Link>

                <Link to="/usuarios" className={getLinkStyle('/usuarios')}>
                    <UserCog size={22} />
                    <span>Usuários do Sistema</span>
                </Link>

                <Link to="/configuracoes" className={getLinkStyle('/configuracoes')}>
                    <Settings size={22} />
                    <span>Configurações</span>
                </Link>

            </nav>

            <div className="p-4 border-t border-metallic-silver/20 bg-black/20">

                <div className="flex items-center gap-3 mb-4 p-2 rounded-md">
                    <div className="w-10 h-10 rounded-full bg-primary-teal flex items-center justify-center text-surface-white font-bold text-sm border-2 border-corporate-slate">
                        AD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-surface-white">Admin</span>
                        <span className="text-xs text-metallic-silver">admin@empresa.com</span>
                    </div>
                </div>

                <button className="flex items-center gap-2 text-metallic-silver hover:text-error-red transition-colors text-sm w-full pl-2 cursor-pointer">
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>

        </aside>
    );
}