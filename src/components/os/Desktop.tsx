import React, { useState } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { Window } from './Window';
import { AppContainer } from '../AppContainer';
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

interface WindowState {
    id: string;
    appId: string;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    isMinimized: boolean;
    isMaximized: boolean;
}

export const Desktop: React.FC = () => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [nextZIndex, setNextZIndex] = useState(10);

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

    const openApp = (appId: string) => {
        const app = apps.find(a => a.id === appId);
        if (!app) return;

        // Check if already open
        const existingWindow = windows.find(w => w.appId === appId);
        if (existingWindow) {
            // Bring to front
            focusWindow(existingWindow.id);
            if (existingWindow.isMinimized) {
                setWindows(prev => prev.map(w => w.id === existingWindow.id ? { ...w, isMinimized: false } : w));
            }
            return;
        }

        // Open new window
        const newId = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newWindow: WindowState = {
            id: newId,
            appId,
            title: app.label,
            x: 100 + (windows.length * 30),
            y: 50 + (windows.length * 30),
            width: 800,
            height: 600,
            zIndex: nextZIndex,
            isMinimized: false,
            isMaximized: false,
        };

        setWindows(prev => [...prev, newWindow]);
        setActiveWindowId(newWindow.id);
        setNextZIndex(prev => prev + 1);
    };

    const closeWindow = (id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const minimizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        setActiveWindowId(null);
    };

    const maximizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
        focusWindow(id);
    };

    const focusWindow = (id: string) => {
        setActiveWindowId(id);
        setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
        setNextZIndex(prev => prev + 1);
    };

    const moveWindow = (id: string, x: number, y: number) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
    };

    const resizeWindow = (id: string, width: number, height: number) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
    };

    // Handle Click Outside (Background)
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setActiveWindowId(null);
        }
    };

    return (
        <div
            className="h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center font-sans flex flex-col"
            onClick={handleBackgroundClick}
        >
            <MenuBar />

            {/* Desktop Icons Grid */}
            <div className="flex-1 p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 content-start justify-items-center">
                {apps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => openApp(app.id)}
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
                {windows.map((win) => {
                    const app = apps.find(a => a.id === win.appId);
                    if (!app) return null;

                    return (
                        <Window
                            key={win.id}
                            id={win.id}
                            title={win.title}
                            isActive={activeWindowId === win.id}
                            isMinimized={win.isMinimized}
                            isMaximized={win.isMaximized}
                            position={{ x: win.x, y: win.y }}
                            size={{ width: win.width, height: win.height }}
                            zIndex={win.zIndex}
                            onClose={() => closeWindow(win.id)}
                            onMinimize={() => minimizeWindow(win.id)}
                            onMaximize={() => maximizeWindow(win.id)}
                            onFocus={() => focusWindow(win.id)}
                            onMove={(x, y) => moveWindow(win.id, x, y)}
                            onResize={(w, h) => resizeWindow(win.id, w, h)}
                            className={win.appId === 'underground' ? 'bg-white' : 'bg-slate-50'}
                        >
                            <AppContainer onClose={() => closeWindow(win.id)}>
                                {app.component}
                            </AppContainer>
                        </Window>
                    );
                })}
            </AnimatePresence>

            <Dock items={apps} openApp={openApp} />
        </div>
    );
};
