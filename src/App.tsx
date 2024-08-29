import React from 'react';
import './App.css';
import { Stage } from '@pixi/react';
import { World } from './World';

const App = () => {
  const [stageSize, setStageSize] = React.useState({ width: 800, height: 600 });
  console.log('🪵 | App | stageSize:', stageSize);

  React.useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Stage
      width={stageSize.width}
      height={stageSize.height}
      options={{ backgroundColor: 0x1099bb }}
    >
      <World stageSize={stageSize} />
    </Stage>
  );
};

export default App;
