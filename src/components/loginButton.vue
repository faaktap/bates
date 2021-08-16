<!--
 LoginButton is usally in the right hand side top of the menubar.
 It creates a complete menu, where all login stuff happens, and also stuff we do not want on main toolbar.
-->
<template>
 <div class="text-center">
    <v-menu xxopen-on-hover  top  xoffset-y  max-height="400"  close-on-content-click dark>
     <v-toolbar color="teal" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        :{{ getZml.login.isAuthenticated ? getZml.login.username : rightMenuButton }}:
        </v-toolbar-title>
      <v-spacer></v-spacer>
      </v-toolbar>    
      <template v-slot:activator="{ on, attrs }">
       <v-btn v-bind="attrs" v-on="on">
        <v-icon>mdi-navigation</v-icon>
        <div v-if="!$vuetify.breakpoint.smAndDown">
          {{ getZml.login.isAuthenticated ? getZml.login.username : rightMenuButton }}
        </div>
        </v-btn>
      </template>
      
      <!--show the toobar buttons not at the top-->
      <toolbar-buttons menuDisplay="vertical" :buttonGroup="toolbars" />
      
      <v-card elevation="3" color="primary" dark> 
        <v-card-title> Profile  </v-card-title>
        <v-card-subtitle>{{ getZml.login.fullname}} </v-card-subtitle>
        <v-card-text> 
                Logins : {{ getZml.login.logins }}
           <br/>Last Login : {{ getZml.login.lastdate }}
       <div v-if="getZml.login.username=='werner'">
         {{ getZml.login }}
       </div>
           
        </v-card-text>
        <v-card-actions>
           <v-btn to="/login" 
                  small
                  class="white--text font-weight-black"> 
            Profile 
           </v-btn>
           <v-btn v-if="getZml.login.type != 'student'" 
                  to="/userlist"
                  small
                  class="white--text font-weight-black"
                  > 
             Reset Passwords 
            </v-btn>
          <v-spacer />
           <v-btn to="/login" 
                 small
                 class="white--text font-weight-black"> Logout </v-btn>
        </v-card-actions>
        <div class="ma-2 caption"> <v-icon small>mdi-brain</v-icon>{{programname}} version {{ version }}</div>
      </v-card>
    </v-menu>
</div> 
</template>

<script>
import ToolbarButtons from '@/components/ToolbarButtons'
import { zmlConfig } from '@/api/constants.js'
import { getters } from "@/api/store";
  export default {
    name: "loginButton",
    components: {ToolbarButtons},
    data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      toolbars:['tool','test','login'],
    }),
    methods:{
       test(item) {
           alert("you clicked on " + item.title)
       } 
    },
    computed: {
        LoginHeading()    { return this.$t('message.LoginHeading') },
        rightMenuButton() { return this.$t('btn.rightmenubutton') },
        programname()     { return this.$t('message.programname') },
        version()         { return zmlConfig.projectID },
    },
    mounted:function() {
        if (this.getZml.login.isAuthenticated == true) {
          //Login - Auth True',this.version)
        } else {
          //Login - Auth False',this.version)  
        }
    }
  }
</script>