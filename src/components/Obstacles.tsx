import { Sprite } from '@pixi/react';
import { Grid } from '../types';
import { BUNNY_URL } from '../../constants';
import { PLAYER_SIZE } from '../lib/constants';
import { GRID_CELL_SIZE } from '../lib/map';

export function Obstacles({ grid }: { grid: Grid }) {
  return grid
    .map((row, y) =>
      row.map((cell, x) => {
        if (cell === '1') {
          return (
            <Sprite
              key={`obstacle-${x}-${y}`}
              width={PLAYER_SIZE.width}
              height={PLAYER_SIZE.height}
              image={BUNNY_URL}
              x={x * GRID_CELL_SIZE}
              y={y * GRID_CELL_SIZE}
              anchor={0.5}
              name={`obstacle-${x}-${y}`}
            />
          );
        }
        return null;
      })
    )
    .filter(Boolean);
}
