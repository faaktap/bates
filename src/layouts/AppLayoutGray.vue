<template>
 <div>
  <AppLayoutLinks />
   <v-main>  
    <transition name="fade" mode="out-in">
    <slot />
    </transition>
   </v-main>  

   <div class="d-none d-lg-block">
   <v-footer app>
    <v-row v-if="showFooter">
      <v-col cols="12">
      <v-card color="grey lighten-3" align="center" class="pt-1 pb-1 ml-0">         

        <v-btn x-small class="mx-3" dark icon bottom color="green darken-7" small href="https://www.dekuilen.com" target="_blank">
          <v-icon small> DK </v-icon>
        </v-btn>

        <v-btn class="mx-3" dark icon bottom color="blue" small href="https://www.facebook.com/dekuilen" target="_blank">
          <v-icon small>mdi-facebook</v-icon>
        </v-btn>

        <v-btn class="mx-3" dark icon bottom color="blue darken-7" small left href="https://www.twitter.com/hsdekuilen" target="_blank">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>

        <v-btn class="mx-3" dark icon bottom color="purple" small href="https://www.instagram.com/dekuilenhighschool/" target="_blank">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn class="mx-3" dark icon bottom color="purple" small href="https://www.instagram.com/truekuilies/" target="_blank" tip="truekuilies">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>

        

        <v-btn class="mx-3" dark icon bottom color="tertiary" small @click="nomail">
          <v-icon>mdi-email</v-icon>
        </v-btn>
        <!-- Hide the footer -->
        <v-btn icon @click="showFooter = false"><v-icon> mdi-close </v-icon> </v-btn> 
      </v-card>
      
     </v-col>
    </v-row>
   </v-footer>
   </div>
 </div>
</template>

<script>
import AppLayoutLinks from '@/layouts/AppLayoutLinks'
import  {zmlConfig } from '@/api/constants.js'
import { infoSnackbar } from '@/api/GlobalActions';
export default {
  name: "AppLayoutGray",
  components: {
    AppLayoutLinks
  },
  data: () => ({
    appVar:'This is appVar',
    demo:1,
    showFooter: true
  }),
  methods: {
    nomail() {
      infoSnackbar("You can only send mail after you are identified on this platform");
    },
    whatever() {
      infoSnackbar("Click on the social buttons to access our communication channels");
    }

  },
  mounted: function () {
      this.demo = zmlConfig.demo;
  }
}
</script>

<style scoped>
.header {
  height: 15rem;
  background-color: green;
}
.info2 {
  height: 5rem;
  background-color: orchid;
}

</style>