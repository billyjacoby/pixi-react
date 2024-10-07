import { useAppDataStore } from '@/stores/appData';
import { MapItems } from '../lib/components/MapItems';
import { obstacleCells } from '@/lib/map';

export function Obstacles({}: {}) {
  const obstacles = useAppDataStore((state) => state.obstacles);
  const setObstacles = useAppDataStore((state) => state.setObstacles);

  return (
    <MapItems
      items={obstacles}
      setItems={setObstacles}
      includeCells={obstacleCells}
    />
  );
}
