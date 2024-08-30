import React from 'react';
import { useTick } from '@pixi/react';
import PixiViewportComponent from './ViewportComponent';
import { Viewport } from 'pixi-viewport';
import * as PIXI from 'pixi.js';
import { Character } from './Character';
import { Explosion } from './Explosion';
import { BACKGROUND_TEXTURE } from '../constants';

interface WorldProps {
  stageSize: { width: number; height: number };
}

export const World: React.FC<WorldProps> = ({ stageSize }) => {
  const viewportRef = React.useRef<Viewport>(null);
  const spriteRef = React.useRef<PIXI.Sprite>(null);

  const [worldSize] = React.useState({
    width: stageSize.width * 5,
    height: stageSize.height * 5,
  });

  //? This handles keeping the viewport centered on the sprite
  useTick(() => {
    if (!spriteRef.current) return;
    const sprite = spriteRef.current;
    // Center the viewport on the sprite
    if (viewportRef.current) {
      viewportRef.current.moveCenter(sprite.x, sprite.y);
    }
  });

  return (
    <PixiViewportComponent
      ref={viewportRef}
      stageSize={stageSize}
      worldSize={worldSize}
      backgroundTexture={BACKGROUND_TEXTURE}
    >
      <Explosion />
      <Character ref={spriteRef} worldSize={worldSize} stageSize={stageSize} />
    </PixiViewportComponent>
  );
};
