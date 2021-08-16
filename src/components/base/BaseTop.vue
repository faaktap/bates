<template>
<v-container fluid fill-width>
  <!--BaseBreakpointDisplay /-->
<v-parallax src="img/about.jpg" 
            height="showMore ? 250 : 100" 
            dark >
   <v-btn icon small 
         absolute top right
         title="Click here to close"
        @click="showMore = !showMore"
         ><v-icon color="white">mdi-information</v-icon>
   </v-btn>   
 <v-row align="center"  justify="center" class="ma-1">
  <v-col cols="12">
    <h1 class="display-1 text-center text-bold  text-xs-body-1 text-md-h1">
      {{ heading }}
    </h1> 
  </v-col>
 </v-row>
 <template v-if="showMore">
 <v-row  align="center"  justify="center" class="ma-1">
  <v-col cols="12"> 
    {{ description }} 
  </v-col>
 </v-row>
 <v-row  align="center"  justify="center">
  <v-col cols="12"> 
   <slot> </slot>
  </v-col>
 </v-row>
 </template>

 <template v-if="showMore">
 <v-card xcolor="gray lighten-2" class="ma-2 pa-2" width="100%">  
   <v-btn v-if="showMore" icon small 
         absolute top right
         title="Click here to close"
        @click="showMore = false"
         ><v-icon color="white">mdi-close</v-icon>
   </v-btn>    

    <v-img v-if="showMore" src="img/logo.png" height="80" contain class="ma-2"/>
    <v-card-title class="gray lighten-1 pa-2 ma-4" >
     <h1 :class="$cHead" class="text-bold"> {{ heading }}</h1> 
    </v-card-title>
    <v-card-text v-if="showMore"> 
      {{ description }}
    </v-card-text>
    <v-card-actions>
        <slot> </slot>
    </v-card-actions>
  </v-card>
 </template>
 </v-parallax>
 </v-container>
</template>

 <script>
 //import BaseBreakpointDisplay from "@/components/base/BaseBreakpointDisplay"
 export default {
  name: "basetop",
  props:["heading", "description"],
//  components: {BaseBreakpointDisplay},
  data: () => ({
      showMore: false,
  }),  
  methods:{
    clickedIt() {
      alert('sdfsdf')
    }
  }
 }
 </script>
