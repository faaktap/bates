<template>
  <v-checkbox @change="updateValue"
                  :value="value"
                  :ccclabel="label"  
                  :prepend-icon="prependIcon"   
                   class="mt-1">
    <template v-slot:label>
      <!--v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                target="_blank"
                href="https://vuetifyjs.com"
                @click.stop
                v-on="on"
              >
                Help
              </a>
            </template>
            Opens in new window
      </v-tooltip-->
          {{ label }} 
    </template>
  </v-checkbox>
</template>

<script>
export default {
   name:"ZCheckbox",
   props:{ 
           value:{}
         , label: {type:String,default:"RadioSelect"}
         , prependIcon:{}
   },
   data: () => ({
     
   }),
  methods:{
    updateValue(e) {
      //on checkbox you use "change" event, not "input" event to get the changed value passed back
      console.log('checkbox = ',e)
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