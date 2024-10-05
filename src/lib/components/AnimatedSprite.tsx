import React from 'react';
import { AnimatedSprite as _AnimatedSprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import {
  MakeAnimatedSpriteTexturesParams,
  makeAnimatedSpriteTextures,
} from '../pixi-helpers';

type _AnimatedSpriteProps = Partial<Omit<PIXI.AnimatedSprite, 'anchor'>> & {
  isPlaying: boolean;
  initialFrame?: number;
  animationSpeed?: number;
  anchor?: number;
};

export type AnimatedSpriteProps = _AnimatedSpriteProps & {
  direction?: 'left' | 'right';
  spriteSheetProps: MakeAnimatedSpriteTexturesParams;
};

export const AnimatedSprite = React.forwardRef<
  PIXI.AnimatedSprite,
  AnimatedSpriteProps
>(({ direction = 'right', spriteSheetProps, anchor = 0.5, ...rest }, ref) => {
  const [textures, setTextures] = React.useState<PIXI.Texture[]>([]);

  React.useEffect(() => {
    (async () => {
      const newTextures = await makeAnimatedSpriteTextures(spriteSheetProps);
      setTextures(newTextures);
    })();
  }, []);

  if (textures.length === 0) {
    return null; // or a loading indicator
  }

  return (
    <_AnimatedSprite
      ref={ref}
      scale={{ x: direction === 'left' ? -1 : 1, y: 1 }}
      {...rest}
      textures={textures}
      anchor={anchor}
    />
  );
});
