import React from 'react';
import { LayoutDashboard, Wallet, ShoppingBag, Settings } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'wallets', label: 'Wallets', icon: Wallet },
        { id: 'shops', label: 'Marketplaces', icon: ShoppingBag },
        // { id: 'investments', label: 'Investments', icon: TrendingUp }, // Future expansion
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center justify-center lg:justify-start gap-3 border-b border-slate-800">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <span className="text-slate-950 font-bold text-lg">B</span>
                </div>
                <span className="hidden lg:block font-bold text-xl bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                    Billionaire
                </span>
            </div>

            <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                'flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group',
                                isActive
                                    ? 'bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/5'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            )}
                        >
                            <Icon size={24} className={clsx(isActive && 'animate-pulse')} />
                            <span className="hidden lg:block font-medium">{item.label}</span>
                            {isActive && (
                                <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-xl p-3 text-center lg:text-left">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 hidden lg:block">
                        Status
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-400 font-medium hidden lg:block">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
