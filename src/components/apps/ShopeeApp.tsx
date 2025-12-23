import React, { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingCart, MessageCircle, Star } from 'lucide-react';
import { clsx } from 'clsx';

export const ShopeeApp: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'megamall');
    const wallet = state.wallets.SimCash;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = shop?.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    if (!shop) return null;

    return (
        <div className="flex flex-col h-full bg-slate-100 font-sans">
            {/* Header */}
            <div className="bg-gradient-to-b from-[#f53d2d] to-[#f63] text-white p-3 sticky top-0 z-10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 bg-white rounded-sm flex items-center p-1.5 gap-2">
                        <Search size={16} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Sign up and get 100% off"
                            className="flex-1 text-sm text-black outline-none placeholder:text-[#f53d2d]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ShoppingCart size={24} />
                    <MessageCircle size={24} />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {/* Banner (Only show if no search) */}
                {!searchQuery && (
                    <>
                        <div className="relative h-40 bg-slate-200">
                            <img
                                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                                alt="Banner"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                1/6
                            </div>
                        </div>

                        {/* Categories / Icons */}
                        <div className="bg-white p-4 grid grid-cols-5 gap-4 mb-2">
                            {[
                                { label: 'Mall', icon: 'Store', color: 'text-red-500' },
                                { label: 'Flash', icon: 'Zap', color: 'text-orange-500' },
                                { label: 'Load', icon: 'Smartphone', color: 'text-green-500' },
                                { label: 'Food', icon: 'Utensils', color: 'text-yellow-500' },
                                { label: 'Win', icon: 'Gift', color: 'text-blue-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center shadow-sm">
                                        <span className={clsx("font-bold text-xs", item.color)}>{item.label}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-600">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Flash Sale */}
                        <div className="bg-white p-3 mb-2">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold italic text-lg">FLASH SALE</span>
                                    <div className="flex gap-1 text-white text-xs font-bold">
                                        <span className="bg-black px-1 rounded">02</span>
                                        <span className="bg-black px-1 rounded">15</span>
                                        <span className="bg-black px-1 rounded">44</span>
                                    </div>
                                </div>
                                <span className="text-slate-500 text-xs">See All &gt;</span>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {shop.products.slice(0, 5).map((product) => (
                                    <div key={`flash-${product.id}`} className="w-24 shrink-0 flex flex-col gap-1">
                                        <div className="w-24 h-24 bg-slate-100 rounded relative">
                                            <div className="absolute top-0 right-0 bg-yellow-400 text-red-600 text-[10px] font-bold px-1">
                                                -50%
                                            </div>
                                        </div>
                                        <div className="text-orange-500 text-sm font-bold">
                                            ₱{formatMoney(product.cost).replace('$', '')}
                                        </div>
                                        <div className="w-full h-3 bg-red-100 rounded-full relative overflow-hidden">
                                            <div className="absolute left-0 top-0 h-full bg-red-500 w-3/4" />
                                            <span className="absolute inset-0 text-[8px] text-white flex items-center justify-center font-bold">
                                                SOLD 12
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Daily Discover / Search Results */}
                <div className="p-2">
                    <div className="text-orange-500 font-bold mb-2 sticky top-0 bg-slate-100 py-2 z-10">
                        {searchQuery ? `Results for "${searchQuery}"` : 'DAILY DISCOVER'}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {filteredProducts.map((product) => {
                            const canAfford = wallet.balance >= product.cost;
                            return (
                                <div key={product.id} className="bg-white rounded shadow-sm overflow-hidden flex flex-col">
                                    <div className="aspect-square bg-slate-200 relative">
                                        {/* Image placeholder */}
                                        <div className="absolute bottom-0 left-0 bg-[#f53d2d] text-white text-[10px] px-1">
                                            Mall
                                        </div>
                                    </div>
                                    <div className="p-2 flex-1 flex flex-col">
                                        <div className="text-xs line-clamp-2 mb-2 text-slate-800">
                                            {product.name} - {product.description}
                                        </div>
                                        <div className="mt-auto">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[10px] text-orange-500">₱</span>
                                                <span className="text-base font-bold text-orange-500">
                                                    {formatMoney(product.cost).replace('$', '')}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                                <div className="flex text-yellow-400 text-[10px]">
                                                    <Star size={10} fill="currentColor" />
                                                    <Star size={10} fill="currentColor" />
                                                    <Star size={10} fill="currentColor" />
                                                    <Star size={10} fill="currentColor" />
                                                    <Star size={10} fill="currentColor" />
                                                </div>
                                                <span className="text-[10px] text-slate-500">10k sold</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => buyProduct(shop.id, product.id)}
                                            disabled={!canAfford}
                                            className={clsx(
                                                "mt-2 w-full py-1 text-xs font-bold text-white rounded shadow-sm active:scale-95 transition-transform",
                                                canAfford ? "bg-[#f53d2d]" : "bg-slate-300"
                                            )}
                                        >
                                            {canAfford ? 'Buy Now' : 'No Funds'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-white border-t border-slate-200 p-2 flex justify-around text-slate-500 text-[10px]">
                <div className="flex flex-col items-center gap-1 text-[#f53d2d]">
                    <div className="w-6 h-6 bg-[#f53d2d] rounded-full" />
                    <span>Daily</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 border border-slate-300 rounded" />
                    <span>Mall</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 border border-slate-300 rounded" />
                    <span>Live</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 border border-slate-300 rounded" />
                    <span>Video</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 border border-slate-300 rounded" />
                    <span>Me</span>
                </div>
            </div>
        </div>
    );
};
