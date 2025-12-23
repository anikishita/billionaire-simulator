import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatMoney } from '../utils/format';
import { Lock, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import * as Icons from 'lucide-react';
import { ShopDetail } from './ShopDetail';

export const ShopList: React.FC = () => {
    const { state, unlockShop } = useGame();
    const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

    const getIcon = (iconName: string) => {
        const Icon = (Icons as any)[iconName] || Icons.ShoppingBag;
        return Icon;
    };

    if (selectedShopId) {
        return <ShopDetail shopId={selectedShopId} onBack={() => setSelectedShopId(null)} />;
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Marketplaces
                </h1>
                <p className="text-slate-400 mt-1">Invest in businesses and build your empire.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.shops.map((shop) => {
                    const Icon = getIcon(shop.icon);
                    const isUnlocked = shop.unlocked;
                    const canUnlock = state.wallets.SimCash.balance >= shop.unlockCost;

                    return (
                        <div
                            key={shop.id}
                            onClick={() => isUnlocked && setSelectedShopId(shop.id)}
                            className={clsx(
                                'relative group p-6 rounded-2xl border transition-all duration-300',
                                isUnlocked
                                    ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:scale-[1.02] cursor-pointer'
                                    : 'bg-slate-900/20 border-slate-800/50 opacity-75'
                            )}
                        >
                            {!isUnlocked && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm rounded-2xl z-10 p-6 text-center">
                                    <Lock className="w-8 h-8 text-slate-500 mb-3" />
                                    <h3 className="font-bold text-white mb-2">Restricted Access</h3>
                                    <p className="text-sm text-slate-400 mb-4">Unlock {shop.name} to start trading.</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            unlockShop(shop.id);
                                        }}
                                        disabled={!canUnlock}
                                        className={clsx(
                                            'px-4 py-2 rounded-lg text-sm font-bold transition-colors',
                                            canUnlock
                                                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                        )}
                                    >
                                        Unlock for {formatMoney(shop.unlockCost)}
                                    </button>
                                </div>
                            )}

                            <div className={clsx(
                                'w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br text-white shadow-lg',
                                shop.theme
                            )}>
                                <Icon size={24} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg text-slate-200">{shop.name}</h3>
                                    {isUnlocked && <ArrowRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />}
                                </div>
                                <p className="text-sm text-slate-400 h-10">{shop.description}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-800/50">
                                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">
                                        Currency: {shop.currency}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
