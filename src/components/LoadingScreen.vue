
<!--
https://stackoverflow.com/questions/54356211/how-do-i-create-a-splash-screen-in-vuejs
App.vue will look something like this....
  <template>
  <div id="app">
    <LoadingScreen :isLoading="isLoading" />
    <div v-if="!isLoading">
      ...your main content here...
    </div>
  </div>
</template>

-->
<template>
  <div :class="{ loader: true, fadeout: !isLoading }">
    Loading ...
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: ["isLoading"]
};
</script>

<style>
.loader {
  background-color: #63ab97;
  bottom: 0;
  color: white;
  display: block;
  font-size: 32px;
  left: 0;
  overflow: hidden;
  padding-top: 10vh;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
}

.fadeout {
  animation: fadeout 2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>