import React from "react";
import { Button } from "reactstrap";

export const Menu = ({
  setGameStarted,
}: {
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="text-center pt-3">
      <Button onClick={() => setGameStarted(true)}>Start Game</Button>
    </div>
  );
};
