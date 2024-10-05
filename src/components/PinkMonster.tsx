import React from 'react';
import { AnimatedSprite } from '@pixi/react';
import { Assets, Texture, AnimatedSprite as _AnimatedSprite } from 'pixi.js';
import { Coords } from '../types';
import { PLAYER_SIZE } from '../lib/constants';

async function makeAnimatedSpriteTextures() {
  await Assets.load('/tilemaps/pink-monster.json');
  // create an array to store the textures
  const textures = [];
  let i;

  for (i = 0; i < 4; i++) {
    const texture = Texture.from(`tile00${i}.png`);
    textures.push(texture);
  }

  return textures;
}

export const PinkMonster = React.forwardRef<
  _AnimatedSprite,
  {
    position: Coords;
    direction?: 'left' | 'right';
  }
>(({ position, direction = 'right' }, ref) => {
  const [textures, setTextures] = React.useState<Texture[]>([]);

  React.useEffect(() => {
    (async () => {
      const newTextures = await makeAnimatedSpriteTextures();
      setTextures(newTextures);
    })();
  }, []);

  if (textures.length === 0) {
    return null; // or a loading indicator
  }

  return (
    <AnimatedSprite
      ref={ref}
      scale={{ x: direction === 'left' ? -1 : 1, y: 1 }}
      textures={textures}
      anchor={0.5}
      isPlaying={true}
      initialFrame={0}
      animationSpeed={0.1}
      width={PLAYER_SIZE.width}
      height={PLAYER_SIZE.height}
      x={position.x}
      y={position.y}
    />
  );
});
