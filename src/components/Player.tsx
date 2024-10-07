import React, { LegacyRef } from 'react';
import * as PIXI from 'pixi.js';
import { usePlayerMovement } from '../hooks/usePlayerMovement';
import { Grid, Size } from '../types';
import { Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { AnimatedSprite } from '../lib/components/AnimatedSprite';
import { DEBUG, PLAYER_SIZE } from '../lib/constants';
import { useAppDataStore } from '../stores/appData';

export const Player = React.forwardRef<
  PIXI.AnimatedSprite | PIXI.Sprite,
  {
    worldSize: Size;
    grid: Grid;
  }
>(({ worldSize, grid }, ref) => {
  const obstacles = useAppDataStore((state) => state.obstacles);
  const interactives = useAppDataStore((state) => state.interactiveItems);

  const { position, direction } = usePlayerMovement({
    worldSize,
    grid,
    obstacles,
    interactives,
  });

  // const interactiveItem = useAppDataStore((state) => state.interactiveItem);

  return (
    <>
      {DEBUG && (
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
          {/* {interactiveItem && (
            <Text
              text={JSON.stringify(interactiveItem.action, null, 2)}
              x={position.x - PLAYER_SIZE.width - 40}
              y={position.y + 70}
              style={
                new TextStyle({
                  align: 'center',
                  fontSize: 48,
                })
              }
            />
          )} */}
        </>
      )}
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
        zIndex={10}
      />
    </>
  );
});
