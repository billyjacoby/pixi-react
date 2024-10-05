import React from 'react';
import { PLAYER_SIZE } from '../lib/constants';
import { Coords, Size } from '../types';

const PLAYER_SIZE_BUFFER = -0.3;
const BUFFERED_PLAYER_SIZE = {
  width: PLAYER_SIZE.width * (1 + PLAYER_SIZE_BUFFER),
  height: PLAYER_SIZE.height * (1 + PLAYER_SIZE_BUFFER),
};

export const useCheckCollision = (collidableItems: (Coords & Size)[]) => {
  //TODO: this can likely be optimized, but it works for now.
  //? thinking maybe doing this quadrant based, only checking items in the same quadrant as the character could make this far more performant
  const checkCollision = React.useCallback(
    ({ x, y }: Coords): boolean => {
      // Calculate the character's bounding box
      const characterLeft = x - BUFFERED_PLAYER_SIZE.width / 2;
      const characterTop = y - BUFFERED_PLAYER_SIZE.height / 2;
      const characterRight = x + BUFFERED_PLAYER_SIZE.width / 2;
      const characterBottom = y + BUFFERED_PLAYER_SIZE.height / 2;

      for (const item of collidableItems) {
        const itemRight = item.x + item.width;
        const itemBottom = item.y + item.height;

        // Check for Y collision
        if (characterRight > item.x && characterLeft < itemRight) {
          // Check if there's a Y overlap
          if (characterBottom > item.y && characterTop < itemBottom) {
            return true;
          }
        }

        // Check for X collision
        if (characterBottom > item.y && characterTop < itemBottom) {
          // Check if there's an X overlap
          if (characterRight > item.x && characterLeft < itemRight) {
            return true;
          }
        }
      }
      return false;
    },
    [collidableItems]
  );

  return { checkCollision };
};
