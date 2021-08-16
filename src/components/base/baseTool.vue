<template>
<v-row>
  <v-col cols=12>
  <v-toolbar flat color="primary" class="mb-4">
    <v-toolbar-title  v-if="toolbarName"> 
      {{ toolbarName }}
    </v-toolbar-title>
    <v-spacer />
     <v-menu v-if="!$vuetify.breakpoint.mdAndUp && toolList.length">
       <v-spacer />
       <template v-slot:activator="{ on, attrs }">
        <v-spacer />
        <v-btn v-bind="attrs" v-on="on"> menu </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="t in toolList" :key="t.name">
           <v-btn @click="$emit('toolclick',t.name)" flat dense small class="ma-2 pa-2" > {{ t.name }}
           </v-btn>  
        </v-list-item>
      </v-list>
      </v-menu>
    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp && toolList.length" class="ma-2 pa=2">
      <v-spacer />.
      <v-row >
       <v-col :cols="12/toolList.length" v-for="t in toolList" :key="t.name">
         <v-btn @click="$emit('toolclick',t.name)" dense small class="ma-2 pa-2">{{ t.name }}</v-btn>  
       </v-col>
      </v-row>
    </v-toolbar-items>
  </v-toolbar>
  </v-col>
</v-row>
</template>

<script>
export default {
    name:"baseTool",
    props:["toolList","toolbarName"],
}
</script>
