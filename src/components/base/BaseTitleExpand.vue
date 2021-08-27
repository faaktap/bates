<template>
 <v-expansion-panels rounded class="pa-0 mb-2">
   <v-expansion-panel>
    <v-expansion-panel-header  color="green">
         <h1 class="heading-1 text-center">{{ heading }}</h1>
     </v-expansion-panel-header>
     <v-expansion-panel-content class="ma-4">
         <slot>
         <p class="heading-4">{{ heading}} </p>
         <div v-html="explanation">
         </div>
         </slot>    
     </v-expansion-panel-content>
    </v-expansion-panel>
 </v-expansion-panels>

</template>

<script>
export default {
    name:"BaseTitleExpansion",
    props:{heading: {default:"my heading"}
          ,explanation: {default:"Some explanation with <b>html</b> and maybe later pictures" }
    },
    methods:{},
    mounted() {
        console.log('starting ', this.$options.name)
    }
}
</script>