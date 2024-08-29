import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { Sprite, useApp, useTick } from '@pixi/react';
import {
  BUNNY_URL,
  UP_KEYS,
  DOWN_KEYS,
  LEFT_KEYS,
  SPEED,
  MIN_SPEED,
  MAX_SPEED,
  RIGHT_KEYS,
} from '../constants';

export const Character = React.forwardRef<
  PIXI.Sprite,
  { worldSize: { width: number; height: number } }
>(({ worldSize }, ref) => {
  const app = useApp();
  const keysPressed = useRef<Set<string>>(new Set());

  const [initialTouchPosition, setInitialTouchPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentTouchPosition, setCurrentTouchPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const [position, setPosition] = React.useState({
    x: app.screen.width / 2,
    y: app.screen.height / 2,
  });

  console.log('🪵 | Tutorial | position:', position);

  useEffect(() => {
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
    let dx = 0;
    let dy = 0;

    // Keyboard movement logic
    if (
      keysPressed.current.has('a') ||
      LEFT_KEYS.some((key) => keysPressed.current.has(key))
    )
      dx -= 1;
    if (
      keysPressed.current.has('d') ||
      RIGHT_KEYS.some((key) => keysPressed.current.has(key))
    )
      dx += 1;
    if (
      keysPressed.current.has('w') ||
      UP_KEYS.some((key) => keysPressed.current.has(key))
    )
      dy -= 1;
    if (
      keysPressed.current.has('s') ||
      DOWN_KEYS.some((key) => keysPressed.current.has(key))
    )
      dy += 1;

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
        dx = touchDx / dragLength;
        dy = touchDy / dragLength;

        console.log('Drag length:', dragLength, 'Current speed:', speed); // Debug log
      }
    }

    // Normalize and apply speed if there's any movement
    if (dx !== 0 || dy !== 0) {
      const length = Math.sqrt(dx * dx + dy * dy);
      dx = (dx / length) * speed * delta;
      dy = (dy / length) * speed * delta;

      setPosition((prev) => ({
        x: Math.max(0, Math.min(worldSize.width, prev.x + dx)),
        y: Math.max(0, Math.min(worldSize.height, prev.y + dy)),
      }));
    }
  });

  return (
    <Sprite
      ref={ref}
      image={BUNNY_URL}
      x={position.x}
      y={position.y}
      anchor={0.5}
    />
  );
});
