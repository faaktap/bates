<template>
  <div>
   <v-app-bar app color="primary" title="info about AppLayoutLinks">
    <zml-title :maintitle="test" @click="drawer=!drawer" clickToGoBack="false" />
    
    <v-spacer />
    <login-button/>
   </v-app-bar>

<v-navigation-drawer
  color="accent"
  right
  mini-variant
  xpermanent
  expand-on-hover
  overlay-opacity="0.73"
  v-model="drawer"
  app
>
<slot name="prepend"> prepend </slot>

<toolbar-buttons menuDisplay="vertical" :buttonGroup="toolbars"/>
<v-btn> sfsdf </v-btn>  
<slot name="append"> append </slot>
</v-navigation-drawer>
  <v-main>
    <div v-if="demo == 1" class="info5"> AppLayoutBasic Slot Start </div>
    <!--transition name="fade" mode="out-in"-->
    <slot />
    <!--/transition-->
    <div v-if="demo == 1"  class="info5"> AppLayoutBasic Slot End</div>
  </v-main>

    <v-footer app>
    This is a basic footer
    </v-footer>

  </div>
</template>

<script>
import  {zmlConfig } from '@/api/constants.js'
import ToolbarButtons from '@/components/ToolbarButtons'
import LoginButton from '@/components/loginButton'
import zmlTitle from '@/components/zmlTitle'

export default {
  name: "AppLayoutBasic",
  components: {LoginButton, zmlTitle, ToolbarButtons},
  data: () => ({
    demo:0,
    test: "Basic Program Ding ",
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