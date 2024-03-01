import React from "react";
import GameBoard from "./components/GameBoard";
import { GameStore } from "./stores/GameStore";
import { Menu } from "./components/Menu";

const App = () => {
  const [gameStarted, setGameStarted] = React.useState(false);

  return (
    <div>
      <h1 className="text-center">Tetris</h1>
      {gameStarted ? (
        <GameBoard gameStore={new GameStore()} />
      ) : (
        <Menu setGameStarted={setGameStarted} />
      )}
    </div>
  );
};

export default App;
