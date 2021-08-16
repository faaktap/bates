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

How does this work?
1. We receive a number in initial value.
2. We lookup the id for that number in watch or mount
3. We load "what" with that object value
4. This get's display in the v-slot:selection
5. (in 4 we used itemDisplay function to display correct info)     
6. When user click on one, we return the id.
A. The search function, use the itemdisplay to get data to display in dropdown
   -->
 <div v-if="itemObj && itemObj.length > 0">
   <!-- filled, outlined,solo, solo-inverted, flat-->
    <v-autocomplete 
        cache-items
        clearable
        open-on-clear
        message
        v-model="what"
        v-on:input="$emit('input', what)"
        :value="searchText"
        :search-input.sync="search"
        :items="itemObj"
        :item-text="itemDisplay"
        item-value="subjectid"
        xxreturn-object
        :label="asLabel">
<!-- 
    ItemDisplay is beter as om slots te gbuik agv auto-focus. 
    as jy return-object gee, word die hele object return
    as jy item-value = subjectid gee, word net subjectid return
    dan is display effens van 'n probleem...

-->
<!-- HTML that describe how select should render selected items
  <template v-slot:selection="data">
    sel item {{ data.itemObj }}
  </template> -->
<!-- HTML that describe how select should render items when the select is open 
  <template v-slot:item="data">
    
    open {{ data.itemObj.shortname }}
  </template>-->  
    </v-autocomplete> <!--//return-object -->

</div>
</template>


<script>
export default {
   name: "SubObjectPickList",
   props: {itemObj: {type: Array,required:true} 
          ,asLabel: {type:String, default:'xxxx'} 
          ,initialValue: {default:1} 
          },
   data: () => ({
    search: null,
    what: null,
  }),
  mounted() { 
    //this.what = this.itemObj.find(item => item.id == this.initialValue)
     this.what = this.initialValue
   },
  computed: {
    searchText() {
      return this.itemObj[0] || ''
    },
    itemDisplay() {
        //return "this.itemToShow";
        return item => item.shortname + ' — ' + item.description
    }
  },
  methods: {      },
  watch: { 
    initialValue() {
       this.what = this.itemObj.find(item => item.id == this.initialValue)
    }
   }
}
</script>