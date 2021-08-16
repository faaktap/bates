<template>
<div>
<!--  w:{{ what }} <br>IA:{{ itemArr }} <br>S:{{ search }} <br>L:{{ asLabel}} -->
    <v-autocomplete class="mt-7 ml-8" 
        v-model="what"
        v-on:input="$emit('input', what)"
        v-if="itemArr && itemArr.length > 0"
        :value="searchText" 
        :search-input.sync="search" 
        :items="itemArr"         
        return-object 
        :label="asLabel">
       <!--template v-slot:item="data"-->
            <!--v-list-item-content style="align:left"> {{ itemDisplay }} </v-list-item-content-->
       <!--/template-->
    </v-autocomplete>
</div>
</template>


<script>
export default {
   name: "ArrayPickList",
   props: {itemArr: {type: Array,required:true} 
          ,asLabel: {type:String, default:'xxxx'} 
          ,initialValue: {type:String, default:''} 
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
      return this.itemArr[0] || ''
    },
  },
  methods: {      },
  watch: {  }
}
</script>