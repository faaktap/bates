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

    <v-card-text class="mt-0 mb-0 pt-0 justify-center">

      <v-layout row wrap align-content-start justify-space-between class="ma-2 pa-2">       
       <v-col cols="12" sm="4">
          <z-auto-item-type v-model="dataTable.typeid"
                           @select="typeWasSelected"
                           label="Type"
          />
       </v-col>                  
       <v-col cols="12" sm="4">       
         <z-text-field v-model="dataTable.name" 
                       label="Stock Name" 
                       prependIcon="mdi-file-document"
                       :reqrule="true" />
       </v-col>
       <v-col cols="12" sm="4">
         <z-auto-deval v-model="dataTable.devalid" 
                       label="Devaluation" 
                       :reqrule="true" />

       </v-col>
       <v-col v-if="dataTable.devalid != 3" cols="12" sm="4">
         <z-text-field v-model="dataTable.serialno" 
                       label="Serial" 
                       prependIcon="mdi-serial-port"
                       :reqrule="false" />

       </v-col>
       <v-col cols="12" sm="4">
         <z-auto-place v-model="dataTable.placeid" 
                      @select="ownerWasSelected" 
                       label="Place/Class" />
       </v-col>       

       <v-col cols="12" sm="4">
         <z-text-field v-model="dataTable.quantity" 
                       label="Quantity" 
                       prependIcon="mdi-format-list-numbered"
                       type="number"
                       />
       </v-col>
       <v-col cols="12" sm="4" md="4">
         <z-auto-pers v-model="dataTable.originalownerid"
                      @select="placeWasSelected"
                       label="Owner" 
         />
       </v-col>             
       <v-col cols="12" sm="4">
         <z-textarea v-show="!dataTable.devalid == 3"
                     v-model="dataTable.description" 
                     label="Description" />
       </v-col>          
       <v-col v-show="dataTable.devalid != 3" cols="12" sm="4">
         <z-text-field v-model="dataTable.price" 
                       label="Price" 
                       prependIcon="mdi-currency-sign"
                       type="number"
                       />
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
import ZAutoPers from '@/components/fields/ZAutoPers.vue'
import ZAutoPlace from '@/components/fields/ZAutoPlace.vue'
import ZAutoItemType from '@/components/fields/ZAutoItemType.vue'
import ZAutoDeval from '@/components/fields/ZAutoDeval.vue'
import ZBaseTool from '@/components/base/ZBaseTool.vue'

export default {
  name: "TableFilterForm",
  props:{ updateMessage:{}
         ,dataTable:{require:true}
         ,entity:{} 
         ,editFieldDisplay:{default: "xxx"} 
  },
  components: { ZTextField
              , ZBaseTool
              , ZAutoPers
              , ZAutoPlace
              , ZTextarea
              , ZAutoItemType
              , ZAutoDeval
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
    typeWasSelected(e) {
      console.log('getting a type', e)
      if (e && !this.dataTable.name) {
        this.dataTable.name = e
      }
    },
    placeWasSelected(e) {
      console.log('getting a place', e)
      if (e && !this.dataTable.placeid) {
        this.dataTable.placeid = e
      }
    },
    ownerWasSelected(e) {
      console.log('getting a owner', e)
      if (e && !this.dataTable.originalownerid) {
        this.dataTable.originalownerid = e
      } else {
        console.log('we already have a owner :' ,this.dataTable.originalownerid)
      }
    },
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
  border-color: rgba(128, 91, 139, 0.719);
}
</style>