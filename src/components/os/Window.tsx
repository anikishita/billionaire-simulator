import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { clsx } from 'clsx';

interface WindowProps {
    id: string;
    title: string;
    isActive: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    onMove: (x: number, y: number) => void;
    onResize: (width: number, height: number) => void;
    children: React.ReactNode;
    className?: string;
}

export const Window: React.FC<WindowProps> = ({
    title,
    isActive,
    isMinimized,
    isMaximized,
    position,
    size,
    zIndex,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onMove,
    onResize,
    children,
    className,
}) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    if (isMinimized) return null;

    return (
        <motion.div
            ref={windowRef}
            drag={!isMaximized}
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            onDragEnd={(_, info) => {
                if (!isMaximized) {
                    onMove(position.x + info.offset.x, position.y + info.offset.y);
                }
            }}
            initial={{ scale: 0.9, opacity: 0, x: position.x, y: position.y }}
            animate={{
                scale: 1,
                opacity: 1,
                x: isMaximized ? 0 : position.x,
                y: isMaximized ? 0 : position.y,
                width: isMaximized ? '100vw' : size.width,
                height: isMaximized ? '100vh' : size.height,
                zIndex
            }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={clsx(
                "fixed rounded-xl shadow-2xl overflow-hidden flex flex-col border border-white/20",
                className || "bg-white",
                isActive ? "ring-1 ring-white/20" : "opacity-90"
            )}
            onClick={onFocus}
            style={{ position: 'absolute' }} // Ensure absolute positioning for drag
        >
            {/* Title Bar */}
            <div
                onPointerDown={(e) => {
                    dragControls.start(e);
                    onFocus();
                }}
                className="h-10 bg-[#eef1f5] border-b border-[#d1d5db] flex items-center justify-between px-4 shrink-0 cursor-default select-none"
            >
                <div className="flex items-center gap-2 group">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center text-black/50 hover:text-black/80"
                    >
                        <X size={8} className="opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                        className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] flex items-center justify-center text-black/50 hover:text-black/80"
                    >
                        <Minus size={8} className="opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                        className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center text-black/50 hover:text-black/80"
                    >
                        <Maximize2 size={8} className="opacity-0 group-hover:opacity-100" />
                    </button>
                </div>
                <span className="text-sm font-bold text-slate-600 opacity-80">{title}</span>
                <div className="w-14" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto relative">
                {children}

                {/* Click blocker overlay when dragging/inactive */}
                {!isActive && <div className="absolute inset-0 bg-transparent" />}
            </div>

            {/* Resize Handle */}
            {!isMaximized && (
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const startWidth = size.width;
                        const startHeight = size.height;

                        const handleMouseMove = (moveEvent: MouseEvent) => {
                            const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
                            const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
                            onResize(newWidth, newHeight);
                        };

                        const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                        };

                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                    }}
                />
            )}
        </motion.div>
    );
};
