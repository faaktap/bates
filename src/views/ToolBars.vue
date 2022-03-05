<template>
 <v-container fluid>


<v-card class="mx-auto" color="green" max-width="800" rounded="xl">
  <v-row class="mx-0" style="overflow:hidden;">
    <v-col cols="6" class="orange">
      <div class="fill-height d-flex justify-center align-center">
          this should be different color
      </div>
    </v-col>
    <v-col cols="6">
      <v-card-title> Title </v-card-title>
      <v-card-actions> Actions </v-card-actions>
    </v-col>
  </v-row>
</v-card>

  <br>

  <base-twotone-card class="ma-2" >
    <h1> WERNER SMIT </h1>
    <template v-slot:header>
      This is the header
    </template>
    <template v-slot:text>
      This is the text
    </template>
    <template v-slot:actions>
      <v-btn> This is actions </v-btn>
    </template>
  </base-twotone-card>

  <h1> Option 1 </h1>
  <v-card
    xxmax-width="500"
    class="mx-auto"
   >
   <v-toolbar dark dense :collapse="editMode">
    <v-app-bar-nav-icon v-if="!selection.length"
                       @click.stop="editMode = !editMode"
                       title="Click to view edit options"
    >
    </v-app-bar-nav-icon>
     <v-btn  v-else
              icon
              @click="selection = []">
      <v-icon>mdi-close</v-icon>
     </v-btn>
     <v-toolbar-title>
        {{ selection.length ? `${selection.length} selected` : 'Photos' }}
     </v-toolbar-title>
     <v-spacer></v-spacer>

     <v-scale-transition>
        <v-btn v-if="selection.length"
               key="export"
               icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
     </v-scale-transition>
     <v-scale-transition>
        <v-btn v-if="selection.length"
               key="delete"
               icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
     </v-scale-transition>


     <v-btn small > Add A Root Folder  </v-btn>
     <v-btn small to="/subjects"> Edit Subject Names and Order </v-btn>
     <v-btn small to="/studentlist"> studentlist </v-btn>
    </v-toolbar>
   <v-card-text v-if="editMode==false">
     <v-select v-model="selection"
        :items="items"
        label="Select an option"
     />
   </v-card-text>
  </v-card>
{{ editMode }}

<h1> Option 2 </h1>
<z-base-tool :toolList='[{name:"Click Button1", icon:"mdi-tooth"}
                      ,{name:"button2", icon:"mdi-speaker-bluetooth"}
                      ,{name:"button2a",tip:"This is a tip - and a quite long one to."}
                      ,{name:"b2cc",icon:"mdi-scale-bathroom",tip:"This is a tip - and a quite long one to.This is a tip - and a quite long one to.tip:This is a tip - and a quite long one to."}
                      ,{name:"b2xzzc"}
                      ,{name:"button3"}]' 
            
            @toolclick="listenToToolbar">
            toolbarName="Name of Toolbar a bit longer than usual"
</z-base-tool>

<base-tool :toolList='[{name:"Save", icon:"mdi-content-save"}
                      ,{name:"Close", icon:"mdi-table-cancel"}]' 
            toolbarName="Editing the great entity"
            @toolclick="listenToToolbar"/>

<z-base-tool :toolList='[{name:"Save", icon:"mdi-content-save"}
                        ,{name:"Close", icon:"mdi-location-exit"}]' 
            color="primary"
            dark="true"
            @toolclick="listenToToolbar">
            Some Information on toolbar message ??
</z-base-tool>

<z-base-tool />

   </v-container>    
</template>
<script>
//import ToolbarButtons from '@/components/ToolbarButtons'
import baseTool from '@/components/base/baseTool.vue'
import ZBaseTool from '@/components/base/ZBaseTool.vue'
import BaseTwotoneCard from '@/components/base/BaseTwotoneCard.vue'
export default {
  name: 'ToolbarTester',
  components: {baseTool, ZBaseTool,BaseTwotoneCard},   
  data: () => ({
    editMode:false,
    selection:[],
    items:['Select To Do This','And select to do that'],
    toolList:[{name:"Button1"},{name:"button2"},{name:"button3"}],
  }),
  methods:{
      listenToToolbar(e) {
          alert('toolbar:')
          console.log('toolbar',e)
      } ,
  },
  mounted: function () {
      console.log("Start:",this.$options.name)
  }
}
</script>