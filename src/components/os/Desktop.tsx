import React, { useState } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { Window } from './Window';
import { AnimatePresence } from 'framer-motion';
import {
    Wallet, ShoppingBag, Settings, Globe, Zap, ShoppingCart, Gem,
    MessageSquare, Landmark
} from 'lucide-react';
import { clsx } from 'clsx';

// Apps
import { WalletApp } from '../apps/WalletApp';
import { Settings as SettingsApp } from '../Settings';
import { QuickBuy } from '../shops/QuickBuy';
import { ShopeeApp } from '../apps/ShopeeApp';
import { LazadaApp } from '../apps/LazadaApp';
import { SheinApp } from '../apps/SheinApp';
import { TemuApp } from '../apps/TemuApp';
import { EbayApp } from '../apps/EbayApp';
import { MessagesApp } from '../apps/MessagesApp';
import { BankApp } from '../apps/BankApp';

export const Desktop: React.FC = () => {
    const [openApp, setOpenApp] = useState<string | null>(null);

    const apps = [
        { id: 'wallets', label: 'Wallet', icon: Wallet, color: 'bg-blue-600', component: <WalletApp /> },
        { id: 'messages', label: 'Messages', icon: MessageSquare, color: 'bg-green-500', component: <MessagesApp /> },
        { id: 'bank', label: 'Bank', icon: Landmark, color: 'bg-slate-700', component: <BankApp /> },
        { id: 'quickbuy', label: 'Amazon', icon: ShoppingBag, color: 'bg-slate-800', component: <QuickBuy /> },
        { id: 'megamall', label: 'Shopee', icon: ShoppingBag, color: 'bg-orange-500', component: <ShopeeApp /> },
        { id: 'luxury', label: 'Lazada', icon: Gem, color: 'bg-blue-500', component: <LazadaApp /> },
        { id: 'global', label: 'SHEIN', icon: Globe, color: 'bg-black', component: <SheinApp /> },
        { id: 'future', label: 'Temu', icon: Zap, color: 'bg-orange-600', component: <TemuApp /> },
        { id: 'underground', label: 'eBay', icon: ShoppingCart, color: 'bg-green-600', component: <EbayApp /> },
        { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-slate-500', component: <SettingsApp /> },
    ];

    const activeApp = apps.find(app => app.id === openApp);

    return (
        <div className="h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center font-sans flex flex-col">
            <MenuBar />

            {/* Desktop Icons Grid */}
            <div className="flex-1 p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 content-start justify-items-center">
                {apps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => setOpenApp(app.id)}
                        className="flex flex-col items-center gap-1 group w-20"
                    >
                        <div className={clsx(
                            "w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-200 group-hover:scale-105 group-active:scale-95",
                            app.color
                        )}>
                            <app.icon size={28} />
                        </div>
                        <span className="text-xs font-medium text-white drop-shadow-md bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                            {app.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Window Manager */}
            <AnimatePresence>
                {openApp && activeApp && (
                    <Window
                        key="window"
                        isOpen={!!openApp}
                        onClose={() => setOpenApp(null)}
                        title={activeApp.label}
                        className={openApp === 'underground' ? 'bg-white' : 'bg-slate-50'}
                    >
                        {activeApp.component}
                    </Window>
                )}
            </AnimatePresence>

            <Dock items={apps} openApp={setOpenApp} />
        </div>
    );
};
