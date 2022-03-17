 <template>
 <div>
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
   <v-card color="red"> {{ message }} </v-card>
   <form @submit="checkForm" id="TSF" v-on:keyup.enter="onEnter">
      <v-layout row wrap align-content-start justify-space-between class="ma-2 pa-2">
       <v-col cols="12" sm="4">
          <z-auto-item-type v-model="dataTable.typeid"
                           @select="typeWasSelected"
                           label="Type"
                           @moreHelp="showChoosy = true"
          />
       </v-col>
       <v-col cols="12" sm="4">
         <z-text-field v-model="dataTable.name"
                       label="Stock Name"
                       title="You may leave this blank"
                       prependIcon="mdi-file-document"
                       :reqrule="true" />
       </v-col>
       <!-- <v-col cols="12" sm="4">
         <z-auto-deval v-model="dataTable.devalid"
                       label="Devaluation"
                       :reqrule="true" />

       </v-col> -->
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
   </form>
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

<!------------------ CHOOSY ------------------------------------------->
   </v-card>
<v-dialog v-model="showChoosy"  width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
     <choosy v-model="dataTable.typeid"
             @objectSelected="showChoosy = false" />
</v-dialog>

</div>
</template>


<script>
import { getters } from "@/api/store"
import ZTextField from '@/components/fields/ZTextField.vue'
import ZTextarea from '@/components/fields/ZTextarea.vue'
import ZAutoPers from '@/components/fields/ZAutoPers.vue'
import ZAutoPlace from '@/components/fields/ZAutoPlace.vue'
import ZAutoItemType from '@/components/fields/ZAutoItemType.vue'
//import ZAutoDeval from '@/components/fields/ZAutoDeval.vue'
import ZBaseTool from '@/components/base/ZBaseTool.vue'

import Choosy from '@/views/Choosy.vue'

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
              , Choosy
//            , ZAutoDeval
  },
  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      showChoosy:false,
      rules: { required: [value => !!value || "Required."] },
      message: ''
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
    checkForm(e) {
      console.log('Check Form : ' , e)
      if (e == 'Save' || e == 'Create') {
        if (!this.dataTable.typeid) {
           this.message  = 'At least select a type!'
           return false
        }
        if (parseInt(this.dataTable.quantity) == 0) {
           this.message  = 'The quantity must be filled in'
           return false
        }
        if (this.dataTable.devalid == 3) {
          if (parseInt(this.dataTable.price) > 0) {
            this.message  = 'The price must be filled in'
            return false
          }
        } else {
          // console.log(this.dataTable.serialno , parseInt(this.dataTable.price) , this.dataTable.quantity)
          // console.log(!this.dataTable.serialno , !(parseInt(this.dataTable.price) > 0) , !this.dataTable.quantity)
          if (!this.dataTable.serialno || !(parseInt(this.dataTable.price) > 0) || !this.dataTable.quantity) {
            this.message  = 'The serialno, price and quantity must be filled in'
            return false
          }
        }
      }
      return true
    },
    typeWasSelected(e) {
      this.dataTable.name = e.trim()
      // if (e) {
      //   let snap = e.indexOf('/')
      //   if (snap) {
      //     this.dataTable.name = e.slice(0,snap).toLowerCase()
      //   } else {
      //     this.dataTable.name = e.toLowerCase()
      //   }
      // }
      if (this.getZml.devalList.includes(this.dataTable.typeid)) {
        this.dataTable.devalid = 1
      }
    },
    placeWasSelected(e) {
      console.log('getting a place', e)
      if (e && !this.dataTable.placeid) {
        this.dataTable.placeid = e
      }
    },
    ownerWasSelected(e) {
      console.log('getting a owner', e, this.dataTable.originalownerid)
      if (e) { // } && this.dataTable.originalownerid == '') {
        this.dataTable.originalownerid = e
      } else {
        console.log('we already have a owner :' ,this.dataTable.originalownerid)
      }
    },
    onEnter() {
      this.listenToToolbar ('Save')
    },
    listenToToolbar(e) {
      if (this.checkForm(e))
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