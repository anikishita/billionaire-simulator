import React from 'react';
import { ExitButton } from './ExitButton';

interface AppContainerProps {
    /**
     * Callback function to execute when app should be closed
     */
    onClose: () => void;
    /**
     * The app content to render
     */
    children: React.ReactNode;
    /**
     * Optional: show "Exit" label on button (defaults to icon only)
     */
    showExitLabel?: boolean;
}

/**
 * AppContainer - Wrapper component that adds universal exit functionality to any app
 * 
 * Features:
 * - Adds Exit button at top-right corner of app content
 * - Provides consistent close behavior across all apps
 * - Does NOT add ESC key handler (Window component already handles this)
 * 
 * Usage:
 * ```tsx
 * <AppContainer onClose={handleClose}>
 *   <YourAppContent />
 * </AppContainer>
 * ```
 */
export const AppContainer: React.FC<AppContainerProps> = ({
    onClose,
    children,
    showExitLabel = false,
}) => {
    return (
        <div className="app-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Exit button - always on top */}
            <ExitButton onExit={onClose} showLabel={showExitLabel} />
            
            {/* App content */}
            {children}
        </div>
    );
};
