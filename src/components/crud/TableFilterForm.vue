<template>
 <v-card elevation="6" class="pt-2 ma-4" style="overflow:hidden">
  <v-btn color="red" icon
         style="position: absolute; display: block; top: 0; right: 0;left: inherit;"
         @click="$emit('cancel',dataTable,'cancel')">
         X
   </v-btn>
   <v-card-text>
     <z-base-tool :toolList='[{name: buttonText, icon:"mdi-content-save"}
                             ,{name: "Cancel", icon:"mdi-location-exit"}]'
            color="accent"
            dark="true"
            @toolclick="listenToToolbar">
            {{ updateText }}
     </z-base-tool>
    </v-card-text>

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
   <v-card-text>

     <z-base-tool :toolList='[{name: buttonText, icon:"mdi-content-save"}
                             ,{name: "Cancel", icon:"mdi-location-exit"}]'
            color="accent"
            dark="true"
            @toolclick="listenToToolbar">
            {{ updateText }}
     </z-base-tool>
    </v-card-text>

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
import ZBaseTool from '@/components/base/ZBaseTool.vue'
export default {
  name: "TableFilterForm",
  //props:['updateMessage', 'dataTable','entity'],
  props:{ updateMessage:{}
         ,dataTable:{require:true}
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
              , ZBaseTool
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
  }),
  computed: {
    buttonText() {
      if (this.updateMessage.toLowerCase() == 'create') return "Create"
      if (this.updateMessage.toLowerCase() == 'edit') return "Save"
      return "notSure"
    },
    updateText() {
      if (this.updateMessage.toLowerCase() == 'create') return `Busy creating : a new entry`
      if (this.updateMessage.toLowerCase() == 'edit') {
          return `Busy editing : "${this.editFieldDisplay}"`
      } else {
          return `Busy "${this.updateMessage}" : ${this.editFieldDisplay} for ${this.entity}`
      }
    }
  },
  methods:{
    listenToToolbar(e) {
      this.$emit(e.toLowerCase(), this.dataTable,e.toLowerCase())
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