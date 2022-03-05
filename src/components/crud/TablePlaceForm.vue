<template>
 <v-card elevation="6" class="pt-2 ma-4" style="overflow:hidden">

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
       <v-col cols="12" sm="4">
         <z-text-field v-model="dataTable.name"
                       label="Room/Place Name"
                       prependIcon="mdi-file-document"
                       :reqrule="true" />
       </v-col>
       <v-col cols="12" sm="4">
         <z-auto-work-area v-model="dataTable.workareaid"
                       label="Workarea" />
       </v-col>
       <v-col cols="12" sm="4">
         <z-auto-pers v-model="dataTable.ownerid"
                       label="Owner" />
       </v-col>
       <v-col cols="12" sm="2">
         <z-text-field v-model="dataTable.placeid"
                       label="ID"
                       type="number"
                       disabled />
       </v-col>


       <v-col cols="12" sm="6">
      <!--   <z-auto-stock-cat v-model="dataTable.catid"
                           label="Category"
         -->
       </v-col>

       <v-col cols="12" sm="8">
         <z-textarea v-model="dataTable.description"
                       label="Description" />
       </v-col>
       <v-col cols="12" sm="4">
        <z-select v-model="dataTable.function"
                 :itemList="['Teach','Support','Other']"
                  label="Function" />

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
import ZTextField from '@/components/fields/ZTextField.vue'
import ZSelect from '@/components/fields/ZSelect.vue'
import ZTextarea from '@/components/fields/ZTextarea.vue'
import ZAutoPers from '@/components/fields/ZAutoPers.vue'
import ZAutoWorkArea from '@/components/fields/ZAutoWorkArea.vue'
import ZBaseTool from '@/components/base/ZBaseTool.vue'

export default {
  name: "TableFilterForm",
  props:{ updateMessage:{}
         ,dataTable:{require:true}
         ,entity:{}
         ,editFieldDisplay:{default: "xxx"}
  },
  components: { ZTextField
              , ZSelect
              , ZBaseTool
              , ZAutoPers
              , ZTextarea
              , ZAutoWorkArea
  },
  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      rules: { required: [value => !!value || "Required."] },
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