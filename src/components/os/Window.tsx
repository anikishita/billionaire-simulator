import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { clsx } from 'clsx';

interface WindowProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const Window: React.FC<WindowProps> = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={clsx(
                "fixed inset-4 md:inset-10 top-12 bottom-24 rounded-xl shadow-2xl overflow-hidden flex flex-col border border-white/20",
                className || "bg-white"
            )}
        >
            {/* Title Bar */}
            <div className="h-10 bg-[#eef1f5] border-b border-[#d1d5db] flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2 group">
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center text-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={8} />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] flex items-center justify-center text-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Minus size={8} />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center text-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={8} />
                    </button>
                </div>
                <span className="text-sm font-bold text-slate-600 opacity-80">{title}</span>
                <div className="w-14" /> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto relative">
                {children}
            </div>
        </motion.div>
    );
};
