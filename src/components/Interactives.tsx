import React from 'react';
import { Sprite } from '@pixi/react';
import { Grid, InteractiveItem } from '../types';
import {
  cellToAssetNameMap,
  cellToAssetNameMapKey,
  GRID_CELL_SIZE,
  interactiveActions,
  interactiveCells,
  InteractiveCellValue,
} from '../lib/map';
import * as PIXI from 'pixi.js';

const PERSPECTIVE_HEIGHT_RATIO = 0.3;

export function Interactives({
  grid,
  setInterActiveItems,
}: {
  grid: Grid;
  setInterActiveItems: React.Dispatch<React.SetStateAction<InteractiveItem[]>>;
}) {
  const [children, setChildren] = React.useState<any[]>([]);
  async function loadInteractives() {
    await PIXI.Assets.load('/tilemaps/assets.json');
    let newChildren: any[] = [];
    const interactiveItems: InteractiveItem[] = [];
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

        interactiveItems.push({
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
    setInterActiveItems(interactiveItems);
    setChildren(newChildren);
  }

  React.useEffect(() => {
    loadInteractives();
  }, []);

  if (children.length === 0) {
    return null;
  }

  return children;
}
