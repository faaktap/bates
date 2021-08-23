<template>
  <v-select  @input="updateValue"
                  :value="value"
                  :label="label"         
                  :rules="reqrule ? rules.required : []" 
                  :items="itemList"
                  :item-text="itemText"
                  :item-value="itemValue"
                  :prepend-inner-icon="prependIcon"
                   dense outlined rounded shaped
                 >
  </v-select>  
</template>

<script>
export default {
   name:"ZSelect",
   props:{ 
           value:{}
         , label: {type:String,default:"Entry"}
         , type:  {type:String, default:"text"}
         , reqrule:  {type:Boolean, default: true}
         , itemList: {required:true}
         , itemText: {}
         , itemValue: {}
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
<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: rgba(192, 0, 250, 0.98);
}
</style>