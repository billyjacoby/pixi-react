import React from 'react';
import './App.css';
import { Stage } from '@pixi/react';
import { Tutorial } from './Tutorial';
import { Explosion } from './Explosion';

const App = () => {
  React.useEffect(() => {}, []);

  return (
    <Stage width={800} height={600} options={{ background: 0x1099bb }}>
      <Tutorial />
      <Explosion />
    </Stage>
  );
};

export default App;
