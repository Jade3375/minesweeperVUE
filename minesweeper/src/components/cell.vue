<!-- eslint-disable prettier/prettier -->
<script lang="ts">
export default {
  props: ["bomb"],
  setup(props) {
    null;
  },
};
</script>

<template>
  <div class="container">
    <div :class="{ bomb: this.bomb.bomb }" class="cell {{this.bomb.count}}">
      {{ this.bomb.bomb ? "*" : this.bomb.count }}
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  left: 100%;
}
.cell {
  text-align: center;
  width: 2em;
  height: 2em;
  border: 1px solid pink;
  color: greenyellow;
}

.bomb {
  color: red;
}
</style>
