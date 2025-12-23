import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingCart, Wallet, Star } from 'lucide-react';
import { clsx } from 'clsx';

export const LazadaApp: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'luxury');
    const products = shop?.products || [];
    const wallet = state.wallets.SimCash;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="flex flex-col h-full bg-[#f5f5f5] font-sans">
            {/* Header */}
            <div className="bg-white p-3 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[#0f146d] font-bold text-xl tracking-tighter">Lazada</span>
                    <div className="flex items-center gap-3 text-slate-600">
                        <Wallet size={24} />
                        <span className="text-xs font-bold">₱{formatMoney(wallet.balance).replace('$', '')}</span>
                    </div>
                </div>

                <div className="bg-slate-100 rounded-lg flex items-center p-2 gap-2 border border-[#0f146d]/10">
                    <Search size={18} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search in Lazada"
                        className="flex-1 bg-transparent text-sm outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-[#0f146d] text-white px-4 py-1 rounded text-xs font-bold">
                        SEARCH
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-2">
                {!searchQuery && (
                    <>
                        {/* Banner */}
                        <div className="rounded-xl overflow-hidden mb-3 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
                                alt="Sale"
                                className="w-full h-32 object-cover"
                            />
                        </div>

                        {/* Icons */}
                        <div className="grid grid-cols-5 gap-2 mb-4">
                            {['LazMall', 'Vouchers', 'Top Up', 'LazLive', 'Global'].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#0f146d]">
                                        <Star size={16} />
                                    </div>
                                    <span className="text-[10px] text-slate-600">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Flash Sale */}
                        <div className="bg-white rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[#f57224] font-bold">Flash Sale</span>
                                <span className="text-[#0f146d] text-xs border border-[#0f146d] px-2 rounded-full">SHOP ALL PRODUCTS</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {products.slice(0, 3).map((product) => (
                                    <div key={product.id} className="flex flex-col">
                                        <div className="aspect-square bg-slate-100 rounded mb-1 relative">
                                            <div className="absolute top-0 left-0 bg-[#f57224] text-white text-[8px] px-1 rounded-br">
                                                -90%
                                            </div>
                                        </div>
                                        <span className="text-[#f57224] font-bold text-sm">₱{formatMoney(product.cost).replace('$', '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Just For You */}
                <h3 className="font-bold text-slate-700 mb-2">{searchQuery ? 'Search Results' : 'Just For You'}</h3>
                <div className="grid grid-cols-2 gap-2">
                    {filteredProducts.map((product) => {
                        const canAfford = wallet.balance >= product.cost;
                        return (
                            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col">
                                <div className="aspect-square bg-slate-100 relative">
                                    {/* Image */}
                                </div>
                                <div className="p-2 flex-1 flex flex-col">
                                    <div className="text-xs line-clamp-2 mb-2 text-slate-800 h-8">
                                        {product.name}
                                    </div>
                                    <div className="mt-auto">
                                        <span className="text-[#f57224] font-bold text-base">₱{formatMoney(product.cost).replace('$', '')}</span>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-[10px] text-slate-400">1.2k Sold</span>
                                            <button
                                                onClick={() => buyProduct(shop?.id || 'luxury', product.id)}
                                                disabled={!canAfford}
                                                className={clsx(
                                                    "p-1 rounded-full",
                                                    canAfford ? "text-[#0f146d] hover:bg-slate-100" : "text-slate-300"
                                                )}
                                            >
                                                <ShoppingCart size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-white border-t border-slate-200 p-2 flex justify-around text-slate-500 text-[10px]">
                <div className="flex flex-col items-center gap-1 text-[#0f146d]">
                    <span className="font-bold">For You</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>Feed</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>Messages</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>Cart</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span>Account</span>
                </div>
            </div>
        </div>
    );
};
