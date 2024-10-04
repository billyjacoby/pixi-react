import { Sprite, useTick } from '@pixi/react';
import React from 'react';

let i = 0;

export const AnimatedBunny = () => {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [rotation, setRotation] = React.useState(0);

  useTick((delta) => {
    i += 0.05 * delta;
    const newX = Math.abs(Math.cos(i) * 300);
    const newY = Math.abs(Math.cos(i / 1.5) * 300);

    setX(newX);
    setY(newY);
    setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
  });

  return <Sprite image={bunnyUrl} x={x} y={y} rotation={rotation} />;
};
