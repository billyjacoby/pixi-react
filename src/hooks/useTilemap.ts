import React from 'react';
import { Assets } from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import { Grid } from '../types';

export const useTilemap = (grid: Grid) => {
  const [tileMap, setTileMap] = React.useState<CompositeTilemap | null>(null);
  async function loadTilemap() {
    console.log('LOADING');
    Assets.load('/tilemaps/tiles.json').then(() => {
      const tilemap = new CompositeTilemap();

      for (const [rIndex, row] of grid.entries()) {
        for (const [cIndex, cell] of row.entries()) {
          console.log('🪵 | Assets.load | cell:', cell);
          if (cIndex > 0 && rIndex > 0) {
            tilemap.tile('land_1.png', (cIndex - 1) * 128, (rIndex - 1) * 128);
          }
        }
      }
      setTileMap(tilemap);
    });
  }

  React.useEffect(() => {
    loadTilemap();
  }, []);

  return tileMap;
};
