import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <h1 className="text-center">Tetris</h1>
      <Outlet />
    </>
  );
};

export default App;
