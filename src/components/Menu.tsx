import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { Controls } from "./Controls";

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-3">
      <Button onClick={() => navigate("/play")}>Start Game</Button>
      <div className="mt-5">
        <Controls />
      </div>
    </div>
  );
};
