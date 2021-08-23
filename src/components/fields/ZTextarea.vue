<template>
  <v-textarea  @input="updateValue"
                  :value="value"
                  :label="label"         
                  :rules="reqrule ? rules.required : []" 
                  :type="type"
                   dense outlined rounded shaped
                 >
                 <!--:rules="reqrule || rules.required" -->    
  </v-textarea>
</template>

<script>
export default {
   name:"ZTextarea",
   props:{ 
           value:{}
         , label: {type:String,default:"TextEntry"}
         , type:  {type:String, default:"text"}
         , reqrule:  {type:Boolean, default: false}
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
