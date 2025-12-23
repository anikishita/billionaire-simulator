import React from 'react';
import { useGame } from '../../context/GameContext';
import { formatMoney } from '../../utils/format';
import { Search, ShoppingCart, MapPin, Star, Menu } from 'lucide-react';
import { clsx } from 'clsx';

export const QuickBuy: React.FC = () => {
    const { state, buyProduct } = useGame();
    const shop = state.shops.find((s) => s.id === 'quickbuy');
    const wallet = state.wallets.SimCash;

    if (!shop) return null;

    return (
        <div className="flex flex-col h-full bg-slate-100 font-sans">
            {/* Navbar */}
            <div className="bg-[#131921] text-white p-2 flex items-center gap-4 shrink-0">
                <div className="flex flex-col leading-tight hover:outline hover:outline-1 hover:outline-white p-1 rounded cursor-pointer">
                    <span className="text-[10px] text-slate-300">Deliver to</span>
                    <div className="flex items-center gap-1 font-bold text-sm">
                        <MapPin size={14} />
                        <span>New York 10001</span>
                    </div>
                </div>

                <div className="flex-1 flex h-10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#f90]">
                    <button className="bg-slate-200 text-slate-700 px-3 text-xs border-r border-slate-300 hover:bg-slate-300">
                        All
                    </button>
                    <input
                        type="text"
                        placeholder="Search QuickBuy"
                        className="flex-1 px-3 text-black focus:outline-none"
                    />
                    <button className="bg-[#febd69] hover:bg-[#f3a847] px-4 text-slate-900">
                        <Search size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col leading-tight cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1 rounded">
                        <span className="text-xs">Hello, Boss</span>
                        <span className="font-bold text-sm">Account & Lists</span>
                    </div>
                    <div className="flex flex-col leading-tight cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1 rounded">
                        <span className="text-xs">Returns</span>
                        <span className="font-bold text-sm">& Orders</span>
                    </div>
                    <div className="flex items-end gap-1 cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1 rounded">
                        <div className="relative">
                            <ShoppingCart size={28} />
                            <span className="absolute -top-1 -right-1 bg-[#f90] text-[#131921] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </div>
                        <span className="font-bold text-sm">Cart</span>
                    </div>
                </div>
            </div>

            {/* Sub-navbar */}
            <div className="bg-[#232f3e] text-white text-sm flex items-center gap-4 px-4 py-1.5 shrink-0 overflow-x-auto">
                <button className="flex items-center gap-1 font-bold hover:outline hover:outline-1 hover:outline-white px-1 rounded">
                    <Menu size={16} /> All
                </button>
                {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map(item => (
                    <button key={item} className="hover:outline hover:outline-1 hover:outline-white px-1 rounded whitespace-nowrap">
                        {item}
                    </button>
                ))}
                <div className="ml-auto font-bold hover:outline hover:outline-1 hover:outline-white px-1 rounded cursor-pointer text-[#f90]">
                    Shop the Gaming Week Deals
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 bg-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {/* Wallet Balance Card */}
                    <div className="bg-white p-4 rounded shadow-sm flex flex-col justify-between h-full">
                        <h3 className="font-bold text-xl mb-2">Your SimCash Balance</h3>
                        <div className="text-3xl font-bold text-green-600 mb-4">{formatMoney(wallet.balance)}</div>
                        <p className="text-sm text-slate-600">Use SimCash for everyday purchases and quick deliveries.</p>
                        <a href="#" className="text-[#007185] text-sm hover:underline mt-4">Manage Balance</a>
                    </div>

                    {shop.products.map((product) => {
                        const canAfford = wallet.balance >= product.cost;
                        return (
                            <div key={product.id} className="bg-white p-4 rounded shadow-sm flex flex-col h-full">
                                <div className="flex-1 mb-4 flex items-center justify-center bg-slate-50 rounded p-4">
                                    {/* Placeholder Image */}
                                    <div className="w-32 h-32 bg-slate-200 rounded flex items-center justify-center text-slate-400">
                                        Image
                                    </div>
                                </div>

                                <a href="#" className="text-lg font-medium hover:text-[#c7511f] hover:underline line-clamp-2 mb-1">
                                    {product.name} - {product.description}
                                </a>

                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex text-[#f90]">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span className="text-[#007185] text-sm hover:underline cursor-pointer">12,403</span>
                                </div>

                                <div className="mb-2">
                                    <span className="text-xs align-top">$</span>
                                    <span className="text-2xl font-medium">{Math.floor(product.cost)}</span>
                                    <span className="text-xs align-top">{(product.cost % 1).toFixed(2).substring(2)}</span>
                                </div>

                                <div className="flex items-center gap-1 text-sm text-slate-600 mb-4">
                                    <span className="text-[#007185]">FREE delivery</span>
                                    <span className="font-bold">Tomorrow, Dec 24</span>
                                </div>

                                <button
                                    onClick={() => buyProduct(shop.id, product.id)}
                                    disabled={!canAfford}
                                    className={clsx(
                                        'w-full py-1.5 rounded-full text-sm shadow-sm border border-yellow-500 transition-colors mb-2',
                                        canAfford
                                            ? 'bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800]'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300'
                                    )}
                                >
                                    {canAfford ? 'Add to Cart' : 'Insufficient Funds'}
                                </button>
                                <button
                                    onClick={() => buyProduct(shop.id, product.id)}
                                    disabled={!canAfford}
                                    className={clsx(
                                        'w-full py-1.5 rounded-full text-sm shadow-sm border border-[#f08804] transition-colors',
                                        canAfford
                                            ? 'bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e37b00]'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300'
                                    )}
                                >
                                    {canAfford ? 'Buy Now' : 'Insufficient Funds'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
