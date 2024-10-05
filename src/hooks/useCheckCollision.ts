import React from 'react';
import { PLAYER_SIZE } from '../lib/constants';
import { Coords, Size } from '../types';

export const useCheckCollision = (collidableItems: (Coords & Size)[]) => {
  //TODO: this can likely be optimized, but it works for now.
  const checkCollision = React.useCallback(
    ({ x, y }: Coords) => {
      //TODO: Ideally this will return values that make it so that even if the character is blocked on on axis, they can move on the other.
      // Calculate the character's bounding box
      const characterLeft = x - PLAYER_SIZE.width / 2;
      const characterTop = y - PLAYER_SIZE.height / 2;
      const characterRight = x + PLAYER_SIZE.width / 2;
      const characterBottom = y + PLAYER_SIZE.height / 2;

      let xIsCollided = false;
      let yIsCollided = false;

      for (const item of collidableItems) {
        const itemRight = item.x + item.width;
        const itemBottom = item.y + item.height;

        // Check for X collision
        if (characterRight > item.x && characterLeft < itemRight) {
          // Check if there's a Y overlap
          if (characterBottom > item.y && characterTop < itemBottom) {
            yIsCollided = true; // Blocked on Y-axis
          }
        }

        // Check for Y collision
        if (characterBottom > item.y && characterTop < itemBottom) {
          // Check if there's an X overlap
          if (characterRight > item.x && characterLeft < itemRight) {
            xIsCollided = true; // Blocked on X-axis
          }
        }
      }

      if (xIsCollided || yIsCollided) {
        console.log('🪵 | COLLISION', { xIsCollided, yIsCollided });
      }

      return { xIsCollided, yIsCollided };
    },
    [collidableItems]
  );

  return { checkCollision };
};
