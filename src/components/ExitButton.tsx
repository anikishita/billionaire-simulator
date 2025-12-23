import React from 'react';
import { X } from 'lucide-react';

interface ExitButtonProps {
    /**
     * Callback function executed when exit button is clicked
     */
    onExit: () => void;
    /**
     * Optional custom class name for styling
     */
    className?: string;
    /**
     * Optional label text (defaults to just icon)
     */
    showLabel?: boolean;
}

/**
 * Universal Exit/Close button component
 * - Appears at top-right corner of app container
 * - High z-index to stay on top
 * - Simple X icon with hover effects
 * - Minimal styling to avoid design conflicts
 */
export const ExitButton: React.FC<ExitButtonProps> = ({ 
    onExit, 
    className = '',
    showLabel = false 
}) => {
    return (
        <button
            onClick={onExit}
            className={`exit-button ${className}`}
            aria-label="Exit application"
            title="Exit (ESC)"
            style={{
                position: 'fixed',
                top: '12px',
                right: '12px',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <X size={16} strokeWidth={2.5} />
            {showLabel && <span>Exit</span>}
        </button>
    );
};
