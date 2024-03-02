import { randomTetromino } from "./randomTetromino";
import { TETROMINOS } from "./tetrominos";

describe("randomTetromino", () => {
  it("returns a tetromino", () => {
    const tetromino = randomTetromino();
    expect(Object.values(TETROMINOS)).toContain(tetromino);
  });
});
