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
       <v-col cols="12" sm="6"  md="4">
         <z-text-field v-model="dataTable.description" 
                       label="Item(Desc)" 
                       prependIcon="mdi-star-face"
                       :reqrule="true" />
       </v-col>
       <v-col cols="12" sm="6" md="4">
         <z-text-field v-model="dataTable.id" 
                       label="ID" 
                       type="number"
                       prependIcon="mdi-baby-face-outline"
                       :reqrule="true" />
       </v-col>
       <v-col cols="6"  md="4">
        <z-select v-model="dataTable.status"
                   prependIcon="mdi-digital-ocean"
                  :itemList="statusses"
                  itemText="text"
                  itemValue="value"
                  label="Status" />    
        <z-select v-model="dataTable.description"
                 :itemList="['aaa','bbb']"
                  label="Status" />                         
       </v-col>
       <v-col cols="6" md="4">
        <z-select v-model="dataTable.description"
                  :itemList="getZml.persMenemonic"
                  itemText="user_fullname"
                  itemValue="user_id"
                  label="Personel"/>        
                  {{ dataTable.description }}
       </v-col>
       <v-col cols="12" sm="6" md="4">
        <z-checkbox v-model="dataTable.check"
                    prependIcon="mdi-wifi-strength-alert-outline"
                  label="MyCheck"/>
       </v-col>
       <v-col cols="12" md="4">
           <z-radio v-model="dataTable.status"
                    label="Status"  
                   :radioList="testRadio"
                   :column="true"
           />
       </v-col>       
       <v-col cols="12" sm="6" md="4">
         <z-auto-pers v-model="dataTable.description"
                       label="Select" />
       </v-col>       
       <v-col cols="12" md="4">
           <base-date v-model="dataTable.bdate" 
                      instructions="FA" 
                      dense outlined rounded shaped
                      label="Some Date" />
       </v-col>
       <v-col cols="12" md="6">
        <z-textarea v-model="dataTable.description"
                    label="Note" />

        <v-textarea v-model="dataTable.description"
                    dense outlined rounded shaped
                    label="Note" />
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
import BaseDate from '@/components/base/BaseDate.vue'
import ZTextField from '@/components/fields/ZTextField.vue'
import ZSelect from '@/components/fields/ZSelect.vue'
import ZAutoPers from '@/components/fields/ZAutoPers.vue'
import ZRadio from '@/components/fields/ZRadio.vue'
import ZCheckbox from '@/components/fields/ZCheckbox.vue'
import ZTextarea from '@/components/fields/ZTextarea.vue'
export default {
  name: "TableFilterForm",
  //props:['updateMessage', 'dataTable','entity'],
  props:{ updateMessage:{}
         ,dataTable:{}
         ,entity:{} 
         ,editFieldDisplay:{default: "xxx"} 
  },
  components: { BaseDate
              , ZTextField
              , ZTextarea
              , ZSelect
              , ZAutoPers
              , ZRadio
              , ZCheckbox
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