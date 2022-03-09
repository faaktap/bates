<template>
  <v-app id="app">
   <AppLayout>
    <v-container fluid>
        <router-view>
        </router-view>
    </v-container>

   </AppLayout>
    <v-snackbar
      top centered
      :color="snackbarColor"
      elevation="21"
      v-model="snackbar"
      timeout="3500">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text
          v-bind="attrs"  @click="snackbar = false"
        >Close</v-btn>
      </template>
    </v-snackbar>

    <confirm ref="confirm"></confirm>
  </v-app>
</template>


<script>
import { zmlLog } from '@/api/zmlLog.js';
import { getters } from "@/api/store";
import { zData } from "@/api/zGetBackgroundData.js"
import confirm from "@/api/DialogConfirm";
import EventBus, { ACTIONS } from '@/api/event-bus';
//import TablePlace from '@/components/crud/TablePlace.vue';
//import TransitionExpand from '@/components/transition/TransitionExpand.vue'
export default {
  name: 'ZmlApp111111',
  components:{
      confirm,
      //TransitionExpand
  },
  data: () => ({
    getZml: getters.getState({ object: "gZml" }),
    snackbarMessage: "",
    snackbarColor: "red accent-4",
    snackbar: false,
  }),
  methods: {
  },
  mounted: function () {
    console.log("Start:",this.$options.name,this.$route.fullPath)

    zData.initialData('Load Subject Data')
    console.log('also good place to see if person is logged on, and load cookies.')
    if (!this.getZml.login.username) {
        this.snackbarMessage = 'not logged in'
    } else {
      console.log('he is logged in as ', this.getZml.login.username, this.getZml.login.isAuthenticated)
      this.getZml.login.isAuthenticated = true // skip auth
    }

    zmlLog(this.getZml.login.username , "LoginBates", this.getZml.login.userid + ',' + this.getZml.login.lastdate)

/* START External Programs that uses app.vue to make use of global stuff.    */
    this.$root.$confirm = this.$refs.confirm.open
    EventBus.$on(ACTIONS.SNACKBAR, (message, color) => {
        this.snackbarMessage = message;
        if (color) this.snackbarColor = color
        this.snackbar = true;
      });
/* END External Programs that uses app.vue to make use of global stuff.    */
  },
  destroyed () {
    EventBus.$off(ACTIONS.SNACKBAR)
  }
};
</script>