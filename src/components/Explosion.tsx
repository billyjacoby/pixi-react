import { AnimatedSprite } from '../lib/components/AnimatedSprite';
import { Container } from '@pixi/react';

export const Explosion = () => {
  return (
    <Container position={[150, 150]}>
      <AnimatedSprite
        spriteSheetProps={{
          assetPath: 'https://pixijs.com/assets/spritesheet/mc.json',
          frames: 26,
          frameTemplate: 'Explosion_Sequence_A {{i}}.png',
        }}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.5}
        anchor={0.5}
      />
    </Container>
  );
};
