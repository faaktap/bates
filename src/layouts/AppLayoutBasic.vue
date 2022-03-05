<template>
  <div>
   <v-app-bar app color="primary" title="info about AppLayoutLinks">
    <zml-title :maintitle="test" @click="drawer=!drawer" clickToGoBack="false" />
    <!-- <v-spacer /> -->

    <v-btn class="mx-2"  small to="/area"> area </v-btn>
    <v-btn class="mx-2" small to="/class"> location </v-btn>
    <v-btn class="mx-2"  small to="/category"> Stock Categories and Breakdown </v-btn>
    <v-spacer />
    <v-img src="img/CleanDKHS.png" max-width="40" class="float-right" contain />

    <!-- <login-button/> -->
   </v-app-bar>

<v-navigation-drawer
  color="green darken-4"
  right
  mini-variant
  xpermanent
  expand-on-hover
  overlay-opacity="0.73"
  v-model="drawer"
  app
>
<slot name="prepend"> <v-img src="img/CleanDKHS.png" max-width="90" class="ma-1 float-left" contain />
<h2 class="text-center"> BATE PROGRAM DEKHS  </h2>
<span class="text-caption"> version:({{ version }}) </span>
</slot>

<v-card class="ma-2">
  <v-card-title> What to do </v-card-title>
  <v-card-text> Click on the location button, and search for the room you would like to do stocktaking
    in. Make sure the room's owner is correct, and click the edit button to fix it, if not correct.
    <p>Then double click on the room, press Yes on confirm and start entering your stuff.</p> </v-card-text>
  <v-card-actions> <v-btn small tip="only werner" to="/outline">  toets </v-btn></v-card-actions>
</v-card>
<slot name="append"> Anything else? Contact Werner on 082 563 9790 via whatsapp or phonecall, or email him at werner@zmlrekenaars.co.za</slot>
</v-navigation-drawer>
  <v-main>
    <div v-if="demo == 1" class="info5"> AppLayoutBasic Slot Start </div>
    <!--transition name="fade" mode="out-in"-->
    <slot />
    <!--/transition-->
    <div v-if="demo == 1"  class="info5"> AppLayoutBasic Slot End</div>
  </v-main>

    <!--v-footer app>
    This is a basic footer
    </v-footer-->

  </div>
</template>

<script>
import  { zmlConfig } from '@/api/constants.js'
// import ToolbarButtons from '@/components/ToolbarButtons'
import zmlTitle from '@/components/zmlTitle'

export default {
  name: "AppLayoutBasic",
  components: { //LoginButton,
        zmlTitle,
        //ToolbarButtons
        },
  data: () => ({
    demo:0,
    test: "KUILIES BATES",
    tb1: [ {wait : [{ btn:"about"    ,tip:"2"                  ,func:"/about"      ,icon:"mdi-coffee"}] }],
    toolbars: [ { btn:"home"     ,"tip":"1"                  ,func:"/"           ,icon:"mdi-home","optional":0,"acc":"all"}
                    ,{ btn:"teacher"  ,"tip":"4 teachers"         ,func:"/sh"     ,icon:"mdi-teach"}
                    ,{ btn:"studentfiles" ,"tip":"Student Files and Folders"       ,func:"/sh"   ,icon:"mdi-school"}
                    ,{ btn:"tHover"   ,"tip":"3"                  ,func:"/hover"      ,icon:"mdi-shovel"}
                    ,{ btn:"translate","tip":"translation testers",func:"/translate"  ,icon:"mdi-test-tube"}
                    ,{ btn:"help"     ,"tip":"4"                  ,func:"/help"       ,icon:"mdi-help"}
                    ,{ btn:"changeTo" ,"tip":"5"                  ,func:"switchLocale",icon:"mdi-translate"}
                    ],
    drawer:false
  }),
  computed:{
     version()         { return zmlConfig.projectID },
  },
  mounted: function () {
      this.demo = zmlConfig.demo
  }
}
</script>

<style scoped>
.info5 {
  height: 5rem;
  background-color: blue;
}

</style>