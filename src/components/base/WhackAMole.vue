<template>
<v-container>
 <v-row>
  <v-col cols="4">
    <v-btn @click="startGame">start game</v-btn>
  </v-col> <v-col cols="4">
    <v-btn @click="endGame">end game</v-btn>
  </v-col> <v-col cols="4">
    <h2>score: {{ score }}</h2>
  </v-col>
 </v-row>
 <v-sheet class="pa-4 secondary lighten-2">
 <v-row>
    <v-col v-for="n of 6" :key="n" class="container">
      <v-img
        v-if="index === n"
        src="https://grid.gograph.com/happy-mole-cartoon-vector-art_gg68718247.jpg"
        @click="onClick(n)"
        aspect-ratio="1"
        max-height="50"
        max-width="50"
        style="border-radius:20px"
      />
      <v-col v-else class="hole"></v-col>
    </v-col>
 </v-row>
 </v-sheet>
</v-container>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      index: 0,
      timer: undefined,
      score: 0,
    };
  },
  methods: {
    generateIndex() {
      this.index = Math.floor(Math.random() * 6);
    },
    startGame() {
      this.timer = setInterval(this.generateIndex, 1500);
    },
    endGame() {
      clearInterval(this.timer);
      this.score = 0;
      this.index = 0;
    },
    onClick(n) {
      if (this.index === n) {
        this.score++;
        this.index = 0;
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.hole {
  width: 50px;
  height: 50px;
  border: 1px solid indigo;
  border-radius: 50%;
}
.container {
  display: inline-block;
}
img {
  width: 50px;
  height: 50px;
}
</style>