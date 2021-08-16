<template>
    
   <v-expansion-panels color="grey lighten-3" min-width="150" rounded class="ma-2 pa-2 long-line">
    <v-expansion-panel>
     <v-expansion-panel-header disable-icon-rotate class="no-uppercase ">
         {{ btnFace }}
         <template v-slot:actions>
           <v-icon color="teal">
              {{ icon | repl}}
           </v-icon>
         </template>
         
     </v-expansion-panel-header>

    <v-expansion-panel-content>
        <v-card color="indigo lighten-3">
        <v-icon color="purple" 
            title="some icon Tip"
            right
           @click="iconClick()" >
            {{ icon }}
        </v-icon>
        <v-btn class="no-uppercase " right
           @click="btnClick()"
           title="some Button Tip"
           min-width="150"
           draggable="btndrag"
           >
         {{ btnFace }}   
        </v-btn>

        {{ btnFace }} ander goed
        <v-btn @click="showAttachment = !showAttachment"> <v-icon> mdi-attachment </v-icon> </v-btn>
        <v-dialog v-model="showAttachment" max-width="400">
         <zml-preview :src="src"   type="attachment"  >
           <zml-close-button @btn-click="showAttachment = !showAttachment"/>
         </zml-preview>
        </v-dialog>
        </v-card>
    </v-expansion-panel-content>
   </v-expansion-panel>
  </v-expansion-panels>
    

</template>
<script>
import zmlPreview from '@/components/zmlPreview.vue'
import zmlCloseButton from '@/components/zmlCloseButton.vue'
export default {
    name:"zmlContentButton",
    components: {zmlPreview, zmlCloseButton},
    props: ['icon','btnFace'],
    data: () => ({
      src : "https://kuiliesonline.co.za/Subjects/GR12/Accounting_Rekeningkunde/Gr 12 - Mrs Wiegand/Budgets/14.10 Part 2.mp4",
      showAttachment : false,
      attachment: 'video'
    }),    
    filters:{
        repl(value) { 
            if (value == '') {
                return "mdi-coffee"
            }
            return value
        }
    },
    methods: {
        btnClick() {
            console.log('zmlContentButton - Click')
        },
        iconClick() {
            console.log('zmlIconButton - Click')
        }

    },

}
</script>
<style scoped>
.no-uppercase {
     text-transform: none;
}
.long-line {
    white-space: nowrap ;
    word-break: normal;
    overflow: hidden ;
    text-overflow: ellipsis;
}
</style>