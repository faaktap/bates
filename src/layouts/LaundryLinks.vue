<template>
<div>
  <v-app-bar app color="primary" title="SW" dark>
    <v-btn to="/" icon>
    <v-app-bar-nav-icon>
      <v-icon large>mdi-washing-machine</v-icon>
    </v-app-bar-nav-icon>
    </v-btn>
     <v-toolbar-title v-if="!$vuetify.breakpoint.smAndDown">
      <div v-if="title"> {{ title }}. </div>
      <div v-else> ZML Rekenaars </div>
      </v-toolbar-title>
    <v-spacer />
    <!--
    <v-btn title="Students" text class="ma-2" 
           href="/img/UFS studente brief en pakkette 2021.pdf" 
           target="pakkie">
       <v-icon left >mdi-school</v-icon> 
       <div v-if="!$vuetify.breakpoint.smAndDown"> Students</div>
    </v-btn>
    <v-btn title="School" text class="ma-2"
           href="/img/SkoolKoshuis brief en pakkette 2021.pdf" 
           target="pakkie">
      <v-icon left>mdi-office-building</v-icon> 
      <div v-if="!$vuetify.breakpoint.smAndDown"> Scholars</div>
    </v-btn> -->
    <v-btn title="Submit Washing" text class="ma-2"
           href="https://docs.google.com/forms/d/e/1FAIpQLSdAH0a0KobMWUPT7vcAui_3Ua8UimpiY-Thv_iPIM4P_Z3SSA/viewform?gxids=7628" 
           target="pakkie">
      <v-icon left>mdi-upload</v-icon> 
      <div v-if="!$vuetify.breakpoint.smAndDown"> Submit Laundry</div>
    </v-btn>    
    
    <v-btn title="Send us an Email" @click="startEmail" text class="ma-2"> 
      <v-icon left>mdi-email</v-icon> 
      <div v-if="!$vuetify.breakpoint.smAndDown"> Contact</div>
    </v-btn>
  </v-app-bar>
  <contact-form ref="emailme" />
</div>
</template>

<script>
import { getters } from "@/api/store";
import { zmlConfig } from '@/api/constants';
import ContactForm from "@/components/ContactForm";
export default {
  name: "LaundryLinks",
  components: { ContactForm },
  data: () => ({
     getZml: getters.getState({ object: "gZml" }),
     title: 'blah',
  }),
  methods:{
    startEmail() {
      zmlConfig.cl('emailme from LL');
      zmlConfig.cl('xx',this.$root);
      this.$root.$emailme();
    }
  },
  activated: function() {
    this.title = this.getZml.screen[1];
  },
  mounted: function () {    
    zmlConfig.cl('LLmount : ', this.$options.name , 'c=',this.$children.length);
    this.title = this.getZml.screen[1];
    this.$root.$emailme = this.$refs.emailme.open;  //add this a.s.a.p - needed by LaundryLinks
    zmlConfig.cl('does email exist?', this.$refs.emailme);    
  }
}
</script>
