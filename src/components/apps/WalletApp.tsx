import React from 'react';
import { useGame } from '../../hooks/useGame';
import { formatMoney } from '../../utils/format';
import { Send, Smartphone, QrCode, Receipt, CreditCard, PiggyBank, ShieldCheck, LayoutGrid, Plus, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export const WalletApp: React.FC = () => {
    const { state } = useGame();
    const wallet = state.wallets.SimCash; // Main wallet

    const services = [
        { icon: Send, label: 'Send', color: 'text-blue-600' },
        { icon: Smartphone, label: 'Load', color: 'text-blue-600' },
        { icon: ArrowRight, label: 'Transfer', color: 'text-blue-600' },
        { icon: Receipt, label: 'Bills', color: 'text-blue-600' },
        { icon: CreditCard, label: 'Borrow', color: 'text-blue-600' },
        { icon: PiggyBank, label: 'GSave', color: 'text-blue-600' },
        { icon: ShieldCheck, label: 'GInsure', color: 'text-blue-600' },
        { icon: LayoutGrid, label: 'View All', color: 'text-blue-600' },
    ];

    return (
        <div className="flex flex-col h-full bg-slate-50 font-sans">
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white rounded-b-[2rem] shadow-lg pb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="font-bold">G</span>
                        </div>
                        <span className="font-bold text-lg">Hello!</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                            Fully Verified
                        </div>
                    </div>
                </div>

                <div className="px-2">
                    <p className="text-blue-100 text-sm mb-1">Available Balance</p>
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-bold tracking-tight">
                            {formatMoney(wallet.balance).replace('$', '₱ ')}
                        </h1>
                        <button className="flex items-center gap-1 bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform">
                            <Plus size={16} /> Cash In
                        </button>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="flex-1 overflow-auto">
                <div className="-mt-6 mx-4 bg-white rounded-2xl shadow-sm p-6 grid grid-cols-4 gap-y-6">
                    {services.map((service, index) => (
                        <button key={index} className="flex flex-col items-center gap-2 group">
                            <div className={clsx(
                                "w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95",
                                service.color
                            )}>
                                <service.icon size={24} />
                            </div>
                            <span className="text-xs text-slate-600 font-medium">{service.label}</span>
                        </button>
                    ))}
                </div>

                {/* Promos / Ads */}
                <div className="p-4 space-y-4">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 text-white shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-lg">GForest</h3>
                                <p className="text-sm opacity-90">Plant a tree today!</p>
                                <button className="mt-3 px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold hover:bg-white/30">
                                    Play Now
                                </button>
                            </div>
                            <ShieldCheck size={48} className="opacity-50" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-lg">GLife</h3>
                                <p className="text-sm opacity-90">Shop your favorite brands.</p>
                                <button className="mt-3 px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold hover:bg-white/30">
                                    Shop Now
                                </button>
                            </div>
                            <LayoutGrid size={48} className="opacity-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-white border-t border-slate-100 p-2 flex justify-around text-slate-400">
                <button className="flex flex-col items-center gap-1 text-blue-600">
                    <LayoutGrid size={24} />
                    <span className="text-[10px] font-medium">Home</span>
                </button>
                <button className="flex flex-col items-center gap-1 hover:text-blue-600">
                    <QrCode size={24} />
                    <span className="text-[10px] font-medium">QR</span>
                </button>
                <button className="flex flex-col items-center gap-1 hover:text-blue-600">
                    <Receipt size={24} />
                    <span className="text-[10px] font-medium">Activity</span>
                </button>
                <button className="flex flex-col items-center gap-1 hover:text-blue-600">
                    <ShieldCheck size={24} />
                    <span className="text-[10px] font-medium">Profile</span>
                </button>
            </div>
        </div>
    );
};
