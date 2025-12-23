import React, { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingBag, Heart, User, Zap } from 'lucide-react';

export const SheinApp: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'global');
    const wallet = state.wallets.SimCash;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = shop?.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="flex flex-col h-full bg-white font-sans">
            {/* Header */}
            <div className="p-3 flex items-center justify-between sticky top-0 bg-white z-10 border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-2xl tracking-widest">SHEIN</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 rounded-full px-3 py-1">
                        <Search size={16} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none text-xs w-24"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ShoppingBag size={20} />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto px-3 py-2 gap-6 text-sm font-medium border-b border-slate-100 sticky top-[57px] bg-white z-10">
                <span className="border-b-2 border-black pb-1">Women</span>
                <span className="text-slate-400">Curve</span>
                <span className="text-slate-400">Kids</span>
                <span className="text-slate-400">Men</span>
                <span className="text-slate-400">Home</span>
                <span className="text-slate-400">Beauty</span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {!searchQuery && (
                    <>
                        {/* Hero Banner */}
                        <div className="relative h-96">
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                                alt="Fashion"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white text-center p-4">
                                <h2 className="text-4xl font-bold mb-2">Cyber Monday</h2>
                                <p className="text-xl mb-4">UP TO 90% OFF</p>
                                <button className="bg-white text-black px-8 py-2 font-bold text-sm tracking-widest hover:bg-slate-100">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>

                        {/* Flash Sale */}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Zap size={20} className="fill-black" />
                                    <span className="font-bold">Flash Sale</span>
                                </div>
                                <div className="flex gap-1 text-xs font-bold">
                                    <span className="bg-black text-white px-1">05</span>:
                                    <span className="bg-black text-white px-1">12</span>:
                                    <span className="bg-black text-white px-1">33</span>
                                </div>
                            </div>

                            <div className="flex gap-3 overflow-x-auto pb-4">
                                {shop?.products.slice(0, 5).map((product) => (
                                    <div key={product.id} className="w-32 shrink-0">
                                        <div className="w-32 h-40 bg-slate-100 mb-2 relative">
                                            <div className="absolute top-0 left-0 bg-yellow-300 text-[10px] font-bold px-1 py-0.5">
                                                -60%
                                            </div>
                                        </div>
                                        <div className="font-bold">₱{formatMoney(product.cost).replace('$', '')}</div>
                                        <div className="w-full h-1 bg-slate-200 mt-1">
                                            <div className="w-1/2 h-full bg-black"></div>
                                        </div>
                                        <div className="text-[10px] text-slate-500 mt-0.5">50% Sold</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Grid */}
                <div className="grid grid-cols-2 gap-1 p-1">
                    {filteredProducts.map((product) => {
                        const canAfford = wallet.balance >= product.cost;
                        return (
                            <div key={`grid-${product.id}`} className="relative group">
                                <div className="aspect-[3/4] bg-slate-100 relative">
                                    <button className="absolute bottom-2 right-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => buyProduct(shop?.id || 'global', product.id)} disabled={!canAfford}>
                                        <ShoppingBag size={16} />
                                    </button>
                                </div>
                                <div className="p-2">
                                    <div className="text-xs text-slate-600 truncate">{product.name}</div>
                                    <div className="font-bold">₱{formatMoney(product.cost).replace('$', '')}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="border-t border-slate-100 p-2 flex justify-around text-slate-400 text-[10px]">
                <div className="flex flex-col items-center gap-1 text-black">
                    <ShoppingBag size={20} />
                    <span>Shop</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Search size={20} />
                    <span>Category</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Zap size={20} />
                    <span>New</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Heart size={20} />
                    <span>Wishlist</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <User size={20} />
                    <span>Me</span>
                </div>
            </div>
        </div>
    );
};
