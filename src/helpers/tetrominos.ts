import { Tetromino, TetrominoType } from "../types/common";

export const STRAIGHT: Tetromino = {
  coordinates: [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
  ],
  origin: { x: 5, y: 0 },
  color: "aqua",
  type: TetrominoType.straight,
};

export const SQUARE: Tetromino = {
  coordinates: [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  origin: { x: 4, y: 1 },
  color: "gold",
  type: TetrominoType.square,
};

export const T: Tetromino = {
  coordinates: [
    { x: 3, y: 1 },
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  origin: { x: 4, y: 1 },
  color: "fuchsia",
  type: TetrominoType.t,
};

export const J: Tetromino = {
  coordinates: [
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 5, y: 1 },
    { x: 5, y: 0 },
  ],
  origin: { x: 5, y: 1 },
  color: "darkblue",
  type: TetrominoType.j,
};

export const L: Tetromino = {
  coordinates: [
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
  ],
  origin: { x: 4, y: 1 },
  color: "darkorange",
  type: TetrominoType.l,
};

export const S: Tetromino = {
  coordinates: [
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
  ],
  origin: { x: 4, y: 1 },
  color: "limegreen",
  type: TetrominoType.s,
};

export const Z: Tetromino = {
  coordinates: [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ],
  origin: { x: 4, y: 1 },
  color: "crimson",
  type: TetrominoType.z,
};

export const TETROMINOS: { [key: string]: Tetromino } = {
  straight: STRAIGHT,
  square: SQUARE,
  t: T,
  j: J,
  l: L,
  s: S,
  z: Z,
};
