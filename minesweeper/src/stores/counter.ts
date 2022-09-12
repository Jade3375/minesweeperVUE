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
     * @param count: amount of bombs around cell
     */
    board: [[{ bomb: true, position: [0, 0], count: 0, revealed: false, flag: false }]],
    bombs: 10,
    tiles: 10 * 10,
    revealed: 0,
    gameOver: false,
    win: false,
    bombLocations: new Map<string, { x: number; y: number }>(),
    flagedLocations: new Map<string, { x: number; y: number }>(),
  }),
  getters: {
    getx: (state) => state.x,
    gety: (state) => state.y,
    getBombs: (state) => state.bombs,
    getData: (state) => [state.x, state.y],
    getBoard: (state) => state.board,
    isGameOver: (state) => state.gameOver,
    getBombLocations: (state) => state.bombLocations,
    getFlags: (state) => state.flagedLocations,
    getBomblocations: (state) => state.bombLocations,
    getTotalTiles: (state) => state.tiles,
    getRevealed: (state) => state.revealed,
    getWin: (state) => state.win,
  },
  actions: {
    setSize(x: number, y: number, bombs: number) {
      this.x = x;
      this.y = y;
      this.bombs = bombs;
    },
    async createBoard() {
      this.board = [
        [
          {
            bomb: true,
            position: [0, 0],
            count: 0,
            revealed: false,
            flag: false,
          },
        ],
      ];
      this.gameOver = false;
      this.setup();
    },
    setup() {
      let loops = 0;
      this.win = false;
      this.flagedLocations.clear();
      this.bombLocations.clear();
      for (let i = 0; i < this.x; i++) {
        this.board[i] = [];
        for (let j = 0; j < this.y; j++) {
          this.board[i][j] = {
            position: [i, j],
            bomb: false,
            count: 0,
            revealed: false,
            flag: false,
          };
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
        this.bombLocations.set(`${x}${y}`, { x: x, y: y });
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
    },
    clearBlanks(x: number, y: number) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (!this.board[x + i]) continue;
          if (!this.board[x + i][y + j]) continue;
          if (this.board[x + i][y + j].bomb === (true || undefined)) continue;
          if (this.board[x + i][y + j].revealed) continue;
          if (this.board[x + i][y + j].flag) continue;
          this.board[x + i][y + j].revealed = true;
          this.revealed++;
          this.clearBlanks(x + i, y + j);
        }
      }
    },
    flagTile(x: number, y: number) {
      console.log(this.win);
      if (this.flagedLocations.has(`${x}${y}`)) {
        this.flagedLocations.delete(`${x}${y}`);
        this.board[x][y].flag = false;
        this.checkWin();
        return;
      }
      this.flagedLocations.set(`${x}${y}`, { x: x, y: y });
      this.board[x][y].flag = true;
      this.checkWin();
    },
    checkWin() {
      if (
        this.flagedLocations.size !== this.bombLocations.size &&
        this.revealed === this.x * this.y - this.bombs
      )
        return;
      for (const index of this.flagedLocations) {
        if (this.bombLocations.has(index[0])) continue;
        else return;
      }
      return (this.$state.win = true);
    },
  },
});
