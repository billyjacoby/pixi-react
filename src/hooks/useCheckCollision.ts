import React from 'react';
import { PLAYER_SIZE } from '../lib/constants';
import { CollidableItem, Coords, InteractiveItem } from '../types';

const PLAYER_SIZE_BUFFER = -0.3;
const BUFFERED_PLAYER_SIZE = {
  width: PLAYER_SIZE.width * (1 + PLAYER_SIZE_BUFFER),
  height: PLAYER_SIZE.height * (1 + PLAYER_SIZE_BUFFER),
};
type Position = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

function checkItemOverlap(itemOne: Position, itemTwo: Position) {
  // Check for Y collision
  if (itemOne.right > itemTwo.left && itemOne.left < itemTwo.right) {
    // Check if there's a Y overlap
    if (itemOne.bottom > itemTwo.top && itemOne.top < itemTwo.bottom) {
      return true;
    }
  }

  // Check for X collision
  if (itemOne.bottom > itemTwo.top && itemOne.top < itemTwo.bottom) {
    // Check if there's an X overlap
    if (itemOne.right > itemTwo.left && itemOne.left < itemTwo.right) {
      return true;
    }
  }
  return false;
}

export const useCheckCollision = (
  obstacles: CollidableItem[],
  interactives: InteractiveItem[]
) => {
  //TODO: this can likely be optimized, but it works for now.
  //? thinking maybe doing this quadrant based, only checking items in the same quadrant as the character could make this far more performant
  const checkCollision = React.useCallback(
    ({ x, y }: Coords): boolean => {
      // Calculate the character's bounding box
      const characterLeft = x - BUFFERED_PLAYER_SIZE.width / 2;
      const characterTop = y - BUFFERED_PLAYER_SIZE.height / 2;
      const characterRight = x + BUFFERED_PLAYER_SIZE.width / 2;
      const characterBottom = y + BUFFERED_PLAYER_SIZE.height / 2;

      for (const item of obstacles) {
        const itemRight = item.x + item.width;
        const itemLeft = item.x;
        const itemBottom = item.y + item.height;
        const itemTop = item.y;

        const isColliding = checkItemOverlap(
          {
            top: characterTop,
            left: characterLeft,
            right: characterRight,
            bottom: characterBottom,
          },
          { top: itemTop, left: itemLeft, right: itemRight, bottom: itemBottom }
        );
        if (isColliding) return true;
      }
      return false;
    },
    [obstacles, interactives]
  );

  return { checkCollision };
};
