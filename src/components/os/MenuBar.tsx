import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search } from 'lucide-react';

export const MenuBar: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).replace(' ', ' ');
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="h-8 bg-white/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm font-medium select-none z-50 relative shadow-sm">
            <div className="flex items-center gap-4">
                <Apple size={18} className="fill-current" />
                <span className="font-bold">Finder</span>
                <span className="hidden sm:inline opacity-90">File</span>
                <span className="hidden sm:inline opacity-90">Edit</span>
                <span className="hidden sm:inline opacity-90">View</span>
                <span className="hidden sm:inline opacity-90">Go</span>
                <span className="hidden sm:inline opacity-90">Window</span>
                <span className="hidden sm:inline opacity-90">Help</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1 opacity-80">
                    <Battery size={20} />
                    <span className="text-xs">100%</span>
                </div>
                <Wifi size={18} className="opacity-80" />
                <Search size={16} className="opacity-80" />
                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline">{formatDate(time)}</span>
                    <span>{formatTime(time)}</span>
                </div>
            </div>
        </div>
    );
};
