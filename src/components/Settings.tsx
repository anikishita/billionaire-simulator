import React from 'react';
import { useGame } from '../hooks/useGame';
import { Trash2 } from 'lucide-react';

export const Settings: React.FC = () => {
    const { resetGame } = useGame();

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-slate-400 mt-1">Manage your game data.</p>
            </header>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                <h2 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h2>
                <p className="text-slate-400 mb-6">
                    Resetting the game will wipe all your progress, wallets, and assets. This action cannot be undone.
                </p>
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to reset your progress?')) {
                            resetGame();
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                    <Trash2 size={18} />
                    Reset Game Progress
                </button>
            </div>
        </div>
    );
};
