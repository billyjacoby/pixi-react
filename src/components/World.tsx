import React from 'react';
import { useTick } from '@pixi/react';
import PixiViewportComponent from '../lib/components/ViewportComponent';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { Player } from './Player';
import { GRID_CELL_SIZE } from '../lib/map';
import { gridFromString } from '../lib/grid-utils';
import { useTilemap } from '../hooks/useTilemap';
import { Obstacles } from './Obstacles';
import { Interactives } from './Interactives';
import { useAppDataStore } from '@/stores/appData';

interface WorldProps {
  stageSize: { width: number; height: number };
}

export const World: React.FC<WorldProps> = ({ stageSize }) => {
  const viewportRef = React.useRef<Viewport>(null);
  const spriteRef = React.useRef<PIXI.AnimatedSprite>(null);

  const currentLevel = useAppDataStore((state) => state.currentLevel);
  console.log('🪵 | currentLevel:', currentLevel);

  const tileGrid = gridFromString(currentLevel.tileset);

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

  React.useEffect(() => {
    console.log('🪵 | currentLevel:', currentLevel);
    //? Handle reset of the player and level here
  }, [currentLevel]);

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
      <Interactives />
      <Player ref={spriteRef} worldSize={worldSize} grid={tileGrid} />
      <Obstacles />
    </PixiViewportComponent>
  );
};
