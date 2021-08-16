<template>
   <!--
       import AutoSelObj from '@/components/AutoSelObj.vue'
       Use and object with id and name, the select object will be returned to v-model
       only name will be dispplayed
          <auto-sel-obj 
             asLabel="Select your Fruit!" 
            :initialValue="selectedFruitNo" 
            :itemObj="fruitObject"    array of objects
             v-model="selectedFruitNo" >
         </auto-sel-obj>
   -->

    <v-autocomplete 
        v-model="what"
        v-on:input="$emit('input', what)"
        v-if="itemObj && itemObj.length > 0"
        :value="searchText"
        :search-input.sync="search"
        :items="itemObj"
        :item-text="itemDisplay"
        item-value="name"
        return-object
        :label="asLabel">
    </v-autocomplete> <!--//return-object -->

</template>


<script>
export default {
   name: "ObjectPickList",
   props: {itemObj: {type: Array,required:true} 
          ,asLabel: {type:String, default:'xxxx'} 
          ,initialValue: {default:1} 
          },
   data: () => ({
    search: null,
    what: null,
  }),
  mounted() { 
     this.what = this.initialValue
   },
  computed: {
    searchText() {
      return this.itemObj[0] || ''
    },
    itemDisplay() {
        //return "this.itemToShow";
        this.$emit("dataEntered",1)
        return "name"
    }
  },
  methods: {      },
  watch: {  }
}
</script>