import { action, makeObservable, observable } from "mobx";
import { rotate } from "../helpers/rotate";
import { Coordinate, Tetromino, TetrominoType } from "../types/common";

export class TetrominoStore {
  coordinates: Coordinate[];
  origin: Coordinate;
  color: string;
  type: TetrominoType;

  constructor(tetromino: Tetromino) {
    this.coordinates = tetromino.coordinates;
    this.origin = tetromino.origin;
    this.color = tetromino.color;
    this.type = tetromino.type;

    makeObservable(this, {
      coordinates: observable,
      origin: observable,
      color: observable,
      type: observable,
      shiftDown: action,
      shiftRight: action,
      shiftLeft: action,
      shiftAfterLineClear: action,
    });
  }

  shiftDown = () => {
    this.coordinates.forEach((coord) => coord.y++);
    this.origin.y++;
  };

  shiftRight = () => {
    this.coordinates.forEach((coord) => coord.x++);
    this.origin.x++;
  };

  shiftLeft = () => {
    this.coordinates.forEach((coord) => coord.x--);
    this.origin.x--;
  };

  shiftAfterLineClear = (rowCleared: number) => {
    this.coordinates = this.coordinates.filter(
      (coord) => coord.y !== rowCleared
    );
    this.coordinates.forEach((coord) => {
      if (coord.y < rowCleared) {
        coord.y++;
      }
    });
  };

  rotate = () => {
    this.coordinates = rotate(this.coordinates, this.origin);
    this.origin = { x: this.coordinates[2].x, y: this.coordinates[2].y };
  };
}
