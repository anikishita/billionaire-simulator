import { useEffect } from 'react';

/**
 * Custom hook to handle app exit behavior
 * - Listens for ESC key press
 * - Provides exit handler function
 * 
 * @param onExit - Callback function to execute when exiting the app
 * @param isActive - Whether the app is currently active (optional, defaults to true)
 */
export const useExitApp = (onExit: () => void, isActive: boolean = true) => {
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if ESC key is pressed
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                onExit();
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onExit, isActive]);

    return { exit: onExit };
};
