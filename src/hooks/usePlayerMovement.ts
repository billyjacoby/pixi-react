import React from 'react';
import { PLAYER_SIZE } from '../lib/constants';
import {
  DOWN_KEYS,
  LEFT_KEYS,
  MAX_SPEED,
  MIN_SPEED,
  RIGHT_KEYS,
  SPEED,
  UP_KEYS,
} from '../../constants';
import { useTick } from '@pixi/react';
import { Coords, Grid, Size } from '../types';
import { useCheckCollision } from './useCheckCollision';

const PLAYER_X_ADJUST = PLAYER_SIZE.width / 2;
const PLAYER_Y_ADJUST = PLAYER_SIZE.height / 2;

export const usePlayerMovement = ({
  worldSize,
  collidableItems,
}: {
  worldSize: Size;
  grid: Grid;
  collidableItems: (Coords & Size)[];
}) => {
  const keysPressed = React.useRef<Set<string>>(new Set());

  const [initialTouchPosition, setInitialTouchPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentTouchPosition, setCurrentTouchPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const [position, setPosition] = React.useState({
    x: 0 + PLAYER_SIZE.width / 2,
    y: 0 + PLAYER_SIZE.height / 2,
  });

  const [direction, setDirection] = React.useState<'left' | 'right'>('right');

  const { checkCollision } = useCheckCollision(collidableItems);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      keysPressed.current.add(e.key.toLowerCase());
    const handleKeyUp = (e: KeyboardEvent) =>
      keysPressed.current.delete(e.key.toLowerCase());

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const touchPos = { x: touch.clientX, y: touch.clientY };
      setInitialTouchPosition(touchPos);
      setCurrentTouchPosition(touchPos);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setCurrentTouchPosition({ x: touch.clientX, y: touch.clientY });
    };

    const onTouchEnd = () => {
      setInitialTouchPosition(null);
      setCurrentTouchPosition(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useTick((delta) => {
    let xDelta = 0;
    let yDelta = 0;

    // Keyboard movement logic
    if (
      keysPressed.current.has('a') ||
      LEFT_KEYS.some((key) => keysPressed.current.has(key))
    )
      xDelta -= 1;
    if (
      keysPressed.current.has('d') ||
      RIGHT_KEYS.some((key) => keysPressed.current.has(key))
    )
      xDelta += 1;
    if (
      keysPressed.current.has('w') ||
      UP_KEYS.some((key) => keysPressed.current.has(key))
    )
      yDelta -= 1;
    if (
      keysPressed.current.has('s') ||
      DOWN_KEYS.some((key) => keysPressed.current.has(key))
    )
      yDelta += 1;

    let speed = SPEED;

    // Touch movement logic
    if (initialTouchPosition && currentTouchPosition) {
      const touchDx = currentTouchPosition.x - initialTouchPosition.x;
      const touchDy = currentTouchPosition.y - initialTouchPosition.y;

      // Calculate the length of the drag
      const dragLength = Math.sqrt(touchDx * touchDx + touchDy * touchDy);

      // Define a deadzone radius
      const DEADZONE_RADIUS = 20; // Adjust this value as needed

      if (dragLength > DEADZONE_RADIUS) {
        // Define the drag length at which max speed is reached
        const MAX_DRAG_LENGTH = 100; // Adjust this value as needed

        // Calculate the speed based on drag length
        speed =
          MIN_SPEED +
          (MAX_SPEED - MIN_SPEED) *
            Math.min(
              (dragLength - DEADZONE_RADIUS) /
                (MAX_DRAG_LENGTH - DEADZONE_RADIUS),
              1
            );

        // Use touch input if it's outside the deadzone
        xDelta = touchDx / dragLength;
        yDelta = touchDy / dragLength;

        console.log('Drag length:', dragLength, 'Current speed:', speed); // Debug log
      }
    }

    // Normalize and apply speed if there's any movement
    if (xDelta !== 0 || yDelta !== 0) {
      const length = Math.sqrt(xDelta * xDelta + yDelta * yDelta);
      xDelta = (xDelta / length) * speed * delta;
      yDelta = (yDelta / length) * speed * delta;

      setPosition((prev) => {
        let newXPosition = Math.max(
          PLAYER_X_ADJUST,
          Math.min(worldSize.width - PLAYER_X_ADJUST, prev.x + xDelta)
        );
        let newYPosition = Math.max(
          Math.max(
            PLAYER_Y_ADJUST,
            Math.min(worldSize.height - PLAYER_Y_ADJUST, prev.y + yDelta)
          )
        );

        const isXBlocked = checkCollision({
          x: newXPosition,
          y: prev.y,
        });
        const isYBlocked = checkCollision({
          x: prev.x,
          y: newYPosition,
        });
        const isXYBlocked = checkCollision({
          x: newXPosition,
          y: newYPosition,
        });

        if (isXBlocked && isXYBlocked) {
          newXPosition = prev.x;
        }

        if (isYBlocked && isXYBlocked) {
          newYPosition = prev.y;
        }

        //? Check direction
        if (newXPosition > prev.x) {
          setDirection('right');
        }

        if (newXPosition < prev.x) {
          setDirection('left');
        }

        return {
          x: newXPosition,
          y: newYPosition,
        };
      });
    }
  });

  return { position, direction };
};
