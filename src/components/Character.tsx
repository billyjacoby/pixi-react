import React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@pixi/react';
import { BUNNY_URL } from '../../constants';
import { PLAYER_SIZE } from '../lib/constants';
import { usePlayerMovement } from '../hooks/usePlayerMovement';
import { Grid, Size } from '../types';

export const Character = React.forwardRef<
  PIXI.Sprite,
  {
    worldSize: Size;
    grid: Grid;
  }
>(({ worldSize, grid }, ref) => {
  const position = usePlayerMovement({ worldSize, grid });

  return (
    <Sprite
      width={PLAYER_SIZE.width}
      height={PLAYER_SIZE.height}
      ref={ref}
      image={BUNNY_URL}
      x={position.x}
      y={position.y}
      anchor={0.5}
    />
  );
});
