import React from 'react';
import { Sprite } from '@pixi/react';
import { Grid } from '../types';
import {
  cellToAssetNameMap,
  cellToAssetNameMapKey,
  GRID_CELL_SIZE,
  obstacleCells,
  ObstacleCellValue,
} from '../lib/map';
import * as PIXI from 'pixi.js';
import { CollidableItem } from '../types';

const PERSPECTIVE_HEIGHT_RATIO = 0.3;

export function Obstacles({
  grid,
  setObstacles,
}: {
  grid: Grid;
  setObstacles: React.Dispatch<React.SetStateAction<CollidableItem[]>>;
}) {
  const [children, setChildren] = React.useState<any[]>([]);
  async function loadObstacles() {
    await PIXI.Assets.load('/tilemaps/assets.json');
    let newChildren: any[] = [];
    const obstacles: CollidableItem[] = [];
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

        obstacles.push({
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
    setObstacles(obstacles);
    setChildren(newChildren);
  }

  React.useEffect(() => {
    loadObstacles();
  }, []);

  if (children.length === 0) {
    return null;
  }

  return children;
}
