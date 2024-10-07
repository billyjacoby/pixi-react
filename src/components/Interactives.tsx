import { useAppDataStore } from '@/stores/appData';
import { MapItems } from '../lib/components/MapItems';
import { interactiveCells } from '@/lib/map';

export function Interactives({}: {}) {
  const interactives = useAppDataStore((state) => state.interactiveItems);
  const setInteractiveItems = useAppDataStore(
    (state) => state.setInteractiveItems
  );

  return (
    <MapItems
      items={interactives}
      setItems={setInteractiveItems}
      includeCells={interactiveCells}
      includeAction={true}
    />
  );
}
