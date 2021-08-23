<template>
 <div>
  <AppLayoutLinks />
   <v-main>  
    <transition name="fade" mode="out-in">
    <slot />
    </transition>
   </v-main>  

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