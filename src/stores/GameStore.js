import { action, makeObservable, observable } from 'mobx';

import { NUM_COLUMNS, NUM_ROWS, DEFAULT_VALUE } from '../helpers/constants';
import { TetrominoStore } from './TetrominoStore';
import { randomTetromino } from '../helpers/randomTetromino';
import { TETROMINOS } from '../helpers/tetrominos';
import { rotate } from '../helpers/rotate';

export class GameStore {
  tetrominos;
  gameBoard;
  gameOver;
  storedPiece;
  alreadyStored;
  storedPieceBoard;
  score;

  constructor() {
    this.gameBoard = Array(NUM_ROWS).fill(DEFAULT_VALUE).map(_ => Array(NUM_COLUMNS).fill(DEFAULT_VALUE));
    this.storedPieceBoard = Array(4).fill(DEFAULT_VALUE).map(_ => Array(4).fill(DEFAULT_VALUE));
    this.tetrominos = [new TetrominoStore(randomTetromino())];
    this.gameOver = false;
    this.storedPiece = null;
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
      dropActiveTetromino: action
    });
  }

  updateGameBoard = () => {
    this.gameBoard = Array(NUM_ROWS).fill(DEFAULT_VALUE).map(_ => Array(NUM_COLUMNS).fill(DEFAULT_VALUE));

    this.tetrominos.forEach((tetromino, index) => {
      tetromino.coordinates.forEach(coord => {
        if (this.gameBoard[coord.y][coord.x] !== DEFAULT_VALUE) {
          this.gameOver = true;
        } else {
          this.gameBoard[coord.y][coord.x] = { color: tetromino.color, active: index === 0 };
        }
      });
    });
  }

  updateStoredPieceBoard = () => {
    this.storedPieceBoard = Array(4).fill(DEFAULT_VALUE).map(_ => Array(4).fill(DEFAULT_VALUE));

    const tetromino = TETROMINOS[this.storedPiece];
    tetromino.coordinates.forEach(coord => {
      this.storedPieceBoard[coord.y][coord.x - 3] = { color: tetromino.color };
    });
  }

  clearLines = () => {
    const newBoard = this.gameBoard.filter(row => !row.every(col => col !== 0));

    this.gameBoard.forEach((row, index) => {
      if(row.every(col => col !== 0)) {
        this.score += 100;
        this.tetrominos.forEach(tetromino => {
          tetromino.shiftAfterLineClear(index);
        });
        newBoard.unshift(Array(NUM_COLUMNS).fill(DEFAULT_VALUE));
      }
    });
    this.gameBoard = newBoard;
  }

  addTetromino = (tetromino) => {
    this.tetrominos.unshift(tetromino);
    this.updateGameBoard();
  };

  dropActiveTetromino = () => {
    if (this.tetrominos[0].coordinates.every(coord => coord.y < NUM_ROWS - 1 && (!this.gameBoard[coord.y + 1][coord.x] || this.gameBoard[coord.y + 1][coord.x]?.active))) {
      this.tetrominos[0].shiftDown();
      this.updateGameBoard();
      return false;
    } else {
      this.clearLines();
      this.addTetromino(new TetrominoStore(randomTetromino()));
      this.alreadyStored = false;
      return true;
    }
  }

  fullDropActiveTetromino = () => {
    let done = this.dropActiveTetromino();
    while (!done) {
      done = this.dropActiveTetromino();
    }
  }

  shiftTetromino = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        this.dropActiveTetromino();
        break;
      case 'ArrowRight':
        if (this.tetrominos[0].coordinates.every(coord => coord.x < NUM_COLUMNS - 1 && (!this.gameBoard[coord.y][coord.x + 1] || this.gameBoard[coord.y][coord.x + 1]?.active))) {
          this.tetrominos[0].shiftRight();
          this.updateGameBoard();
        }
        break;
      case 'ArrowLeft':
        if (this.tetrominos[0].coordinates.every(coord => coord.x > 0 && (!this.gameBoard[coord.y][coord.x - 1] || this.gameBoard[coord.y][coord.x - 1]?.active))) {
          this.tetrominos[0].shiftLeft();
          this.updateGameBoard();
        }
        break;
      case 'ArrowUp':
        this.fullDropActiveTetromino();
        break;
      case 'r':
        const newCoords = rotate(this.tetrominos[0].coordinates, this.tetrominos[0].origin);
        if (newCoords.every(coord => coord.x > 0 && coord.x < NUM_COLUMNS - 1 && coord.y > 0 && (!this.gameBoard[coord.y][coord.x] || this.gameBoard[coord.y][coord.x]?.active))) {
          this.tetrominos[0].rotate();
          this.updateGameBoard();
        }
        break;
      case 's':
        if (this.alreadyStored) {
          break;
        }
        if(this.storedPiece) {
          const newPiece = this.storedPiece;
          this.storedPiece = this.tetrominos.shift().type;
          this.addTetromino(new TetrominoStore(TETROMINOS[newPiece]));
        } else {
          this.storedPiece = this.tetrominos.shift().type;
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
