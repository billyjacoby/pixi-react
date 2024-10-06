import React, { LegacyRef } from 'react';
import * as PIXI from 'pixi.js';
import { usePlayerMovement } from '../hooks/usePlayerMovement';
import { CollidableItem, Grid, InteractiveItem, Size } from '../types';
import { Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { AnimatedSprite } from '../lib/components/AnimatedSprite';
import { PLAYER_SIZE } from '../lib/constants';

export const Character = React.forwardRef<
  PIXI.AnimatedSprite | PIXI.Sprite,
  {
    worldSize: Size;
    grid: Grid;
    obstacles: CollidableItem[];
    interactives: InteractiveItem[];
  }
>(({ worldSize, grid, obstacles, interactives }, ref) => {
  const { position, direction } = usePlayerMovement({
    worldSize,
    grid,
    obstacles,
    interactives,
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
      <AnimatedSprite
        ref={ref as LegacyRef<PIXI.AnimatedSprite>}
        direction={direction}
        spriteSheetProps={{
          assetPath: '/tilemaps/pink-monster.json',
          frames: 4,
          frameTemplate: 'tile00{{i}}.png',
        }}
        x={position.x}
        y={position.y}
        isPlaying={true}
        animationSpeed={0.1}
        width={PLAYER_SIZE.width}
        height={PLAYER_SIZE.height}
      />
    </>
  );
});
