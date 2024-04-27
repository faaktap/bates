<template>
 <v-card elevation="6" class="pt-2 ma-4" style="overflow:hidden">
  <v-btn color="red" icon
         style="position: absolute; display: block; top: 0; right: 0;left: inherit;"
         @click="$emit('cancel',dataTable,'cancel')">
         X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
       <v-col cols="12" sm="6">
         <z-text-field v-model="dataTable.name"
                       label="Category Name"
                       prependIcon="mdi-file-document"
                       style="text-transform: uppercase;"
                       :reqrule="true" />
       </v-col>
       <v-col cols="12" sm="2">
         <z-text-field v-model="dataTable.catid"
                       label="ID"
                       type="number"
                       disabled />
       </v-col>
       <v-col cols="12" md="12">
        <z-textarea v-model="dataTable.description"
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
import ZTextField from '@/components/fields/ZTextField.vue'
import ZTextarea from '@/components/fields/ZTextarea.vue'
import ZBaseTool from '@/components/base/ZBaseTool.vue'
export default {
  name: "TableFilterForm",
  props:{ updateMessage:{}
         ,dataTable:{}
         ,entity:{}
         ,editFieldDisplay:{default: "xxx"}
  },
  components: { ZTextField
              , ZTextarea
              , ZBaseTool
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