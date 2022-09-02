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
    return { rowCount, cellCount, board };
  },
  value(): Array<Array<number | string>> {
    return gameData().getBoard;
  },
};
</script>

<template>
  <div class="gameContainer">
    <div class="board" v-for="row in this.board" :key="this.rowCount++">
      <div class="cell" v-for="cell in row" :key="this.cellCount++">
        <cell :bomb="cell" />
      </div>
    </div>
  </div>
</template>

<style>
.board {
  display: flex;
  left: 50%;
}
</style>
