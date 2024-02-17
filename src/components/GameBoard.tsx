import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { observer } from "mobx-react-lite";

import {
  GAME_BOARD_HEIGHT,
  GAME_BOARD_WIDTH,
  SQUARE_SIZE,
} from "../helpers/constants";
import { GameStore } from "../stores/GameStore";

const Square = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        height: `${SQUARE_SIZE}px`,
        width: `${SQUARE_SIZE}px`,
        backgroundColor: color,
      }}
    />
  );
};

const GameBoard = observer(({ gameStore }: { gameStore: GameStore }) => {
  const {
    gameBoard,
    shiftTetromino,
    dropActiveTetromino,
    gameOver,
    storedPieceBoard,
    score,
  } = gameStore;

  /* eslint-disable */
  useEffect(() => {
    window.addEventListener("keydown", shiftTetromino);

    const interval = setInterval(() => {
      dropActiveTetromino();
    }, 750);

    if (gameOver) {
      clearInterval(interval);
      window.removeEventListener("keydown", shiftTetromino);
    }

    return () => clearInterval(interval);
  }, [gameOver]);
  /* eslint-enable */

  const board = gameBoard.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((col, colIndex) => (
        <Col key={colIndex} className="p-0">
          <Square key={`(${rowIndex}, ${colIndex})`} color={col.color} />
        </Col>
      ))}
    </Row>
  ));

  const pieceStore = storedPieceBoard.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((col, colIndex) => (
        <Col key={colIndex} className="p-0">
          <Square key={`(${rowIndex}, ${colIndex})`} color={col.color} />
        </Col>
      ))}
    </Row>
  ));

  return (
    <>
      <Row>
        <Col xs={4}>
          <Container
            style={{
              width: `${SQUARE_SIZE * 4}px`,
              height: `${SQUARE_SIZE * 4}px`,
            }}
          >
            {pieceStore}
          </Container>
          <h2 className="text-center">Stored Piece</h2>
        </Col>
        <Col xs={4}>
          <Container
            className="m-auto"
            style={{
              width: `${GAME_BOARD_WIDTH}px`,
              height: `${GAME_BOARD_HEIGHT}px`,
            }}
          >
            {board}
          </Container>
        </Col>
        <Col xs={4}>
          <h2 className="text-center">Score: {score}</h2>
        </Col>
      </Row>
      {gameOver && (
        <h1 className="text-center">
          GAME OVER -{" "}
          <Button onClick={() => window.location.reload()}>Restart</Button>
        </h1>
      )}
    </>
  );
});

export default GameBoard;
