import { useCallback } from 'react';

import * as PIXI from 'pixi.js';
import { Graphics } from '@pixi/react';

export const Block = ({
  x,
  y,
  width,
  height,
  color = '#000',
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}) => {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(color);
    g.drawRect(x, y, width, height);
    g.endFill();
  }, []);

  return <Graphics draw={draw} />;
};
