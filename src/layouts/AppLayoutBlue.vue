<template>
 <div>
 <AppLayoutLinks />
  <v-parallax height=800 src="img/public.jpg">  
    <v-main>
    <header v-if="demo == 1" class="header white--text"> APPLAYOUT BLUE </header>
    <div v-if="demo == 1" class="info4"> AppLayoutBlue Slot Start </div>
    <transition name="fade" mode="out-in">
    <slot /> 
    </transition>
    <small>About - Blue Layout</small>
    <div  v-if="demo == 1" class="info4"> AppLayoutBlue Slot End</div>
    </v-main>


    <v-row color="green">
      <v-col col="12">
        <div class="font-weight-medium">
          <v-col class="text-center" cols="12">
            <p v-html="$t('message.hello')"></p>
            {{ new Date().getFullYear() }} —
            <strong>Ho&euml;rskool De Kuilen Highschool</strong>
          </v-col>
        </div>
      </v-col>
      <v-bottom-navigation    :value="bottomvalue"    color="primary"  >
        <v-btn>      <span>Recents</span>      <v-icon>mdi-history</v-icon>    </v-btn>
        <v-btn>      <span>Favorites</span>      <v-icon>mdi-heart</v-icon>    </v-btn>
        <v-btn>      <span>Nearby</span>      <v-icon>mdi-map-marker</v-icon>    </v-btn>
      </v-bottom-navigation>
    </v-row>
  </v-parallax>


  </div>
</template>

<script>
import AppLayoutLinks from '@/layouts/AppLayoutLinks'
import  {zmlConfig } from '@/api/constants.js'
export default {
  name: "AppLayoutBlue",
  components: {
      AppLayoutLinks
  },
  data: () => ({
    demo:0,
    bottomvalue: 1
  }),
  mounted: function () {
      this.demo = zmlConfig.demo
  }
}
</script>

<style scoped>
.header {
  height: 5rem;
  background-color: blue;
}
.info4 {
  height: 5rem;
  background-color: blue;
}

</style>