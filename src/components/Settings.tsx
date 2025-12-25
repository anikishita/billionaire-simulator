import React from 'react';
import { useGame } from '../hooks/useGame';
import { Trash2 } from 'lucide-react';

export const Settings: React.FC = () => {
    const { resetGame } = useGame();

    return (
        <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 overflow-auto h-full">
            <header>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your game data.</p>
            </header>

            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-400">Danger Zone</h2>
                <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">
                    Resetting the game will wipe all your progress, wallets, and assets. This action cannot be undone.
                </p>
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to reset your progress?')) {
                            resetGame();
                        }
                    }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm sm:text-base"
                >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Reset Game Progress
                </button>
            </div>
        </div>
    );
};
