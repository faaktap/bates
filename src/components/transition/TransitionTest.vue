<template>
<div>
 <v-row>
  <v-col cols="6">
   <v-btn v-on:click="show = !show">
    Toggle transition
   </v-btn>
   Duration: 
  <input v-model="duration" type="range" min="100" max="3000">
  {{duration}}ms
    <v-row><v-col cols="8">
      <v-slider
      v-model="duration"
      label="Duration"
      min="100" 
      max="3000"/>
     </v-col><v-col cols="4">
        {{duration}}ms
     </v-col>
    </v-row>
  </v-col>
  <v-col cols="5">

     <fade-transition mode="out-in" :duration="durationNumber">
      <div v-if="show" class="box text-center">
          <h5> Example of fade-transition </h5>
        <v-card color="purple" rounded class="ma-2 pa-3" style="border-radius: 15px;">
            <v-card-title>
             a card 
            </v-card-title>
            <v-card-text>
                Some text
            </v-card-text>
            <v-card-actions> <v-btn color="green" small> Click </v-btn></v-card-actions>
        </v-card>
       </div>
    </fade-transition>

  </v-col>
 </v-row>
</div>
</template>

<script>
import FadeTransition from "@/components/transition/FadeTransition.vue";
export default {
  name: "TransitionTest",
  components: {
    FadeTransition
  },
  computed: {
    durationNumber() {
      return parseInt(this.duration);
    }
  },
  data() {
    return {
      show: true,
      duration: 500
    };
  }
};
</script>
<style lang="scss">
.box {
  width: 200px;
  height: 200px;
  margin-top: 20px;
  background-color: rgb(108, 141, 213);
  box-shadow: rgba(108, 141, 213, 0.5) 0px 6px 20px;
  border-radius: 10px;
}
.red-box {
  @extend .box;
  background-color: rgb(251, 17, 116);
  box-shadow: rgba(251, 17, 116, 0.5) 0px 6px 20px;
}
</style>
