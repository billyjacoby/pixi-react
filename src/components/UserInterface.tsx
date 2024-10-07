import React from 'react';
import { useAppDataStore } from '@/stores/appData';
import { Button } from './ui/button';
import clsx from 'clsx';

export function UserInterface() {
  const interactiveItem = useAppDataStore((state) => state.interactiveItem);
  const [label, setLabel] = React.useState<string>();

  React.useEffect(() => {
    if (interactiveItem) {
      setLabel(interactiveItem.action.label);
    }
  }, [interactiveItem]);

  return (
    <div
      className={clsx(
        'flex px-6 py-4 bg-background/90 rounded-lg transition-opacity duration-300 ',
        !!interactiveItem ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Button
        onClick={() => {
          if (interactiveItem) {
            interactiveItem.action.action();
          }
        }}
      >
        {label}
      </Button>
    </div>
  );
}
