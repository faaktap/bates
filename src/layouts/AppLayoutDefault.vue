<template>
  <div>
    <transition name="fade" mode="out-in">
    <slot />
    </transition>    
    <v-card class="ma-1" 
            color="rgba(105, 199, 71, 0.3)" 
            xcolor="green darken-4 yellow--text" 
            align="center">
      Ho&euml;rskool De Kuilen High School</v-card>
  </div>
</template>

<style scoped>
.info1 {
  background-color: thistle;
  text-align: center;
  height: 5rem;
}
</style>