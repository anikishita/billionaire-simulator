import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface DockItem {
    id: string;
    label: string;
    icon: LucideIcon;
    color: string;
}

interface DockProps {
    items: DockItem[];
    openApp: (id: string) => void;
}

export const Dock: React.FC<DockProps> = ({ items, openApp }) => {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-end gap-2 shadow-2xl">
                {items.map((item) => (
                    <DockIcon key={item.id} item={item} onClick={() => openApp(item.id)} />
                ))}
            </div>
        </div>
    );
};

const DockIcon: React.FC<{ item: DockItem; onClick: () => void }> = ({ item, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="relative group flex flex-col items-center"
        >
            <div className={clsx(
                "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-200",
                item.color
            )}>
                <item.icon size={24} />
            </div>
            <span className="absolute -top-10 bg-black/50 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm whitespace-nowrap">
                {item.label}
            </span>
            {/* Active Dot Indicator (Mock) */}
            <div className="w-1 h-1 bg-white/50 rounded-full mt-1 opacity-0 group-hover:opacity-100" />
        </motion.button>
    );
};
