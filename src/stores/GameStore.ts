import { action, makeObservable, observable } from "mobx";
import { isEqual } from "lodash";

import {
  NUM_COLUMNS,
  NUM_ROWS,
  DEFAULT_BOARD_VALUE,
} from "../helpers/constants";
import { TetrominoStore } from "./TetrominoStore";
import { randomTetromino } from "../helpers/randomTetromino";
import { TETROMINOS } from "../helpers/tetrominos";
import { rotate } from "../helpers/rotate";
import { GameBoard, TetrominoType } from "../types/common";

export class GameStore {
  tetrominos: TetrominoStore[];
  gameBoard: GameBoard;
  gameOver: boolean;
  storedPiece: TetrominoType | undefined;
  alreadyStored: boolean;
  storedPieceBoard: GameBoard;
  score: number;

  constructor() {
    this.gameBoard = Array(NUM_ROWS)
      .fill(DEFAULT_BOARD_VALUE)
      .map((_) => Array(NUM_COLUMNS).fill(DEFAULT_BOARD_VALUE));
    this.storedPieceBoard = Array(4)
      .fill(DEFAULT_BOARD_VALUE)
      .map((_) => Array(4).fill(DEFAULT_BOARD_VALUE));
    this.tetrominos = [new TetrominoStore(randomTetromino())];
    this.gameOver = false;
    this.storedPiece = undefined;
    this.alreadyStored = false;
    this.score = 0;
    this.updateGameBoard();

    makeObservable(this, {
      tetrominos: observable,
      gameBoard: observable,
      gameOver: observable,
      addTetromino: action,
      shiftTetromino: action,
      updateGameBoard: action,
      clearLines: action,
      dropActiveTetromino: action,
    });
  }

  updateGameBoard = () => {
    this.gameBoard = Array(NUM_ROWS)
      .fill(DEFAULT_BOARD_VALUE)
      .map((_) => Array(NUM_COLUMNS).fill(DEFAULT_BOARD_VALUE));

    this.tetrominos.forEach((tetromino, index) => {
      tetromino.coordinates.forEach((coord) => {
        if (!isEqual(this.gameBoard[coord.y][coord.x], DEFAULT_BOARD_VALUE)) {
          this.gameOver = true;
        } else {
          this.gameBoard[coord.y][coord.x] = {
            color: tetromino.color,
            active: index === 0,
          };
        }
      });
    });
  };

  updateStoredPieceBoard = () => {
    this.storedPieceBoard = Array(4)
      .fill(DEFAULT_BOARD_VALUE)
      .map((_) => Array(4).fill(DEFAULT_BOARD_VALUE));

    if (!this.storedPiece) {
      return;
    }

    const tetromino = TETROMINOS[this.storedPiece];
    tetromino.coordinates.forEach((coord) => {
      this.storedPieceBoard[coord.y][coord.x - 3] = {
        color: tetromino.color,
        active: false,
      };
    });
  };

  clearLines = () => {
    const newBoard = this.gameBoard.filter(
      (row) => !row.every((col) => !isEqual(col, DEFAULT_BOARD_VALUE))
    );

    this.gameBoard.forEach((row, index) => {
      if (row.every((col) => !isEqual(col, DEFAULT_BOARD_VALUE))) {
        this.score += 100;
        this.tetrominos.forEach((tetromino) => {
          tetromino.shiftAfterLineClear(index);
        });
        newBoard.unshift(Array(NUM_COLUMNS).fill(DEFAULT_BOARD_VALUE));
      }
    });
    this.gameBoard = newBoard;
  };

  addTetromino = (tetromino: TetrominoStore) => {
    this.tetrominos.unshift(tetromino);
    this.updateGameBoard();
  };

  dropActiveTetromino = () => {
    if (
      this.tetrominos[0].coordinates.every((coord) => {
        return (
          coord.y < NUM_ROWS - 1 &&
          (isEqual(this.gameBoard[coord.y + 1][coord.x], DEFAULT_BOARD_VALUE) ||
            this.gameBoard[coord.y + 1][coord.x].active)
        );
      })
    ) {
      this.tetrominos[0].shiftDown();
      this.updateGameBoard();
      return false;
    } else {
      this.clearLines();
      this.addTetromino(new TetrominoStore(randomTetromino()));
      this.alreadyStored = false;
      return true;
    }
  };

  fullDropActiveTetromino = () => {
    let done = this.dropActiveTetromino();
    while (!done) {
      done = this.dropActiveTetromino();
    }
  };

  shiftTetromino = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        this.dropActiveTetromino();
        break;
      case "ArrowRight":
        if (
          this.tetrominos[0].coordinates.every(
            (coord) =>
              coord.x < NUM_COLUMNS - 1 &&
              (isEqual(
                this.gameBoard[coord.y][coord.x + 1],
                DEFAULT_BOARD_VALUE
              ) ||
                this.gameBoard[coord.y][coord.x + 1].active)
          )
        ) {
          this.tetrominos[0].shiftRight();
          this.updateGameBoard();
        }
        break;
      case "ArrowLeft":
        if (
          this.tetrominos[0].coordinates.every(
            (coord) =>
              coord.x > 0 &&
              (isEqual(
                this.gameBoard[coord.y][coord.x - 1],
                DEFAULT_BOARD_VALUE
              ) ||
                this.gameBoard[coord.y][coord.x - 1].active)
          )
        ) {
          this.tetrominos[0].shiftLeft();
          this.updateGameBoard();
        }
        break;
      case "ArrowUp":
        this.fullDropActiveTetromino();
        break;
      case "r":
        const newCoords = rotate(
          this.tetrominos[0].coordinates,
          this.tetrominos[0].origin
        );
        if (
          newCoords.every(
            (coord) =>
              coord.x > 0 &&
              coord.x < NUM_COLUMNS - 1 &&
              coord.y > 0 &&
              (isEqual(this.gameBoard[coord.y][coord.x], DEFAULT_BOARD_VALUE) ||
                this.gameBoard[coord.y][coord.x]?.active)
          )
        ) {
          this.tetrominos[0].rotate();
          this.updateGameBoard();
        }
        break;
      case "s":
        if (this.alreadyStored) {
          break;
        }
        const newPiece = this.storedPiece;
        const newTetromino = this.tetrominos.shift();
        if (newTetromino) {
          this.storedPiece = newTetromino.type;
        }
        if (newPiece) {
          this.addTetromino(new TetrominoStore(TETROMINOS[newPiece]));
        } else {
          this.addTetromino(new TetrominoStore(randomTetromino()));
        }
        this.updateStoredPieceBoard();
        this.alreadyStored = true;
        break;
      default:
        break;
    }
  };
}
