<template>
  <div class="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view class="main"></router-view>
</template>

<style scoped>
.main {
  height: 90vh;
}
.nav {
  width: 100%;
  min-width: 100%;
  background-color: rgb(119, 11, 129);
  height: 3em;
}
</style>
