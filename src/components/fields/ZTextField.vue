<template>
  <v-text-field  @input="updateValue"
                  :value="value"
                  :label="label"         
                  :rules="reqrule ? rules.required : []" 
                  :type="type"
                  :disabled="disabled"
                  :prepend-inner-icon="prependIcon"
                   dense outlined rounded shaped
                 >
    
  </v-text-field>                      
</template>

<script>
export default {
   name:"ZTextField",
   props:{ 
           value:{}
         , label: {type:String,default:"Entry"}
         , type:  {type:String, default:"text"}
         , reqrule:  {type:Boolean, default: true}
         , disabled:  {type:Boolean, default: false}
         , prependIcon: {}
   },
   data: () => ({
     rules: { required: [value => !!value || "This is a required field."] },
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
