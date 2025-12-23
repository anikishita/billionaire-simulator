import React from 'react';
import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingCart, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

export const TemuApp: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'future'); // Using Future for Temu
    const wallet = state.wallets.SimCash;

    return (
        <div className="flex flex-col h-full bg-[#f5f5f5] font-sans">
            {/* Header */}
            <div className="bg-white p-3 sticky top-0 z-10 border-b border-slate-100">
                <div className="flex items-center justify-center mb-2 relative">
                    <span className="text-[#fb7701] font-black text-2xl tracking-tighter">TEMU</span>
                    <div className="absolute right-0 flex gap-3 text-slate-700">
                        <Search size={22} />
                        <ShoppingCart size={22} />
                    </div>
                </div>

                <div className="flex items-center justify-around text-[10px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1">
                        <Truck size={12} /> Free shipping
                    </div>
                    <div className="flex items-center gap-1">
                        <RotateCcw size={12} /> Free returns
                    </div>
                    <div className="flex items-center gap-1">
                        <ShieldCheck size={12} /> Price adjustment
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {/* Gamified Banner */}
                <div className="bg-[#fb7701] p-4 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black italic mb-1">LIGHTNING DEALS</h2>
                        <p className="font-bold text-yellow-200">UP TO 90% OFF</p>
                        <div className="mt-3 flex justify-center gap-2">
                            <div className="bg-white text-[#fb7701] px-3 py-1 rounded-full font-bold text-xs animate-pulse">
                                00:12:45
                            </div>
                        </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                </div>

                {/* Categories */}
                <div className="bg-white p-3 mb-2 flex gap-4 overflow-x-auto text-xs font-medium text-slate-600">
                    <span className="text-[#fb7701] font-bold border-b-2 border-[#fb7701]">Best Sellers</span>
                    <span>New Arrivals</span>
                    <span>Home</span>
                    <span>Electronics</span>
                    <span>Fashion</span>
                    <span>Beauty</span>
                </div>

                {/* Product Grid */}
                <div className="p-2 grid grid-cols-2 gap-2">
                    {shop?.products.map((product) => {
                        const canAfford = wallet.balance >= product.cost;
                        return (
                            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col group">
                                <div className="aspect-square bg-slate-100 relative">
                                    <div className="absolute bottom-2 left-2 bg-white/90 text-[#fb7701] text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#fb7701]">
                                        Almost sold out
                                    </div>
                                </div>
                                <div className="p-2 flex-1 flex flex-col">
                                    <div className="text-xs line-clamp-2 mb-1 text-slate-800">
                                        {product.name}
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-[#fb7701] font-bold text-lg">₱{formatMoney(product.cost).replace('$', '')}</span>
                                        <span className="text-slate-400 text-xs line-through">₱{formatMoney(product.cost * 2).replace('$', '')}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 mb-2">100k+ sold</div>

                                    <button
                                        onClick={() => buyProduct(shop.id, product.id)}
                                        disabled={!canAfford}
                                        className={clsx(
                                            "w-full py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95",
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
                <div className="flex flex-col items-center gap-1 text-[#fb7701]">
                    <span className="font-bold">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>Categories</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>You</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>Cart</span>
                </div>
            </div>
        </div>
    );
};
