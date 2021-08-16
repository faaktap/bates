<template>
 <div>
 <LaundryLinks />
    <v-main>
    <v-dialog v-model="showMap">
    <v-img  src="/img/mapToGetToSipressLaundry.jpg" contain/>
    </v-dialog>
    <transition name="fade" mode="out-in">
    <slot /> 
    </transition>
    </v-main>

   
   <v-footer app>
    <v-row class="primary ma-2">
      <v-bottom-navigation    :value="bottomvalue"    color="primary" >
        <div class="ma-2"><br>{{ new Date().getFullYear() }} 
        <span v-if="!$vuetify.breakpoint.smAndDown"> — Sipress Wassery / Sipress Laundry</span>
             </div>
        <v-spacer />
        <v-btn href="https://facebook.com/KovsieWas/" target="_fb">
               <span>facebook</span>    
               <v-icon>mdi-facebook</v-icon>    
        </v-btn>
        <v-btn @click="displayReviews()">
               <span>reviews</span>
               <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn @click="displayMap()">
               <span>location</span>
               <v-icon>mdi-map-marker</v-icon>  
         </v-btn>
        <v-btn title="Elke site moet deesdae dit insit" href=https://sacoronavirus.co.za/ target="_corona">      <span>covid-19</span>    <v-icon>mdi-virus</v-icon>  </v-btn>
      </v-bottom-navigation>
    </v-row>
   </v-footer>
  </div>
</template>

<script>
import LaundryLinks from '@/layouts/LaundryLinks'
import  {zmlConfig } from '@/api/constants.js'
export default {
  name: "AppLayoutLaundry",
  components: {
      LaundryLinks
  },
  data: () => ({
    demo:0,
    bottomvalue: 1,
    showMap:false,
  }),
  methods:{
      displayMap() {
          this.showMap = !this.showMap;
      },
      displayReviews() {
          alert("Hier wys ons reviews - het julle al 'n paar?");
      },
  },
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