<template>
 <div>
  <slot />
  <transition appear name="slide-y-transition" :duration="{ enter: 1500, leave: 800 }">
    <v-card class="ma-1" 
            color="rgba(105, 199, 71, 0.3)" 
            align="center">
      - ZML 0.04 -
    </v-card>
  </transition>
 </div>   
</template>

<style scoped>
.info1 {
  background-color: thistle;
  text-align: center;
  height: 5rem;
}
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 1.4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(60px);
  opacity: 0;
}
</style>