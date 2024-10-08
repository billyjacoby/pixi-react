import React from 'react';
import './App.css';
import { Stage } from '@pixi/react';
import { World } from './components/World';
import { DESKTOP_SIZE } from '../constants';
import { UserInterface } from './components/UserInterface';

const App = () => {
  const [stageSize, setStageSize] = React.useState({ width: 800, height: 600 });

  React.useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.innerWidth < window.innerHeight;
      if (isPortrait) {
        setStageSize({
          width: window.innerWidth,
          height: isPortrait ? window.innerHeight / 2 : window.innerHeight,
        });
      } else {
        setStageSize({
          width: DESKTOP_SIZE.width,
          height: DESKTOP_SIZE.height,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="relative">
        <Stage width={stageSize.width} height={stageSize.height}>
          <World stageSize={stageSize} />
        </Stage>
        <div className="absolute bottom-1/2 md:bottom-10 left-1/2 -translate-x-1/2">
          <UserInterface />
        </div>
      </div>
    </div>
  );
};

export default App;
