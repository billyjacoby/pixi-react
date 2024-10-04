import React, { forwardRef } from 'react';
import type PIXI from 'pixi.js';
import { PixiComponent, useApp } from '@pixi/react';
import { Viewport as PixiViewport } from 'pixi-viewport';
import { CompositeTilemap } from '@pixi/tilemap';

const PixiComponentViewport = PixiComponent('Viewport', {
  create: ({
    app,
    stageSize,
    worldSize,
    tileMap,
  }: PixiComponentViewportProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.renderer.events.domElement = app.renderer.view as any;

    const viewport = new PixiViewport({
      screenHeight: stageSize.height,
      screenWidth: stageSize.width,
      worldHeight: worldSize.height,
      worldWidth: worldSize.width,
      passiveWheel: false,
      events: app.renderer.events,
      ticker: app.ticker,
      disableOnContextMenu: true,
    });

    if (tileMap) {
      viewport.addChild(tileMap);
    }

    viewport
      .drag({
        wheel: false,
      })
      .wheel({
        wheelZoom: true,
      })
      .pinch()
      .clampZoom({
        maxScale: 4,
        minScale: 1 / 4,
      })
      .moveCenter(stageSize.width / 2, stageSize.height / 2)
      .setZoom(0.3);

    return viewport;
  },
  willUnmount: (viewport: PixiViewport) => {
    viewport.options.noTicker = true;
    viewport.destroy({ children: true });
  },
});

const PixiViewportComponent = forwardRef<PixiViewport, ViewportProps>(
  (props, ref) => {
    const app = useApp();
    return <PixiComponentViewport app={app} ref={ref} {...props} />;
  }
);

export default PixiViewportComponent;

export interface ViewportProps {
  children?: React.ReactNode;
  stageSize: { width: number; height: number };
  worldSize: { width: number; height: number };
  tileMap: CompositeTilemap | null;
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application;
}
