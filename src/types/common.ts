import { DEFAULT_BOARD_VALUE } from "../helpers/constants";

export type Coordinate = {
  x: number;
  y: number;
};

export type Tetromino = {
  coordinates: Coordinate[];
  origin: Coordinate;
  color: string;
  type: TetrominoType;
};

export enum TetrominoType {
  straight = "straight",
  square = "square",
  t = "t",
  j = "j",
  l = "l",
  s = "s",
  z = "z",
}

export type GameBoard = (
  | typeof DEFAULT_BOARD_VALUE
  | { color: string; active: boolean }
)[][];
