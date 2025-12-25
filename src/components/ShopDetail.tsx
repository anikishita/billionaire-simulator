import React from 'react';
import { useGame } from '../hooks/useGame';
import { formatMoney } from '../utils/format';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { clsx } from 'clsx';
import * as Icons from 'lucide-react';

interface ShopDetailProps {
    shopId: string;
    onBack: () => void;
}

export const ShopDetail: React.FC<ShopDetailProps> = ({ shopId, onBack }) => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === shopId);

    if (!shop) return null;

    const wallet = state.wallets[shop.currency];
    const IconComponent = Icons[shop.icon as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }> || Icons.ShoppingBag;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <header className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
                        {shop.name}
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                            {wallet.name}: {formatMoney(wallet.balance)}
                        </span>
                    </h1>
                    <p className="text-slate-400 mt-1">{shop.description}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {shop.products.map((product) => {
                    const canAfford = wallet.balance >= product.cost;

                    return (
                        <div
                            key={product.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className={clsx(
                                    'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-lg',
                                    shop.theme
                                )}>
                                    <IconComponent size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-200">{product.name}</h3>
                                    <p className="text-sm text-slate-400">{product.description}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs font-bold text-emerald-400">
                                            +{formatMoney(product.incomePerSecond)}/sec
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            Owned: {product.owned}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => buyProduct(shop.id, product.id)}
                                disabled={!canAfford}
                                className={clsx(
                                    'flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95',
                                    canAfford
                                        ? 'bg-white text-slate-950 hover:bg-slate-200 shadow-lg shadow-white/10'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                )}
                            >
                                <ShoppingCart size={18} />
                                <span>Buy {formatMoney(product.cost)}</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
