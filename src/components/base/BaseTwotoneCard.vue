<template>
<!-- Basic Example 
  <base-twotone-card class="ma-2" >
    Stuff for degault slot
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
-->  
<v-card class="mx-auto" color="green" max-width="800" rounded="xl" elevation="6">
  <v-row class="mx-0" style="overflow:hidden;">
    <v-col cols="6" class="orange">
      <div class="fill-height d-flex justify-center align-center">
          <slot>Fallback Lefthand side title</slot>
      </div>
    </v-col>
    <v-col cols="6">
      <v-card-title>  
        <slot name="header"> 
            Header 
        </slot> 
      </v-card-title>
      <v-card-text> 
        <slot name="text"> 
            text
        </slot>
      </v-card-text>
      <v-card-actions> 
        <slot name="actions"> 
            Actions 
        </slot>
       </v-card-actions>
    </v-col>
  </v-row>
</v-card>
</template>
