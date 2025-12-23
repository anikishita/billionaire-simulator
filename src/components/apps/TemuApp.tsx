import React, { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingCart, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

export const TemuApp: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'future');
    const wallet = state.wallets.SimCash;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = shop?.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="flex flex-col h-full bg-[#f5f5f5] font-sans overflow-auto">
            {/* Header */}
            <div className="bg-white p-2 sm:p-3 sticky top-0 z-10 border-b border-slate-100">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2 relative">
                    <span className="text-[#fb7701] font-black text-xl sm:text-2xl tracking-tighter">TEMU</span>
                    <div className="flex-1 mx-3 sm:mx-4 bg-slate-100 rounded-full flex items-center px-2 sm:px-3 py-1">
                        <Search size={14} className="sm:w-4 sm:h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none text-xs sm:text-sm w-full ml-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 sm:gap-3 text-slate-700">
                        <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
                    </div>
                </div>

                <div className="flex items-center justify-around text-[9px] sm:text-[10px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1">
                        <Truck size={10} className="sm:w-3 sm:h-3" /> Free shipping
                    </div>
                    <div className="flex items-center gap-1">
                        <RotateCcw size={10} className="sm:w-3 sm:h-3" /> Free returns
                    </div>
                    <div className="flex items-center gap-1">
                        <ShieldCheck size={10} className="sm:w-3 sm:h-3" /> Price adjustment
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {!searchQuery && (
                    <>
                        {/* Gamified Banner */}
                        <div className="bg-[#fb7701] p-3 sm:p-4 text-white text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl sm:text-3xl font-black italic mb-0.5 sm:mb-1">LIGHTNING DEALS</h2>
                                <p className="font-bold text-sm sm:text-base text-yellow-200">UP TO 90% OFF</p>
                                <div className="mt-2 sm:mt-3 flex justify-center gap-2">
                                    <div className="bg-white text-[#fb7701] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold text-[10px] sm:text-xs animate-pulse">
                                        00:12:45
                                    </div>
                                </div>
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-2 sm:p-3 mb-2 flex gap-3 sm:gap-4 overflow-x-auto text-[10px] sm:text-xs font-medium text-slate-600">
                            <span className="text-[#fb7701] font-bold border-b-2 border-[#fb7701] whitespace-nowrap">Best Sellers</span>
                            <span className="whitespace-nowrap">New Arrivals</span>
                            <span className="whitespace-nowrap">Home</span>
                            <span className="whitespace-nowrap">Electronics</span>
                            <span className="whitespace-nowrap">Fashion</span>
                            <span className="whitespace-nowrap">Beauty</span>
                        </div>
                    </>
                )}

                {/* Product Grid */}
                <div className="p-1.5 sm:p-2 grid grid-cols-2 gap-1.5 sm:gap-2">
                    {filteredProducts.map((product) => {
                        const canAfford = wallet.balance >= product.cost;
                        return (
                            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col group">
                                <div className="aspect-square bg-slate-100 relative">
                                    <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 bg-white/90 text-[#fb7701] text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full border border-[#fb7701]">
                                        Almost sold out
                                    </div>
                                </div>
                                <div className="p-1.5 sm:p-2 flex-1 flex flex-col">
                                    <div className="text-[10px] sm:text-xs line-clamp-2 mb-1 text-slate-800">
                                        {product.name}
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-[#fb7701] font-bold text-base sm:text-lg">₱{formatMoney(product.cost).replace('$', '')}</span>
                                        <span className="text-slate-400 text-[10px] sm:text-xs line-through">₱{formatMoney(product.cost * 2).replace('$', '')}</span>
                                    </div>
                                    <div className="text-[9px] sm:text-[10px] text-slate-500 mb-1.5 sm:mb-2">100k+ sold</div>

                                    <button
                                        onClick={() => buyProduct(shop?.id || 'future', product.id)}
                                        disabled={!canAfford}
                                        className={clsx(
                                            "w-full py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-transform active:scale-95",
                                            canAfford
                                                ? "bg-[#fb7701] text-white hover:bg-[#e06a00]"
                                                : "bg-slate-200 text-slate-400"
                                        )}
                                    >
                                        {canAfford ? 'Add to cart' : 'No Funds'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-white border-t border-slate-200 p-2 flex justify-around text-slate-500 text-[10px]">
                <button className="flex flex-col items-center gap-1 text-[#fb7701]" onClick={() => alert('Home - Already here!')}>
                    <span className="font-bold">Home</span>
                </button>
                <button className="flex flex-col items-center gap-1" onClick={() => alert('Categories - Coming soon!')}>
                    <span>Categories</span>
                </button>
                <button className="flex flex-col items-center gap-1" onClick={() => alert('You - Coming soon!')}>
                    <span>You</span>
                </button>
                <button className="flex flex-col items-center gap-1" onClick={() => alert('Cart - Coming soon!')}>
                    <span>Cart</span>
                </button>
            </div>
        </div>
    );
};
