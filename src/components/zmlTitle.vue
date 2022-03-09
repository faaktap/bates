<template>
<div>
    <v-hover
      v-if="!$vuetify.breakpoint.mobile"
      v-slot:default="{ hover }"
      open-delay="200">
    <v-btn :elevation="hover ? 12 : 2"
            :class="{'on-hover': hover,'overwrite-hover': $vuetify.breakpoint.xsOnly}"
            @click="goHome()"
            class="ma-2"
    >
    <v-spacer />
      <v-icon color="green darken-3" class="ma-2">
         <template v-if="hover"> HS </template> <!--{{ mainIcon[curIcon + hover] }}-->
         <template v-else> DK </template>
      </v-icon>
      <div v-show="!$vuetify.breakpoint.smAndDown">
        {{ maintitle }}
      </div>
    </v-btn>
    </v-hover>

<v-dialog v-model="titleDialog" max-width="60%"
         style="transform: scale(0.875);transform-origin: left;"
         overlay-color="purple"
         :fullscreen="$vuetify.breakpoint.mobile">
  <v-card class="white text--black pa-2">
   <v-card-title>
      <legend> {{titleButtonHeading}}</legend>
   </v-card-title>

   <v-card-text>
   <v-row>
     <v-col cols="12">
      <toolbar-buttons menuDisplay="shortcutlist" :buttonGroup="toolbars" />
     </v-col>
   </v-row>
   </v-card-text>


     <v-card-actions>
        <v-btn small color=primary @click="titleDialog=!titleDialog"> {{ titleButtonHeadingCloseButton }} </v-btn>
     </v-card-actions>

  </v-card>
 </v-dialog>

</div>
</template>

<script>
import ToolbarButtons from '@/components/ToolbarButtons'
export default {
  name:"zmlTitle",
  components: {ToolbarButtons},
  props:{maintitle:{}, clickToGoBack:{default:true}},
  data: () => ({
    mainIcon: ["mdi-kettle","mdi-kettle-steam-outline","mdi-kettle-steam","mdi-coffee"],
    curIcon: 1,
    hover: 0,
    titleDialog: 0,
    toolbars:['login','tool','test'],
  }),
  methods:{
    goHome() {
      //titleDialog = !titleDialog
      if (this.clickToGoBack==true && this.$router.currentRoute.path !== "/") {
            this.$router.push('/')
      }
      this.$emit("click")

    },
      about() {
        if (this.$router.currentRoute.path !== "/about") {
            this.$router.push('/about')
        }
      },
  },
  computed: {
    titleButtonHeading() { return this.$t('message.titleButtonHeading') },
    SubmityourEmail() { return this.$t('message.SubmityourEmail') },
    titleButtonHeadingCloseButton() { return this.$t('message.titleButtonHeadingCloseButton') },
  }
}
</script>