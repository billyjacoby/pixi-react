import React from 'react';
import { Assets } from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import { Grid } from '../types';
import { cellToTileMap, GRID_CELL_SIZE, cellToTileMapKey } from '../lib/map';
import { TILEMAP_PATH } from '@/constants';

export const useTilemap = (grid: Grid) => {
  const [tileMap, setTileMap] = React.useState<CompositeTilemap | null>(null);

  async function loadTilemap() {
    await Assets.load(TILEMAP_PATH);

    const tilemap = new CompositeTilemap();

    for (const [rIndex, row] of grid.entries()) {
      for (const [cIndex, cell] of row.entries()) {
        const assetName: string =
          cellToTileMap[cell.toString() as cellToTileMapKey];
        tilemap.tile(
          assetName,
          cIndex * GRID_CELL_SIZE,
          rIndex * GRID_CELL_SIZE,
          {
            tileHeight: GRID_CELL_SIZE,
            tileWidth: GRID_CELL_SIZE,
          }
        );
      }
    }
    setTileMap(tilemap);
  }

  React.useEffect(() => {
    loadTilemap();
  }, []);

  return tileMap;
};
