import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingCart, Menu, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export const EbayApp: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'underground');
    const wallet = state.wallets.SimCash;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = shop?.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="flex flex-col h-full bg-white font-sans">
            {/* Header */}
            <div className="p-3 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <Menu size={24} className="text-slate-700" />
                        <span className="font-bold text-2xl tracking-tight">
                            <span className="text-[#e53238]">e</span>
                            <span className="text-[#0064d2]">b</span>
                            <span className="text-[#f5af02]">a</span>
                            <span className="text-[#86b817]">y</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700">
                        <ShoppingCart size={24} />
                    </div>
                </div>

                <div className="bg-slate-100 rounded-full flex items-center px-4 py-2 gap-2">
                    <Search size={18} className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search for anything"
                        className="flex-1 bg-transparent text-sm outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {/* Categories */}
                <div className="p-4 flex gap-4 overflow-x-auto">
                    {['Saved', 'Electronics', 'Motors', 'Fashion', 'Collectibles', 'Home'].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                {/* Icon placeholder */}
                            </div>
                            <span className="text-xs text-slate-700 font-medium">{item}</span>
                        </div>
                    ))}
                </div>

                {!searchQuery && (
                    /* Hero */
                    <div className="mx-4 mb-6 bg-blue-600 rounded-xl p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-2">Daily Deals</h2>
                            <p className="mb-4 opacity-90">Get them before they're gone.</p>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-50">
                                Shop Now
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 translate-y-10" />
                    </div>
                )}

                {/* Product List */}
                <div className="px-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg text-slate-800">{searchQuery ? 'Results' : 'Recommended for you'}</h3>
                        {!searchQuery && (
                            <div className="flex items-center gap-1 text-blue-600 text-sm font-bold">
                                See all <ArrowRight size={16} />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {filteredProducts.map((product) => {
                            const canAfford = wallet.balance >= product.cost;
                            return (
                                <div key={product.id} className="flex gap-3 border-b border-slate-100 pb-4">
                                    <div className="w-24 h-24 bg-slate-100 rounded-lg shrink-0"></div>
                                    <div className="flex-1 flex flex-col">
                                        <div className="text-sm text-slate-800 line-clamp-2 mb-1 hover:underline cursor-pointer">
                                            {product.name}
                                        </div>
                                        <div className="text-xs text-slate-500 mb-2">Brand New</div>
                                        <div className="font-bold text-lg">₱{formatMoney(product.cost).replace('$', '')}</div>
                                        <div className="text-xs text-slate-500 mb-2">Free Shipping</div>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-xs text-red-600 font-bold">12 watching</span>
                                            <button
                                                onClick={() => buyProduct(shop?.id || 'underground', product.id)}
                                                disabled={!canAfford}
                                                className={clsx(
                                                    "px-4 py-1.5 rounded-full text-xs font-bold border",
                                                    canAfford
                                                        ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                                                        : "border-slate-200 text-slate-300"
                                                )}
                                            >
                                                {canAfford ? 'Buy It Now' : 'No Funds'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
