import React from 'react';
import { useTick } from '@pixi/react';
import PixiViewportComponent from '../lib/components/ViewportComponent';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { Character } from './Character';
import { Explosion } from './Explosion';
import { GRID_CELL_SIZE, levels } from '../lib/map';
import { gridFromString } from '../lib/grid-utils';
import { useTilemap } from '../hooks/useTilemap';
import { CollidableItem, InteractiveItem } from '../types';
import { Obstacles } from './Obstacles';
import { Interactives } from './Interactives';

interface WorldProps {
  stageSize: { width: number; height: number };
}

export const World: React.FC<WorldProps> = ({ stageSize }) => {
  const viewportRef = React.useRef<Viewport>(null);
  const spriteRef = React.useRef<PIXI.AnimatedSprite>(null);

  const [obstacles, setObstacles] = React.useState<CollidableItem[]>([]);
  const [interactiveItems, setInterActiveItems] = React.useState<
    InteractiveItem[]
  >([]);

  const [currentLevelIndex] = React.useState(0);
  const currentLevel = levels[currentLevelIndex];

  const tileGrid = gridFromString(currentLevel.tileset);
  const obstacleGrid = gridFromString(currentLevel.obstacles);

  const tileMap = useTilemap(tileGrid);

  const worldSize = React.useMemo(() => {
    const height = tileGrid.length * GRID_CELL_SIZE;
    const width = tileGrid[0].length * GRID_CELL_SIZE;
    return { width, height };
  }, [tileGrid]);

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
      <Interactives
        grid={obstacleGrid}
        setInterActiveItems={setInterActiveItems}
      />
      <Character
        ref={spriteRef}
        worldSize={worldSize}
        grid={tileGrid}
        obstacles={obstacles}
        interactives={interactiveItems}
      />
      <Explosion />
      <Obstacles grid={obstacleGrid} setObstacles={setObstacles} />
    </PixiViewportComponent>
  );
};
