import React from 'react';
import { Sprite } from '@pixi/react';

import {
  cellToAssetNameMap,
  cellToAssetNameMapKey,
  GRID_CELL_SIZE,
  levels,
  obstacleCells,
  ObstacleCellValue,
} from '../lib/map';
import * as PIXI from 'pixi.js';
import { CollidableItem } from '../types';
import { gridFromString } from '@/lib/grid-utils';
import { useAppDataStore } from '@/stores/appData';

const PERSPECTIVE_HEIGHT_RATIO = 0.3;

export function Obstacles({
  obstacles,
  setObstacles,
}: {
  obstacles: CollidableItem[];
  setObstacles: React.Dispatch<React.SetStateAction<CollidableItem[]>>;
}) {
  const [children, setChildren] = React.useState<any[]>([]);

  const currentLevelIndex = useAppDataStore((state) => state.currentLevelIndex);

  const grid = gridFromString(levels[currentLevelIndex].obstacles);

  async function loadObstacles() {
    await PIXI.Assets.load('/tilemaps/assets.json');
    let newChildren: any[] = [];
    const newObstacles: CollidableItem[] = [];
    grid.forEach((row, y) =>
      row.map((cell, x) => {
        if (!obstacleCells.includes(cell as ObstacleCellValue)) return null;
        let asset = cellToAssetNameMap[cell as cellToAssetNameMapKey];
        let assetName: string;
        if (Array.isArray(asset)) {
          assetName = asset[Math.floor(Math.random() * asset.length)];
        } else {
          assetName = asset as string;
        }
        const itemTexture = PIXI.Texture.from(assetName as string);
        const ref = React.createRef<PIXI.Sprite>();
        newChildren.push(
          <Sprite
            anchor={[0, 0.7]}
            ref={ref}
            key={`obstacle-${x}-${y}`}
            texture={itemTexture}
            x={x * GRID_CELL_SIZE}
            y={y * GRID_CELL_SIZE}
            name={`obstacle-${x}-${y}`}
          />
        );

        newObstacles.push({
          x: x * GRID_CELL_SIZE,
          y: y * GRID_CELL_SIZE,
          width: itemTexture.width,
          height: itemTexture.height * PERSPECTIVE_HEIGHT_RATIO,
          ref,
          assetName,
        });
        return children;
      })
    );
    setObstacles(newObstacles);
    setChildren(newChildren);

    //? Cleanup old Sprites
    if (obstacles && obstacles.length > 0) {
      setTimeout(() => {
        for (const item of obstacles) {
          item.ref.current?.destroy();
        }
      });
    }
  }

  React.useEffect(() => {
    loadObstacles();
  }, [currentLevelIndex]);

  if (children.length === 0) {
    return null;
  }

  return children;
}
