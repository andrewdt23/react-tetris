import { TETROMINOS } from "./tetrominos";

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS);
  const randomKeyIndex = Math.floor(keys.length * Math.random());
  const randomKey = keys[randomKeyIndex];

  return TETROMINOS[randomKey];
};
