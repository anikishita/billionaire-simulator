import React, { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { formatMoney } from '../utils/format';
import type { WalletType } from '../types';
import { Lock, ArrowRightLeft, Wallet as WalletIcon } from 'lucide-react';
import { clsx } from 'clsx';
import * as Icons from 'lucide-react';

export const WalletList: React.FC = () => {
    const { state, unlockWallet, transferFunds } = useGame();
    const [transferModalOpen, setTransferModalOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState<WalletType>('SimCash');
    const [selectedTarget, setSelectedTarget] = useState<WalletType>('PaySim');
    const [transferAmount, setTransferAmount] = useState('');

    const wallets = Object.values(state.wallets);

    const getIcon = (iconName: string) => {
        const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ size?: number; className?: string }> || WalletIcon;
        return IconComponent;
    };

    const handleTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(transferAmount);
        if (amount > 0 && state.wallets[selectedSource].balance >= amount) {
            transferFunds(selectedSource, selectedTarget, amount);
            setTransferModalOpen(false);
            setTransferAmount('');
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Wallets
                    </h1>
                    <p className="text-slate-400 mt-1">Manage your digital assets and currencies.</p>
                </div>
                <button
                    onClick={() => setTransferModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-emerald-500/20"
                >
                    <ArrowRightLeft size={18} />
                    Transfer Funds
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wallets.map((wallet) => {
                    const Icon = getIcon(wallet.icon);
                    const isUnlocked = wallet.unlocked;
                    const canUnlock = state.wallets.SimCash.balance >= wallet.unlockCost;

                    return (
                        <div
                            key={wallet.id}
                            className={clsx(
                                'relative p-6 rounded-2xl border transition-all duration-300',
                                isUnlocked
                                    ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                                    : 'bg-slate-900/20 border-slate-800/50 opacity-75'
                            )}
                        >
                            {!isUnlocked && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm rounded-2xl z-10 p-6 text-center">
                                    <Lock className="w-8 h-8 text-slate-500 mb-3" />
                                    <h3 className="font-bold text-white mb-2">Locked</h3>
                                    <p className="text-sm text-slate-400 mb-4">Unlock {wallet.name} to access exclusive markets.</p>
                                    <button
                                        onClick={() => unlockWallet(wallet.id)}
                                        disabled={!canUnlock}
                                        className={clsx(
                                            'px-4 py-2 rounded-lg text-sm font-bold transition-colors',
                                            canUnlock
                                                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                        )}
                                    >
                                        Unlock for {formatMoney(wallet.unlockCost)}
                                    </button>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-6">
                                <div className={clsx('p-3 rounded-xl text-white shadow-lg', wallet.color)}>
                                    <Icon size={24} />
                                </div>
                                {isUnlocked && (
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
                                        x{wallet.incomeMultiplier} Income
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-slate-200">{wallet.name}</h3>
                                <p className="text-2xl font-bold text-white tracking-tight">
                                    {formatMoney(wallet.balance)}
                                </p>
                                <p className="text-xs text-slate-500 h-10">{wallet.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Transfer Modal */}
            {transferModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-6">Transfer Funds</h2>
                        <form onSubmit={handleTransfer} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">From</label>
                                    <select
                                        value={selectedSource}
                                        onChange={(e) => setSelectedSource(e.target.value as WalletType)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        {wallets.filter(w => w.unlocked).map(w => (
                                            <option key={w.id} value={w.id}>{w.name}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Bal: {formatMoney(state.wallets[selectedSource].balance)}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">To</label>
                                    <select
                                        value={selectedTarget}
                                        onChange={(e) => setSelectedTarget(e.target.value as WalletType)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        {wallets.filter(w => w.unlocked && w.id !== selectedSource).map(w => (
                                            <option key={w.id} value={w.id}>{w.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Amount</label>
                                <input
                                    type="number"
                                    value={transferAmount}
                                    onChange={(e) => setTransferAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="p-3 bg-slate-800/50 rounded-lg text-xs text-slate-400 flex justify-between">
                                <span>Fee (5%)</span>
                                <span>{formatMoney(parseFloat(transferAmount || '0') * 0.05)}</span>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setTransferModalOpen(false)}
                                    className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!transferAmount || parseFloat(transferAmount) <= 0 || parseFloat(transferAmount) > state.wallets[selectedSource].balance}
                                    className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Transfer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
