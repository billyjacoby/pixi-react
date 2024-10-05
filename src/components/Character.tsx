import React, { LegacyRef } from 'react';
import * as PIXI from 'pixi.js';
import { usePlayerMovement } from '../hooks/usePlayerMovement';
import { Coords, Grid, Size } from '../types';
import { PinkMonster } from './PinkMonster';
import { Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

export const Character = React.forwardRef<
  PIXI.AnimatedSprite | PIXI.Sprite,
  {
    worldSize: Size;
    grid: Grid;
    collidableItems: (Coords & Size)[];
  }
>(({ worldSize, grid, collidableItems }, ref) => {
  const { position, direction } = usePlayerMovement({
    worldSize,
    grid,
    collidableItems,
  });

  return (
    <>
      <Text
        text={JSON.stringify(position)}
        x={position.x - 100}
        y={position.y - 200}
        style={
          new TextStyle({
            align: 'center',
            fontSize: 48,
          })
        }
      />
      <PinkMonster
        ref={ref as LegacyRef<PIXI.AnimatedSprite>}
        position={position}
        direction={direction}
      />
    </>
  );

  // return (
  //   <Sprite
  //     width={PLAYER_SIZE.width}
  //     height={PLAYER_SIZE.height}
  //     ref={ref as LegacyRef<PIXI.Sprite>}
  //     image={BUNNY_URL}
  //     x={position.x}
  //     y={position.y}
  //     anchor={0.5}
  //   />
  // );
});
