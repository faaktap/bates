<template>
<nav>
  <template v-if="getZml.login.isAuthenticated == true">
  <v-app-bar app color="#45516b" :title="programname">
      
    <zml-title :maintitle="programname" />
    
    <toolbar-buttons menuDisplay="horizontal" :buttonGroup="toolbars"/>
    <v-spacer />
    <login-button/>
 
  </v-app-bar>
  </template>  
  <template v-else>
    <v-card color="#45516b">
      <v-layout wrap align-content-stretch justify-space-around>

      <v-flex xs12 md3 align-self-center> 
        <v-btn color="#45516b" 
               to="/login" 
               elevation="1"
               class="ml-3 white--text font-weight-black text-center"
        > 
         Student Login 
        </v-btn>
       </v-flex>

      <v-flex v-if="!$vuetify.breakpoint.smAndDown" xs12 md6 align-self-center> 
      <v-card color="#45516b" class="ml-3 pt-4 mb-4 fill-height text-center white--text font-weight-black">
        <v-btn to="/login" 
               outlined 
               class="white--text font-weight-black" 
               elevation="0">
        {{ herotitle }}
        </v-btn>
      </v-card>
      </v-flex>

      <v-flex xs12 md3  align-self-center> 
        <v-btn to="/login"  
               color="#45516b" 
               xalign="right"
               class="ml-3 white--text font-weight-black text-center"
               elevation="1">
           Educator Login </v-btn>

      <!--v-card color="#45516b" 
              class="mr-3 pt-4 mb-4 fill-height text-center white--text font-weight-black"
              >
        <v-btn to="/login" icon align="right"
               class="white--text font-weight-black"
               elevation="0">
           Educator Login </v-btn>
      </v-card-->
      </v-flex>
      </v-layout>
    </v-card>
   </template>

</nav>
</template>

<script>
import { getters } from "@/api/store"
import LoginButton from '@/components/loginButton'
import ToolbarButtons from '@/components/ToolbarButtons'
import zmlTitle from '@/components/zmlTitle'
export default {
name: "AppLayoutLinks",
components: {LoginButton, zmlTitle, ToolbarButtons},
data: () => ({
  getZml: getters.getState({ object: "gZml" }),
  toolbars:['tool1','tool2'],
}),
methods: {},
computed: {
  programname() {    return this.$t('message.programname');  },
  herotitle() {    return this.$t('message.herotitle');  },
},
mounted: function () {
 
}
}
</script>
