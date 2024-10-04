import React from 'react';
import { AnimatedSprite, Container } from '@pixi/react';
import { Assets, Texture } from 'pixi.js';

async function makeAnimatedSpriteTextures() {
  await Assets.load('https://pixijs.com/assets/spritesheet/mc.json');
  // create an array to store the textures
  const explosionTextures = [];
  let i;

  for (i = 0; i < 26; i++) {
    const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);

    explosionTextures.push(texture);
  }

  return explosionTextures;
}

export const Explosion = () => {
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
    <Container position={[150, 150]}>
      <AnimatedSprite
        textures={textures}
        anchor={0.5}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.5}
        width={100}
        height={100}
      />
    </Container>
  );
};
