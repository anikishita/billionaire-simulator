import React from 'react';
import { useGame } from '../context/GameContext';
import { formatMoney } from '../utils/format';
import { TrendingUp, Wallet, ShoppingBag, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface DashboardProps {
    setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
    const { state } = useGame();

    const stats = [
        {
            label: 'Net Worth',
            value: formatMoney(state.netWorth),
            subValue: 'Total Assets',
            icon: TrendingUp,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
        },
        {
            label: 'Income / Sec',
            value: formatMoney(state.incomePerSecond),
            subValue: 'Passive Revenue',
            icon: Wallet,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
        },
        {
            label: 'Rank',
            value: state.rank,
            subValue: 'Current Status',
            icon: ShoppingBag, // Placeholder icon
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
        },
    ];

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1">Welcome back, Boss.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-slate-300">Market Active</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={clsx(
                                'p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]',
                                'bg-slate-900/50',
                                stat.border
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={clsx('p-3 rounded-xl', stat.bg)}>
                                    <Icon className={clsx('w-6 h-6', stat.color)} />
                                </div>
                                <span className={clsx('text-xs font-bold px-2 py-1 rounded-full bg-slate-800 border border-slate-700', stat.color)}>
                                    +2.5%
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                                <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-slate-500">{stat.subValue}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setActiveTab('wallets')}
                            className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-left group"
                        >
                            <Wallet className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-slate-200">Manage Wallets</h3>
                            <p className="text-xs text-slate-400 mt-1">Transfer & Exchange</p>
                        </button>
                        <button
                            onClick={() => setActiveTab('shops')}
                            className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-left group"
                        >
                            <ShoppingBag className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-slate-200">Visit Market</h3>
                            <p className="text-xs text-slate-400 mt-1">Buy Assets</p>
                        </button>
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Market News</h2>
                        <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                            View All <ArrowRight size={12} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'CryptoSim surges by 15%', time: '2m ago', type: 'positive' },
                            { title: 'New luxury tax implemented', time: '15m ago', type: 'negative' },
                            { title: 'MegaMall expansion approved', time: '1h ago', type: 'neutral' },
                        ].map((news, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        'w-2 h-2 rounded-full',
                                        news.type === 'positive' ? 'bg-green-500' : news.type === 'negative' ? 'bg-red-500' : 'bg-blue-500'
                                    )} />
                                    <span className="text-sm font-medium text-slate-300">{news.title}</span>
                                </div>
                                <span className="text-xs text-slate-500">{news.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
