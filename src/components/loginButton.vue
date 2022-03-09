<template>
 <div class="text-center">
    <v-menu top xoffset-y max-height="400" close-on-content-click>
     <v-toolbar color="teal" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{ getZml.login.isAuthenticated ? getZml.login.username : "LOGIN" }}
        </v-toolbar-title>

      </v-toolbar>
      <template v-slot:activator="{ on, attrs }">
       <v-btn small v-bind="attrs" v-on="on" @click="immediateToLogin" class="ma-2 pa-2">
        <v-icon>mdi-navigation</v-icon>
        <div v-if="!$vuetify.breakpoint.smAndDown">
          {{ getZml.login.isAuthenticated ? getZml.login.username : "LOGIN" }}
        </div>
        </v-btn>
      </template>
      <v-card elevation="3" color="primary" dark>
        <v-card-title> {{ getZml.login.fullname}} </v-card-title>
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text>
                Logins : {{ getZml.login.logins }}
           <br/>Last Login : {{ getZml.login.lastdate }}
           <br/>Type : {{ getZml.login.type }} ({{ getZml.login.userid }})
       <div v-if="getZml.login.username=='werner'">
         {{ getZml.login }}
       </div>
        </v-card-text>
        <v-card-actions>
           <v-btn to="/login"
                  small
                  title="Use this button to logout or view your profile"
                  class="white--text font-weight-black">
            Session Status
           </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
</div>
</template>

<script>
//import ToolbarButtons from '@/components/ToolbarButtons'
import { getters } from "@/api/store";
  export default {
    name: "loginButton",
  //  components: {ToolbarButtons},
    data: () => ({
      getZml: getters.getState({ object: "gZml" }),
    }),
    methods:{
      immediateToLogin() {
        if (!this.getZml.login.isAuthenticated) {
           this.$router.push({ name: 'Login' , meta: {layout: "AppLayoutDefault" }});
        }
      },
       test(item) {
           alert("you clicked on " + item.title)
       }
    },
    computed: {
    },
    mounted:function() {
        if (this.getZml.login.isAuthenticated == true) {
          console.log('this one is authed')
        } else {
          console.log('this one is NOT authed')
        }
    }
  }
</script>