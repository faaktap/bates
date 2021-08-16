<template>
    
   <v-expansion-panels color="grey lighten-3" min-width="150" rounded class="ma-2 pa-2 long-line">
    <v-expansion-panel>
     <v-expansion-panel-header disable-icon-rotate class="no-uppercase ">
         {{ btnFace }}
         <template v-slot:actions>
           <v-icon color="teal">
              {{ icon }}
           </v-icon>
         </template>
         
     </v-expansion-panel-header>

    <v-expansion-panel-content>
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

    </v-expansion-panel-content>
   </v-expansion-panel>
  </v-expansion-panels>
    

</template>
<script>
export default {
    name:"zmlExpansionButton",
    props: ['icon','btnFace'],
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