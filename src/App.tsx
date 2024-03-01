import React from "react";
import GameBoard from "./components/GameBoard";
import { GameStore } from "./stores/GameStore";
import { Menu } from "./components/Menu";
import { Controls } from "./components/Controls";

const App = () => {
  const [gameStarted, setGameStarted] = React.useState(false);

  return (
    <>
      <h1 className="text-center">Tetris</h1>
      {gameStarted ? (
        <GameBoard gameStore={new GameStore()} />
      ) : (
        <>
          <Menu setGameStarted={setGameStarted} />
          <div className="mt-5">
            <Controls />
          </div>
        </>
      )}
    </>
  );
};

export default App;
