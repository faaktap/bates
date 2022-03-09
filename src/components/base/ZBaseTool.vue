<template>
<v-container fluid>
  <v-card dense :color="color" class="mb-1">
   <v-row class="ma-1">
    <v-col cols="6">
      <div class="ml-1 v-toolbar__title">
         <slot>Fallback toolbar message (use the slot!) </slot>
       </div>
    </v-col>
    <v-spacer />
    <v-col cols="6"
           class="row wrap text-center d-flex justify-end align-center">
     <div v-if="$vuetify.breakpoint.smAndUp && toolList.length">

        <v-tooltip v-for="t in toolList"
                  :key="t.name"
                  :disabled="!t.tip"
                   bottom>

         <template v-slot:activator="{ on, attrs }">

         <v-btn @click.stop="$emit('toolclick',t.name)"
                :color="color + ' darken-1'"
                small
                class="mt-1 mr-2"
                v-bind="attrs"
                v-on="on">

           <v-icon v-if="t.icon"
                   small
                   class="mr-2 justify-content-end">
              {{ t.icon}}
           </v-icon>

             {{ t.name }}

         </v-btn>
         </template>
         <span v-if=t.tip>{{ t.tip }}</span>
        </v-tooltip>

     </div>

    <v-menu xv-if="!$vuetify.breakpoint.smAndUp && toolList.length"
            v-if="toolList.length"
            absolute
            offset-y>
       <v-spacer />
        <v-spacer />
       <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on"> mdi-dots-vertical</v-icon>
      </template>

      <v-list>
        <v-list-item v-for="t in toolList" :key="t.name">
           <v-btn @click.stop="$emit('toolclick',t.name)" text dense small class="ma-2 pa-2" >
             {{ t.name }}
           </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    </v-col>
    </v-row>
  </v-card>
</v-container>
</template>

<script>
export default {
    name:"ZBaseTool",
    props:{toolList :     {type: Array, default: () => {
                                          return [{name:"A Button", tip:"A Tip", icon:"mdi-close"}]
                                          }}
          ,color :        {default:"secondary"}
          },
    computed:{
        xdefBut() {
            return [{button:"A Button", tip:"A Tip", icon:"mdi-close"}]
        }
    },
    methods:{}
}
</script>
