<script lang="ts">
import { gameData } from "@/stores/counter";

export default {
  props: ["bomb"],
  data() {
    return {
      isClicked: this.bomb.revealed,
      gameStore: gameData,
      isFlag: false,
    };
  },
  setup(props) {
    null;
  },
  methods: {
    handleClick() {
      if (this.isClicked) return;
      if (this.bomb.revealed) return;

      if (this.bomb.count === 0) {
        this.gameStore().clearBlanks(
          this.bomb.position[0],
          this.bomb.position[1]
        );
      } else this.isClicked = true;

      if (this.bomb.bomb) this.gameStore().endGame();
    },
    r_click(e) {
      this.gameStore().flagTile(this.bomb.position[0], this.bomb.position[1]);
      e.preventDefault();
    },
  },
};
</script>

<template>
  <div class="container">
    <div
      @BOMB="this.handleClick()"
      class="hidden"
      v-if="
        !this.isClicked && !this.gameStore().isGameOver && !this.bomb.revealed
      "
      @contextmenu.prevent="this.r_click"
      @click.capture="this.handleClick()"
    ></div>
    <div
      v-if="this.isClicked || this.gameStore().isGameOver || this.bomb.revealed"
      class="cell"
      :class="{
        bomb: this.bomb.bomb,
        one: this.bomb.count === 1,
        two: this.bomb.count === 2,
        three: this.bomb.count === 3,
        four: this.bomb.count === 4,
        five: this.bomb.count === 5,
        six: this.bomb.count === 6,
        seven: this.bomb.count === 7,
        eight: this.bomb.count === 8,
        none: this.bomb.count === 0,
      }"
    >
      {{ this.bomb.bomb ? "💣" : this.bomb.count }}
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  left: 100%;
  -webkit-user-select: none;
  user-select: none;
}

.hidden {
  text-align: center;
  width: 2em;
  height: 2em;
  border: 1px solid rgba(0, 0, 128, 0.5);
  color: greenyellow;
  background-color: black;
}
.cell {
  text-align: center;
  width: 2em;
  height: 2em;
  border: 1px solid rgba(0, 0, 128, 0.5);
  color: greenyellow;
  background-color: gray;
}

.bomb {
  color: red !important;
}

.none {
  color: gray;
  background-color: gray;
}

.one {
  color: #8affa9;
}

.two {
  color: #f5f36c;
}

.three {
  color: #ffb85c;
}

.four {
  color: #ff7f3b;
}

.five {
  color: #fc4242;
}

.six {
  color: #d757fa;
}

.seven {
  color: #d757fa;
}

.eight {
  color: #d757fa;
}
</style>
