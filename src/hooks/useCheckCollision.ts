import React from 'react';
import { PLAYER_SIZE } from '../lib/constants';
import { Coords, Size } from '../types';

export const useCheckCollision = (collidableItems: (Coords & Size)[]) => {
  //TODO: this can likely be optimized, but it works for now.
  const checkCollision = React.useCallback(
    ({ x, y }: Coords) => {
      // Calculate the character's bounding box
      const characterLeft = x - PLAYER_SIZE.width / 2;
      const characterTop = y - PLAYER_SIZE.height / 2;
      const characterRight = x + PLAYER_SIZE.width / 2;
      const characterBottom = y + PLAYER_SIZE.height / 2;

      for (const item of collidableItems) {
        if (
          characterRight > item.x &&
          characterLeft < item.x + item.width &&
          characterBottom > item.y &&
          characterTop < item.y + item.height
        ) {
          console.log('🪵 | COLLISION');
          return true; // Collision detected
        }
      }
      return false; // No collision
    },
    [collidableItems]
  );

  return { checkCollision };
};
