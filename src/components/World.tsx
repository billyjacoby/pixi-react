import React from 'react';
import { useTick } from '@pixi/react';
import PixiViewportComponent from '../ViewportComponent';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { Character } from './Character';
import { Explosion } from './Explosion';
import { levels } from '../lib/map';
import { gridFromString } from '../lib/grid-utils';
import { Obstacles } from './Obstacles';
import { useTilemap } from '../hooks/useTilemap';

interface WorldProps {
  stageSize: { width: number; height: number };
}

export const World: React.FC<WorldProps> = ({ stageSize }) => {
  const viewportRef = React.useRef<Viewport>(null);
  const spriteRef = React.useRef<PIXI.Sprite>(null);

  const [currentLevelIndex] = React.useState(0);
  const currentLevel = levels[currentLevelIndex];

  const grid = gridFromString(currentLevel.grid);

  const tileMap = useTilemap(grid);

  const worldSize = React.useMemo(() => {
    const height = grid.length * 128;
    const width = grid[0].length * 128;
    return { width, height };
  }, [grid]);

  //? This handles keeping the viewport centered on the sprite
  useTick(() => {
    if (!spriteRef.current) return;
    const sprite = spriteRef.current;
    // Center the viewport on the sprite
    if (viewportRef.current) {
      viewportRef.current.moveCenter(sprite.x, sprite.y);
    }
  });

  if (!tileMap) {
    console.log('loading...');
    return null;
  }

  return (
    <PixiViewportComponent
      ref={viewportRef}
      stageSize={stageSize}
      worldSize={worldSize}
      tileMap={tileMap}
    >
      <Character ref={spriteRef} worldSize={worldSize} grid={grid} />
      <Obstacles grid={grid} />
      <Explosion />
    </PixiViewportComponent>
  );
};
