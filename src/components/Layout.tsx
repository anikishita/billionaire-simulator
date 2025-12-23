import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { WalletList } from './WalletList';
import { ShopList } from './ShopList';
import { Settings } from './Settings';

export const Layout: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard setActiveTab={setActiveTab} />;
            case 'wallets':
                return <WalletList />;
            case 'shops':
                return <ShopList />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="pl-20 lg:pl-64 min-h-screen transition-all duration-300">
                <div className="max-w-7xl mx-auto p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};
