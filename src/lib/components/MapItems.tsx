import React from 'react';
import { Sprite } from '@pixi/react';

import {
  cellToAssetNameMap,
  cellToAssetNameMapKey,
  GRID_CELL_SIZE,
  interactiveActions,
  interactiveCells,
  levels,
} from '../map';
import * as PIXI from 'pixi.js';
import { CollidableItem, Grid } from '../../types';
import { PERSPECTIVE_HEIGHT_RATIO } from '@/lib/constants';
import { gridFromString } from '@/lib/grid-utils';
import { useAppDataStore } from '@/stores/appData';

export function MapItems<T extends CollidableItem>({
  items,
  setItems,
  includeCells,
  includeAction,
}: {
  items: T[];
  setItems: (items: T[]) => void;
  includeCells: ReadonlyArray<string>;
  includeAction?: boolean;
}) {
  const [children, setChildren] = React.useState<any[]>([]);
  const currentLevelIndex = useAppDataStore((state) => state.currentLevelIndex);

  let grid: Grid;
  grid = gridFromString(levels[currentLevelIndex].obstacles);

  async function loadItems() {
    await PIXI.Assets.load('/tilemaps/assets.json');
    let newChildren: any[] = [];
    const newItems: any[] = [];

    grid.forEach((row, y) =>
      row.map((cell, x) => {
        if (!includeCells.includes(cell)) return null;
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
            key={`item-${x}-${y}`}
            texture={itemTexture}
            x={x * GRID_CELL_SIZE}
            y={y * GRID_CELL_SIZE}
            name={`item-${x}-${y}`}
          />
        );

        newItems.push({
          x: x * GRID_CELL_SIZE,
          y: y * GRID_CELL_SIZE,
          width: itemTexture.width,
          height: itemTexture.height * PERSPECTIVE_HEIGHT_RATIO,
          ref,
          assetName,
          action: includeAction
            ? interactiveActions[cell as (typeof interactiveCells)[number]]
            : undefined,
        });
        return children;
      })
    );
    setItems(newItems);
    setChildren(newChildren);

    //? Cleanup old Sprites
    if (items && items.length > 0) {
      setTimeout(() => {
        for (const item of items) {
          item.ref.current?.destroy();
        }
      });
    }
  }

  React.useEffect(() => {
    loadItems();
  }, [currentLevelIndex]);

  if (children.length === 0) {
    return null;
  }

  return children;
}
