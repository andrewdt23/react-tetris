import React from 'react';
import GameBoard from './components/GameBoard';
import { GameStore } from './stores/GameStore';

const App = () => {
  return (
    <div>
      <h1 className='text-center'>Tetris</h1>
      <GameBoard gameStore={new GameStore()} />
    </div>
  );
}

export default App;
