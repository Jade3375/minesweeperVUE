<script lang="ts">
import { gameData } from "@/stores/counter";
import cell from "@/components/cell.vue";

export default {
  components: {
    cell,
  },
  setup(props) {
    //gameData().createBoard();

    const rowCount = gameData().gety;
    const cellCount = gameData().getx;
    const board = gameData().getBoard;
    const GS = gameData().getWin;
    return { rowCount, cellCount, board, gameData };
  },
  value() {
    return gameData().getBoard;
  },
};
</script>

<template>
  <div class="container">
    <div class="gameContainer">
      <div class="board" v-for="row in this.board" :key="this.rowCount++">
        <div class="cell" v-for="cell in row" :key="this.cellCount++">
          <cell :bomb="cell" />
        </div>
      </div>
    </div>
    <div class="status">
      {{ this.gameData().getWin }}
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.board {
  display: flex;
  left: 50%;
}
</style>
