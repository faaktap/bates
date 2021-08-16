<template>
  <v-app id="app">
   <AppLayout> 
    <v-container fluid>
      {{ getZml.login}}
      <v-text-field v-model="getZml.login.isAuthenticated" > nuts?: </v-text-field>
      <!--transition name="fade" mode="out-in"-->
      RV=
        <router-view/> 
      <!--/transition-->
      =RV
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
    
    </v-container>
   </AppLayout>   
    <confirm ref="confirm"></confirm>   
  </v-app>
</template>


<script>
import { getters } from "@/api/store";
import confirm from "@/api/DialogConfirm";
import EventBus, { ACTIONS } from '@/api/event-bus';
export default {
  name: 'ZmlApp',
  components: {confirm},
  data: () => ({
    getZml: getters.getState({ object: "gZml" }),
    snackbarMessage: "",
    snackbarColor: "red accent-4",
    snackbar: false,
  }),
  methods: { 
  },
  mounted: function () {
    console.log("Start:",this.$options.name)
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
