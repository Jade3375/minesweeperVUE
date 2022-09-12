<script lang="ts">
import { gameData } from "@/stores/counter";
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    async pressPlay() {
      const x: number = document.getElementById("sizex")?.value
        ? document.getElementById("sizex")?.value
        : 10;
      const y: number = document.getElementById("sizey")?.value
        ? document.getElementById("sizex")?.value
        : 10;

      const bombs: number = document.getElementById("sizey")?.value
        ? document.getElementById("bombs")?.value
        : 10;

      gameData().setSize(x, y, bombs);
      await gameData().createBoard();

      this.$router.push("/play");
    },
  },
});
</script>

<template>
  <div class="container">
    <div class="formContainer">
      <form action="">
        <label for="sizex">Size X</label>
        <input type="number" name="sizex" id="sizex" /><br />
        <label for="sizey">Size Y</label>
        <input type="number" name="sizey" id="sizey" /><br />
        <label for="bombs">bombs</label>
        <input type="number" name="bonmbs" id="bombs" /> <br />
        <div class="play">
          <div class="playBTN" @click="this.pressPlay()">Play</div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.formContainer {
  display: flex;
}
.formContainer label {
  padding-right: 1em;
}

.formContainer input {
  width: 15em;
}

.play {
  position: relative;
  left: 40%;
}

.playBTN {
  animation-duration: 2s;
  text-align: center;
  margin-top: 1em;
  width: 6em;
  height: 2.5em;
  background-color: green;
}

.play :hover {
  background-color: rgb(16, 214, 16);
}
</style>
