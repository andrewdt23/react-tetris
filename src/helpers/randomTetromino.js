import { TETROMINOS } from './tetrominos';

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS);
  return TETROMINOS[keys[Math.floor(keys.length * Math.random())]]
}
