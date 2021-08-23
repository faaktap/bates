<template>
<!-- Peculiarity : cannot define in component - must be array definition in data!
-->
  <v-radio-group @input="updateValue"
                  :value="value"
                  :label="label"     
                  :column="column"
                   prepend-icon="mdi-radio"
                   class="mt-1">
      <v-radio v-for="rb in Array.from(radioList)"
              :key="rb"
              :label="rb"
              :value="rb">
      </v-radio> 
  </v-radio-group>
</template>

<script>
export default {
   name:"ZRadio",
   props:{ 
           value:{}
         , label: {type:String,default:"RadioSelect"}
         , radioList: {type:Array, required:true}
         , column: {type:Boolean, default:true}
   },
   data: () => ({
     
   }),
  methods:{
    updateValue(e) {
      this.$emit('input', e)
    }
  },
  mounted() {
     console.log('Start' , this.$options.name)
  }
}
</script>
