<template>
<v-row>
  <v-col cols=12>
  <v-toolbar dense color="primary" class="mb-4">

    <v-toolbar-title  v-if="toolbarName"> 
      {{ toolbarName }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp && toolList.length" class="ma-2 pa-2 text-right float-right" >
      <v-spacer />
       <div v-for="t in toolList" 
             :key="t.name" 
              class="pl-1 pr-1 mr-1 ml-1 pt-1 pb-0 mt-0 float-right">
              
        <v-tooltip bottom :disabled="!t.tip">
         <template v-slot:activator="{ on, attrs }">

         <v-btn @click="$emit('toolclick',t.name)" 
                color="primary darken-1"
                small
                v-bind="attrs"
                v-on="on">
           <v-icon v-if="t.icon" small class="mr-2">
              {{ t.icon}} 
           </v-icon>
             {{ t.name }}  
         </v-btn>

         </template>
         <span v-if=t.tip>{{ t.tip }}</span>
        </v-tooltip>
       </div>  

    </v-toolbar-items>
    <v-spacer />
    <v-menu xv-if="!$vuetify.breakpoint.mdAndUp && toolList.length"
            absolute
            offset-y>  
       <v-spacer />
       <template v-slot:activator="{ on, attrs }">
        <v-spacer />
        <v-icon v-bind="attrs" v-on="on"> mdi-menu</v-icon>
      </template>

      <v-list>
        <v-list-item v-for="t in toolList" :key="t.name">
           <v-btn @click="$emit('toolclick',t.name)" text dense small class="ma-2 pa-2" > 
             {{ t.name }}
           </v-btn>  
        </v-list-item>
      </v-list>
    </v-menu>

  </v-toolbar>
  </v-col>
  <v-col>
    Roll my own
   <v-row fluid>
       <v-col :cols="12/toolList.length" v-for="t in toolList" :key="t.name" align-content-start justify-space-between>
       <v-card class="d-flex" color="green">
         <v-btn @click="$emit('toolclick',t.name)" small >{{ t.name }}</v-btn>  
       </v-card>
       </v-col>
      </v-row>
  </v-col>
</v-row>
</template>

<script>
export default {
    name:"baseTool",
    props:["toolList","toolbarName"],
}
</script>
