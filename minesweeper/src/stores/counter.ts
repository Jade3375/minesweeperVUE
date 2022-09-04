/* eslint-disable for-direction */
import { defineStore } from "pinia";

export const gameData = defineStore({
  id: "gameData",
  state: () => ({
    x: 10,
    y: 10,
    /**
     * @param bomb is cell a bomb
     * @param position x and y position of cell
     * @param coun: amount of bombs around cell
     */
    board: [[{ bomb: true, position: [0, 0], count: 0 }]],
    bombs: 10,
    gameOver: false,
  }),
  getters: {
    getx: (state) => state.x,
    gety: (state) => state.y,
    getBombs: (state) => state.bombs,
    getData: (state) => [state.x, state.y],
    getBoard: (state) => state.board,
    isGameOver: (state) => state.gameOver,
  },
  actions: {
    setSize(x: number, y: number, bombs: number) {
      this.x = x;
      this.y = y;
      this.bombs = bombs;
    },
    async createBoard() {
      this.board = [[{ bomb: true, position: [0, 0], count: 0 }]];
      this.gameOver = false;
      this.setup();
    },
    setup() {
      let loops = 0;
      for (let i = 0; i < this.x; i++) {
        this.board[i] = [];
        for (let j = 0; j < this.y; j++) {
          this.board[i][j] = { position: [i, j], bomb: false, count: 0 };
        }
        loops += 1;
        if (loops == this.x) this.setBombs();
      }
    },
    setBombs() {
      for (let i = 0; i < this.bombs; i++) {
        let loop = false;
        let x = Math.round(Math.random() * (this.x - 1));
        let y = Math.round(Math.random() * (this.y - 1));
        if (this.board[x][y].bomb === true) loop = true;
        while (loop) {
          x = Math.round(Math.random() * (this.x - 1));
          y = Math.round(Math.random() * (this.y - 1));
          if (this.board[x][y].bomb === false) loop = false;
        }
        this.board[x][y].bomb = true;
        this.addBombCount(x, y);
      }
    },
    addBombCount(x: number, y: number) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (!this.board[x + i]) continue;
          if (!this.board[x + i][y + j]) continue;
          if (this.board[x + i][y + j].bomb === (true || undefined)) continue;
          this.board[x + i][y + j].count += 1;
        }
      }
    },
    endGame() {
      this.gameOver = true;
    }
  },
});
