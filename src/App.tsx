import React from 'react';
import './App.css';
import { Stage } from '@pixi/react';
import { World } from './World';
import { DESKTOP_SIZE } from '../constants';

const App = () => {
  const [stageSize, setStageSize] = React.useState({ width: 800, height: 600 });
  console.log('🪵 | App | stageSize:', stageSize);

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
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        options={{ backgroundColor: 0x1099bb }}
      >
        <World stageSize={stageSize} />
      </Stage>
    </div>
  );
};

export default App;
