<template>
 <v-card elevation="6" class="pt-2 ma-4" style="overflow:hidden">
     <template v-if="updateMessage == 'Create' && dataTable.qty > 1">
       <v-card-title class="ma-7 pt-2 justify-center accent">
              you are    {{ updateMessage }}ing : a new entry
       </v-card-title>                  
     </template>
     <template v-else >
       <v-card-title class="ma-7 pt-2 justify-center accent">
              you are {{ updateMessage }}ing : {{ dataTable.name }}
       </v-card-title>
     </template>
    <v-card-text class="ma-2 pa-2 justify-center">
      <v-layout row wrap align-content-start justify-space-between class="ma-2 pa-2">       
       <v-col cols="12" sm="6">
         <z-text-field v-model="dataTable.name" 
                       label="Category Name" 
                       prependIcon="mdi-file-document"
                       :reqrule="true" />
       </v-col>
       <v-col cols="12" sm="2">
         <z-text-field v-model="dataTable.typeid" 
                       label="ID" 
                       type="number"
                       disabled />
       </v-col>
       <v-col cols="12" sm="4">
        <z-select v-model="dataTable.stocktype"
                 :itemList="['FREE','STOCK']"
                  label="Status" />                         

       </v-col>
       <v-col cols="12" sm="6">
         <z-auto-stock-cat v-model="dataTable.catid"
                           label="Category"
         />
       </v-col>         

      </v-layout>
     </v-card-text>       
     <v-card-actions class="ma-6 pa-2 accent green--text">
       <v-spacer />
       <template v-if="updateMessage == 'Create'">
          <v-btn  @click="$emit('save', dataTable,'create')"> Create </v-btn>
       </template>
       <template v-else>
          <v-btn @click="$emit('save', dataTable,'save')">  Save </v-btn>
       </template>
          <v-btn @click="$emit('cancel', dataTable,'cancel')"> Cancel </v-btn>
     </v-card-actions>

   </v-card>
      
</template>


<script>
import { getters } from "@/api/store"
import ZTextField from '@/components/fields/ZTextField.vue'
import ZSelect from '@/components/fields/ZSelect.vue'
import ZAutoStockCat from '@/components/fields/ZAutoStockCat.vue' 
export default {
  name: "TableFilterForm",
  //props:['updateMessage', 'dataTable','entity'],
  props:{ updateMessage:{}
         ,dataTable:{}
         ,entity:{} 
         ,editFieldDisplay:{default: "xxx"} 
  },
  components: { ZTextField
              , ZSelect
              , ZAutoStockCat
  },
  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      rules: { required: [value => !!value || "Required."] },
      testRadio:["Open","Close","Dead"],
      statusses:[{disabled: true,  divider: false,header: 'Some Heading'},
             {divider: true},
             {text: 'Open', value: 'Open'  },
             {divider: true},
             {text: 'Close', value: 'Close' }],

// see https://codepen.io/anon/pen/PEpaMM?editors=1011
// also https://stackoverflow.com/questions/56920390/setting-up-v-autocomplete-with-search-function#56920992
  }),
  computed: {
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