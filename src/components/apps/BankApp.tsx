import React from 'react';
import { useGame } from '../../hooks/useGame';
import { formatMoney } from '../../utils/format';
import { ArrowUpRight, CreditCard, PieChart, Activity } from 'lucide-react';

export const BankApp: React.FC = () => {
    const { state } = useGame();
    const netWorth = state.netWorth;
    const income = state.incomePerSecond;

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-white font-sans overflow-auto">
            {/* Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800">
                <h2 className="text-slate-400 text-xs sm:text-sm font-medium mb-1">Total Net Worth</h2>
                <div className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 sm:mb-4 break-words">
                    ₱{formatMoney(netWorth).replace('$', '')}
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg text-sm font-medium">
                        <ArrowUpRight size={16} />
                        +₱{formatMoney(income).replace('$', '')}/sec
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium">
                        <Activity size={16} />
                        +12.5% this week
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">My Cards</span>
                        <button 
                            className="text-blue-400 text-xs sm:text-sm"
                            onClick={() => alert('Add New Card - Coming soon!')}
                        >
                            Add New
                        </button>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-3 sm:p-4 h-36 sm:h-40 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex justify-between items-start z-10">
                            <span className="font-bold italic">SimBank</span>
                            <CreditCard size={24} />
                        </div>
                        <div className="z-10">
                            <div className="text-xs opacity-80 mb-1">CARD HOLDER</div>
                            <div className="font-mono tracking-wider text-sm sm:text-base">**** **** **** 4242</div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
                    </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Spending Analysis</span>
                        <PieChart size={20} className="text-slate-400" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span>Shopping</span>
                            </div>
                            <span className="font-bold">65%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[65%]" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500" />
                                <span>Luxury</span>
                            </div>
                            <span className="font-bold">25%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[25%]" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span>Investments</span>
                            </div>
                            <span className="font-bold">10%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[10%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="flex-1 bg-white/5 p-4 sm:p-6 border-t border-white/10 overflow-auto">
                <h3 className="font-medium mb-4 text-sm sm:text-base">Recent Transactions</h3>
                <div className="space-y-3 sm:space-y-4">
                    {[
                        { name: 'Luxury District', date: 'Today, 10:42 AM', amount: -50000, icon: '🛍️' },
                        { name: 'MegaMall', date: 'Yesterday, 8:30 PM', amount: -2500, icon: '🛒' },
                        { name: 'Investment Return', date: 'Yesterday, 9:00 AM', amount: 15000, icon: '📈' },
                        { name: 'QuickBuy Market', date: 'Mon, 2:15 PM', amount: -150, icon: '📦' },
                    ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-lg sm:text-xl shrink-0">
                                    {tx.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-medium text-sm sm:text-base truncate">{tx.name}</div>
                                    <div className="text-xs text-slate-400">{tx.date}</div>
                                </div>
                            </div>
                            <div className={`font-bold text-sm sm:text-base shrink-0 ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                                {tx.amount > 0 ? '+' : ''}₱{formatMoney(Math.abs(tx.amount)).replace('$', '')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
