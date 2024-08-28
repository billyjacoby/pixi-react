import React from 'react';
import { Sprite, useApp, useTick } from '@pixi/react';
import {
  BUNNY_URL,
  DISTANCE_PER_MOVE,
  DISTANCE_PER_TICK,
  UP_KEYS,
  DOWN_KEYS,
  LEFT_KEYS,
  RIGHT_KEYS,
} from '../constants';

function getWithinBounds(value: number, min: number, max: number) {
  if (value >= max) {
    return max;
  }

  if (value <= min) {
    return min;
  }

  return value;
}

export const Tutorial = () => {
  const app = useApp();

  const defaultBunnyX = app.screen.width / 2;
  const defaultBunnyY = app.screen.height / 2;

  const [minX, maxX] = [0, app.screen.width];
  const [minY, maxY] = [0, app.screen.height];

  const [bunnyX, setBunnyX] = React.useState(defaultBunnyX);
  const [newBunnyX, setNewBunnyX] = React.useState(defaultBunnyX);

  const [bunnyY, setBunnyY] = React.useState(defaultBunnyY);
  const [newBunnyY, setNewBunnyY] = React.useState(defaultBunnyY);

  const [bunnyRotation, setBunnyRotation] = React.useState(0);

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      const key = e.key;

      if (LEFT_KEYS.includes(key)) {
        setNewBunnyX((x) => getWithinBounds(x - DISTANCE_PER_MOVE, minX, maxX));
      }
      if (RIGHT_KEYS.includes(key)) {
        setNewBunnyX((x) => getWithinBounds(x + DISTANCE_PER_MOVE, minX, maxX));
      }
      if (UP_KEYS.includes(key)) {
        setNewBunnyY((y) => getWithinBounds(y - DISTANCE_PER_MOVE, minY, maxY));
      }
      if (DOWN_KEYS.includes(key)) {
        setNewBunnyY((y) => getWithinBounds(y + DISTANCE_PER_MOVE, minY, maxY));
      }
    });
  }, [app]);

  //? x transition manager
  useTick((delta) => {
    if (newBunnyX === bunnyX) {
      return;
    }
    const xDiff = newBunnyX - bunnyX;
    if (xDiff > 0) {
      setBunnyX((x) => x + DISTANCE_PER_TICK);
    } else {
      setBunnyX((x) => x - DISTANCE_PER_TICK);
    }
  });

  //? y transition manager
  useTick((delta) => {
    if (newBunnyY === bunnyY) {
      return;
    }
    const yDiff = newBunnyY - bunnyY;
    if (yDiff > 0) {
      setBunnyY((y) => y + DISTANCE_PER_TICK);
    } else {
      setBunnyY((y) => y - DISTANCE_PER_TICK);
    }
  });

  return (
    <Sprite
      image={BUNNY_URL}
      x={bunnyX}
      y={bunnyY}
      anchor={0.5}
      rotation={bunnyRotation}
    />
  );
};
