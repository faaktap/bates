<template>
 <v-parallax height=912 src="img/stockbig.jpg">
 <v-expand-transition v-if="show">
 <v-card class="ma-2 pa-2">
  <v-card-title> What to do </v-card-title>
  <v-card-text> Click on the location button, and search for the room you would like to do stocktaking
    in. Make sure the room's owner is correct, and click the edit button to fix it, if not correct.
    <p>Then double click on the room, press Yes on confirm and start entering your stuff.</p>
    </v-card-text>
  <v-card-actions> <v-btn class="mx-2" small to="/class"> location </v-btn> </v-card-actions>
  <v-card-text> If you would like to assist in the building of stock item descriptions, you
      are welcome to peruse the "Stock Categories and Breakdown" system. We try and make it
      easier to define standard names for most stockitems. The idea is that when we try to find out
      how many of a certain stock item we carry, we do not have to sift thru hundreds of differently
      spelled names, therefore we carry a category, and also inside the category some names we think might
      be needed. Some categories still need some work.
  </v-card-text>
  <v-card-text>
      The different subsystem work the same in most cases. At the top left is a search bar, where you
      can type any word, and we will filter by that word. If there is subsets of the data, you can use
      the switches below the search button, to list only a subset or subsets.
      At the right of the search button is a ADD, REFRESH and EXPORT button.
      <br>
      Below this information is our list of items, with buttons next to it for editing.
  </v-card-text>
 </v-card>
 </v-expand-transition>
 </v-parallax>
</template>

<script>
export default {
  name: 'Home',
  components:{
  },
  data: () => ({
    show: false,
  }),
  methods: {
    startTimer(duration, funcToCall) {
          let timer = duration, minutes, seconds;
          this.timerHandle = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            funcToCall(minutes + ':' + seconds)
            if (--timer < 0) {
              timer = duration;
            }
          }, 2000);
    },
    letItBe() {
       this.show = true
    }

  },
  mounted() {
     this.startTimer(800,this.letItBe)
  },
  watch:{
  }
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition-duration: 3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-enter-active {
  transition: all 3s ease;
}

.v-carousel .v-window-item {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>