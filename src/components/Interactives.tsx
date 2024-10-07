import React from 'react';
import { Sprite } from '@pixi/react';
import { InteractiveItem } from '../types';
import {
  cellToAssetNameMap,
  cellToAssetNameMapKey,
  GRID_CELL_SIZE,
  interactiveActions,
  interactiveCells,
  InteractiveCellValue,
  levels,
} from '../lib/map';
import * as PIXI from 'pixi.js';
import { gridFromString } from '@/lib/grid-utils';
import { useAppDataStore } from '@/stores/appData';

const PERSPECTIVE_HEIGHT_RATIO = 0.3;

export function Interactives({
  interactiveItems,
  setInterActiveItems,
}: {
  interactiveItems: InteractiveItem[];
  setInterActiveItems: React.Dispatch<React.SetStateAction<InteractiveItem[]>>;
}) {
  const [children, setChildren] = React.useState<any[]>([]);

  const currentLevelIndex = useAppDataStore((state) => state.currentLevelIndex);

  const grid = gridFromString(levels[currentLevelIndex].obstacles);

  async function loadInteractives() {
    await PIXI.Assets.load('/tilemaps/assets.json');
    let newChildren: any[] = [];
    const newInteractiveItems: InteractiveItem[] = [];
    grid.forEach((row, y) =>
      row.map((cell, x) => {
        if (!interactiveCells.includes(cell as InteractiveCellValue))
          return null;
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
            key={`interactives-${x}-${y}`}
            texture={itemTexture}
            x={x * GRID_CELL_SIZE}
            y={y * GRID_CELL_SIZE}
            name={`interactives-${x}-${y}`}
          />
        );

        newInteractiveItems.push({
          x: x * GRID_CELL_SIZE,
          y: y * GRID_CELL_SIZE,
          width: itemTexture.width,
          height: itemTexture.height * PERSPECTIVE_HEIGHT_RATIO,
          ref,
          assetName,
          action: interactiveActions[cell as (typeof interactiveCells)[number]],
        });
        return children;
      })
    );
    setInterActiveItems(newInteractiveItems);
    setChildren(newChildren);
    //? Cleanup old Sprites
    if (interactiveItems && interactiveItems.length > 0) {
      setTimeout(() => {
        for (const interactive of interactiveItems) {
          interactive.ref.current?.destroy();
        }
      });
    }
  }

  React.useEffect(() => {
    loadInteractives();
  }, [currentLevelIndex]);

  if (children.length === 0) {
    return null;
  }

  return children;
}
