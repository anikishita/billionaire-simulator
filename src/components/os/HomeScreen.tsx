import React from 'react';

import { Wallet, ShoppingBag, Settings, Globe, Zap, ShoppingCart, Gem } from 'lucide-react';
import { clsx } from 'clsx';

interface HomeScreenProps {
    openApp: (appId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ openApp }) => {


    const apps = [
        { id: 'wallets', label: 'Wallet', icon: Wallet, color: 'bg-blue-600' },
        { id: 'quickbuy', label: 'Amazon', icon: ShoppingBag, color: 'bg-slate-800' },
        { id: 'megamall', label: 'Shopee', icon: ShoppingBag, color: 'bg-orange-500' },
        { id: 'luxury', label: 'Lazada', icon: Gem, color: 'bg-blue-500' },
        { id: 'global', label: 'SHEIN', icon: Globe, color: 'bg-black' },
        { id: 'future', label: 'Temu', icon: Zap, color: 'bg-orange-600' },
        { id: 'underground', label: 'eBay', icon: ShoppingCart, color: 'bg-green-600' },
        { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-slate-500' },
    ];

    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex flex-col items-center justify-start pt-20 pb-10 px-4">
            <div className="w-full max-w-md grid grid-cols-4 gap-6">
                {apps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => openApp(app.id)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={clsx(
                            'w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95',
                            app.color
                        )}>
                            <app.icon size={32} />
                        </div>
                        <span className="text-xs font-medium text-white drop-shadow-md">{app.label}</span>
                    </button>
                ))}
            </div>

            {/* Dock */}
            <div className="mt-auto mb-4 bg-white/20 backdrop-blur-md p-4 rounded-3xl flex gap-6">
                {apps.slice(0, 4).map((app) => (
                    <button
                        key={`dock-${app.id}`}
                        onClick={() => openApp(app.id)}
                        className={clsx(
                            'w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-200 hover:-translate-y-2 active:scale-95',
                            app.color
                        )}
                    >
                        <app.icon size={28} />
                    </button>
                ))}
            </div>
        </div>
    );
};
