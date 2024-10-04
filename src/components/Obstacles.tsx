import { GRID_CELL_SIZE } from '../lib/map';
import { Grid } from '../types';
import { Block } from './Block';

export function Obstacles({ grid }: { grid: Grid }) {
  return grid.map((row, y) =>
    row.map((cell, x) => {
      if (cell === '1') {
        return (
          <Block
            key={`${x}-${y}`}
            x={x * GRID_CELL_SIZE}
            y={y * GRID_CELL_SIZE}
            width={GRID_CELL_SIZE}
            height={GRID_CELL_SIZE}
          />
        );
      }
      return null;
    })
  );
}
