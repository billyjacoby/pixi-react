import React from 'react';
import { Assets, Texture } from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import { Coords, Grid, Size } from '../types';
import { GRID_CELL_SIZE } from '../lib/map';

export const useTilemap = (
  grid: Grid,
  setCollidableItems: React.Dispatch<React.SetStateAction<(Coords & Size)[]>>
) => {
  const [tileMap, setTileMap] = React.useState<CompositeTilemap | null>(null);

  async function loadTilemap() {
    await Assets.load('/tilemaps/tiles.json');
    await Assets.load('/tilemaps/decor.json');

    const collidableItems: (Coords & Size)[] = [];
    const tilemap = new CompositeTilemap();

    for (const [rIndex, row] of grid.entries()) {
      for (const [cIndex, cell] of row.entries()) {
        tilemap.tile(
          'land_1.png',
          cIndex * GRID_CELL_SIZE,
          rIndex * GRID_CELL_SIZE,
          {
            tileHeight: GRID_CELL_SIZE,
            tileWidth: GRID_CELL_SIZE,
          }
        );

        if (cell === '1') {
          const stoneTexture = Texture.from('stones_4.png');
          tilemap.tile(
            'stones_4.png',
            cIndex * GRID_CELL_SIZE,
            rIndex * GRID_CELL_SIZE
          );
          collidableItems.push({
            x: cIndex * GRID_CELL_SIZE,
            y: rIndex * GRID_CELL_SIZE,
            width: stoneTexture.width,
            height: stoneTexture.height,
          });
        }
      }
    }

    setCollidableItems(collidableItems);
    setTileMap(tilemap);
  }

  React.useEffect(() => {
    loadTilemap();
  }, []);

  return tileMap;
};
