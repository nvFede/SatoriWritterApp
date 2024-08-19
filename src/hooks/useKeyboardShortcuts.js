import { useEffect } from 'react';

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, metaKey } = event;
      
      for (const [shortcut, action] of Object.entries(shortcuts)) {
        const [modifierKey, shortcutKey] = shortcut.split('+');
        
        if (
          ((modifierKey === 'Ctrl' && ctrlKey) || (modifierKey === 'Cmd' && metaKey)) &&
          key.toLowerCase() === shortcutKey.toLowerCase()
        ) {
          event.preventDefault();
          action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
