import React, { useState } from 'react';
import { HomeScreen } from './os/HomeScreen';
import { AppWindow } from './os/AppWindow';
import { WalletApp } from './apps/WalletApp';
import { Settings } from './Settings';
import { QuickBuy } from './shops/QuickBuy';
import { ShopeeApp } from './apps/ShopeeApp';
import { LazadaApp } from './apps/LazadaApp';
import { SheinApp } from './apps/SheinApp';
import { TemuApp } from './apps/TemuApp';
import { EbayApp } from './apps/EbayApp';

export const Layout: React.FC = () => {
    const [openApp, setOpenApp] = useState<string | null>(null);

    const renderAppContent = () => {
        switch (openApp) {
            case 'wallets':
                return <WalletApp />;
            case 'settings':
                return <Settings />;
            case 'quickbuy':
                return <QuickBuy />;
            case 'megamall':
                return <ShopeeApp />;
            case 'luxury':
                return <LazadaApp />;
            case 'global':
                return <SheinApp />;
            case 'future':
                return <TemuApp />;
            case 'underground':
                return <EbayApp />;
            default:
                return null;
        }
    };

    const getAppTitle = () => {
        switch (openApp) {
            case 'wallets': return 'My Wallets';
            case 'settings': return 'Settings';
            case 'quickbuy': return 'QuickBuy';
            case 'megamall': return 'Shopee';
            case 'luxury': return 'Lazada';
            case 'global': return 'SHEIN';
            case 'future': return 'Temu';
            case 'underground': return 'eBay';
            default: return 'App';
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-black text-slate-900 font-sans">
            <HomeScreen openApp={setOpenApp} />

            <AppWindow
                isOpen={!!openApp}
                onClose={() => setOpenApp(null)}
                title={getAppTitle()}
                className={openApp === 'underground' ? 'bg-white' : 'bg-slate-50'}
            >
                {renderAppContent()}
            </AppWindow>
        </div>
    );
};
