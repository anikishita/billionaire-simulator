import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface AppWindowProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const AppWindow: React.FC<AppWindowProps> = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
            <div className={clsx("w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col", className)}>
                {/* Window Header */}
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
                    <h2 className="font-bold text-slate-700">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Window Content */}
                <div className="flex-1 overflow-auto bg-slate-50">
                    {children}
                </div>
            </div>
        </div>
    );
};
