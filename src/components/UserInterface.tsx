import React from 'react';
import { useAppDataStore } from '@/stores/appData';
import { Button } from './ui/button';
import clsx from 'clsx';

export function UserInterface() {
  const interactiveItem = useAppDataStore((state) => state.interactiveItem);
  const [label, setLabel] = React.useState<string>();

  const hotKey = interactiveItem?.action.hotKey;
  const isAvailable = interactiveItem && !interactiveItem.action.isDisabled?.();

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === hotKey) {
      interactiveItem?.action.action();
    }
  }

  React.useEffect(() => {
    if (interactiveItem) {
      let _label = interactiveItem.action.label;
      const hotKey = interactiveItem.action.hotKey;

      if (hotKey) {
        _label += ` [${hotKey.toUpperCase()}]`;
      }

      setLabel(_label);
    }
  }, [interactiveItem]);

  React.useEffect(() => {
    if (hotKey) {
      document.addEventListener('keydown', handleKeyPress);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [hotKey]);

  return (
    <div
      className={clsx(
        'flex px-6 py-4 bg-background/90 rounded-lg transition-opacity duration-300 ',
        !!isAvailable ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Button
        onClick={() => {
          if (isAvailable) {
            interactiveItem.action.action();
          }
        }}
      >
        {label}
      </Button>
    </div>
  );
}
