import React, { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingCart, Menu, MapPin, Star } from 'lucide-react';
import { clsx } from 'clsx';

export const QuickBuy: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'quickbuy');
    const wallet = state.wallets.SimCash;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = shop?.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="flex flex-col h-full bg-slate-100 font-sans">
            {/* Header */}
            <div className="bg-[#131921] text-white p-2 flex items-center gap-2 sticky top-0 z-10">
                <div className="flex flex-col leading-none border border-transparent hover:border-white p-1 rounded cursor-pointer">
                    <span className="text-[10px] text-slate-300">Deliver to</span>
                    <div className="flex items-center font-bold text-xs">
                        <MapPin size={12} />
                        <span>Philippines</span>
                    </div>
                </div>

                <div className="flex-1 flex h-10 rounded overflow-hidden focus-within:ring-2 ring-[#f3a847]">
                    <div className="bg-slate-100 text-black text-xs flex items-center px-2 border-r border-slate-300 cursor-pointer hover:bg-slate-200">
                        All
                    </div>
                    <input
                        type="text"
                        className="flex-1 px-2 text-black outline-none"
                        placeholder="Search QuickBuy"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-[#febd69] px-3 hover:bg-[#f3a847] text-slate-800">
                        <Search size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-4 px-2">
                    <div className="flex flex-col leading-none border border-transparent hover:border-white p-1 rounded cursor-pointer">
                        <span className="text-[10px]">Hello, Sign in</span>
                        <span className="font-bold text-xs">Account & Lists</span>
                    </div>
                    <div className="flex flex-col leading-none border border-transparent hover:border-white p-1 rounded cursor-pointer">
                        <span className="text-[10px]">Returns</span>
                        <span className="font-bold text-xs">& Orders</span>
                    </div>
                    <div className="flex items-end border border-transparent hover:border-white p-1 rounded cursor-pointer">
                        <div className="relative">
                            <ShoppingCart size={28} />
                            <span className="absolute -top-1 -right-1 bg-[#f3a847] text-[#131921] font-bold text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                        </div>
                        <span className="font-bold text-xs mb-1">Cart</span>
                    </div>
                </div>
            </div>

            {/* Sub Header */}
            <div className="bg-[#232f3e] text-white px-4 py-1 flex items-center gap-4 text-xs font-medium overflow-x-auto">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white/80">
                    <Menu size={16} />
                    All
                </div>
                {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map(item => (
                    <span key={item} className="cursor-pointer hover:border border-white px-1 py-0.5 rounded whitespace-nowrap">{item}</span>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 max-w-[1500px] mx-auto w-full">
                {/* Hero Banner */}
                {!searchQuery && (
                    <div className="relative h-64 bg-gradient-to-t from-slate-100 to-transparent -mt-4 mb-4 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                            alt="Banner"
                            className="w-full h-full object-cover mask-image-gradient"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-100" />
                    </div>
                )}

                {/* Product Grid */}
                <div className={clsx("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10", !searchQuery && "-mt-32")}>
                    {filteredProducts.map((product) => {
                        const canAfford = wallet.balance >= product.cost;
                        return (
                            <div key={product.id} className="bg-white p-4 flex flex-col h-full border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer group">
                                <div className="text-xl font-bold mb-1 line-clamp-1">{product.name}</div>
                                <div className="aspect-square bg-slate-100 mb-2 flex items-center justify-center relative overflow-hidden">
                                    {/* Placeholder for product image */}
                                    <div className="text-slate-400 text-4xl font-bold opacity-20 group-hover:scale-110 transition-transform duration-500">
                                        {product.name.charAt(0)}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <div className="flex text-[#ffa41c]">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                        <span className="text-xs text-blue-600 hover:underline hover:text-orange-700 cursor-pointer">12,453</span>
                                    </div>

                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xs align-top mt-1">$</span>
                                        <span className="text-2xl font-medium">{formatMoney(product.cost).replace('$', '')}</span>
                                        <span className="text-xs align-top mt-1">00</span>
                                    </div>

                                    <div className="text-xs text-slate-500 line-clamp-2 mb-2">
                                        {product.description}
                                    </div>

                                    <div className="text-xs mb-2">
                                        <span className="text-[#007600] font-bold">In Stock</span>
                                    </div>

                                    <div className="mt-auto flex flex-col gap-2">
                                        <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-1 text-xs shadow-sm">
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => buyProduct(shop?.id || 'quickbuy', product.id)}
                                            disabled={!canAfford}
                                            className={clsx(
                                                "w-full rounded-full py-1 text-xs shadow-sm border",
                                                canAfford
                                                    ? "bg-[#ffa41c] hover:bg-[#fa8900] border-[#ff8f00]"
                                                    : "bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed"
                                            )}
                                        >
                                            {canAfford ? 'Buy Now' : 'Insufficient Funds'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
