<template>
 <v-card elevation="6" class="pt-2 ma-4" style="overflow:hidden">
  <v-btn color="red" icon
         style="position: absolute; display: block; top: 0; right: -4;left: inherit;"
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

    <v-card-text class="mt-0 mb-0 pt-0 justify-center">
   <v-card color="red" class="ma-2 pa-2 text-center text-sm-body-1 text-md-h6"> {{ message }} </v-card>

   <form @submit="checkForm" id="TSF" v-on:keyup.enter="onEnter">
    {{  dataTable  }}
      <v-layout row wrap align-content-start justify-space-between class="ma-2 pa-2">
       <v-col cols="12" sm="12" md="4">
          <z-auto-item-type v-model="dataTable.typeid"
                           @select="typeWasSelected"
                           label="Type"
                           title="Click on magnify glass to peruse all types."
                           @moreHelp="showChoosy = true"
                           :reqrule="true"
          />
       </v-col>
       <v-col cols="12" sm="12" md="4">
         <z-text-field v-model="dataTable.name"
                       label="Stock Description"
                       title="You MUST fill in the field please!"
                       prependIcon="mdi-file-document"
                       :reqrule="true" />
                       <!-- updatemessage {{ updateMessage }} -->
       </v-col>
       <!-- <v-col cols="12" sm="4">
         <z-auto-deval v-model="dataTable.devalid"
                       label="Devaluation"
                       :reqrule="true" />

       </v-col> -->
       <v-col cols="12" md="4">
         <z-auto-place v-model="dataTable.placeid"
                      @select="ownerWasSelected"
                       label="Place/Class" />
       </v-col>

       <v-col cols="12" md="4">
         <z-text-field v-model="dataTable.quantity"
                       label="Quantity"
                       prependIcon="mdi-format-list-numbered"
                       type="number"
                       />
       </v-col>
       <v-col cols="12" sm="12" md="4">
         <z-auto-pers v-model="dataTable.originalownerid"
                      @select="placeWasSelected"
                       label="Owner"
         />
       </v-col>
       <v-col v-if="dataTable.devalid != 3" cols="12" md="4">
         <z-text-field v-model="dataTable.serialno"
                       label="Serial"
                       prependIcon="mdi-serial-port"
                       :reqrule="false" />

       </v-col>
       <v-col v-if="dataTable.devalid != 3" cols="12" md="4">
         <z-text-field v-model="dataTable.price"
                       label="Price"
                       prependIcon="mdi-dollar"
                       :reqrule="false" />

       </v-col>

       <v-col cols="12" md="4">
         <z-textarea v-model="dataTable.description"
                     label="Description" />
       </v-col>
       <v-col cols="12" md="4">
          <z-auto-deval v-model="dataTable.devalid"
          label="Devaluation"
          :reqrule="true" />
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
<v-dialog v-model="showChoosy"  width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
     <choosy v-model="dataTable.typeid"
             @objectSelected="showChoosy = false" />
</v-dialog>
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
              , ZAutoDeval
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
      this.message  = 'All good!'
      if (this.updateMessage.toLowerCase() == 'create' || this.updateMessage.toLowerCase() == 'edit') {
        if (!this.dataTable.typeid) {
           this.message  = 'At least select a type!'
           return false
        }
        if (!this.dataTable.name) {
           this.message  = 'Please type something in the Stock Description field'
           return false
        }
        if (parseInt(this.dataTable.quantity) == 0) {
           this.message  = 'The quantity must be filled in' + parseInt(this.dataTable.quantity)
           return false
        }
        if (this.dataTable.devalid != 3 && parseInt(this.dataTable.price) == 0) {
            this.message  = 'The price must be filled in,' + parseInt(this.dataTable.price) + ',' +this.dataTable.price
            return false
        }
        if (this.dataTable.devalid != 3 && !this.dataTable.serialno) {
            this.message  = 'The serialno must be filled in'
            return false
        }
      }
      return true
    },
    typeWasSelected(e) {
      //this.dataTable.name = e.trim()
      console.log(e.trim())
      if (this.getZml.devalList.includes(this.dataTable.typeid)) {
        this.dataTable.devalid = 3
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
      console.log('checking form...', e)

      if(e == 'Cancel') {
        this.$emit(e.toLowerCase(), this.dataTable,e.toLowerCase())
        return
      }

      if (this.checkForm(e)) {
        this.$emit(e.toLowerCase(), this.dataTable,e.toLowerCase())
      } else {
        console.log('something still missing')
      }
      return
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