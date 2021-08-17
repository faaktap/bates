<template>
<div>
 <v-text-field dense 
          :label="label"         
          :value="value"
           append-icon="mdi-calendar"
          @focus="showDate = !showDate"
          @click:append="showDate = !showDate"
          v-on:input="updateValue($event)"
          :required="required"
          />
          <v-card elevation-6 v-if="showDate">
           <v-date-picker dense
                   picker-date
                   no-title
                   close-on-content-click
                   @change="showDate = false"
                   v-on:input="updateValue($event)"
                   :value="value">
           </v-date-picker>
          </v-card>
</div>
</template>
          
<script>
//https://paulund.co.uk/use-v-model-on-custom-vue-component
//NB Werner!!! https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
//https://vuejs.org/v2/guide/forms.html
import { infoSnackbar } from "@/api/GlobalActions"
export default {
  name: "BaseDate",
  props:{ label: {    type: String      },
          value: {    type: String },
          required: { type: Boolean,  default: false},
          instructions: {type: String, default:""}
        },
  data: () => ({
    showDate: false,
    current:{dd:0, mm:0, yyyy:0}
  }),
  methods:{
    checkIfInFuture(dte) {
      console.log(this.instructions)
      if (this.instructions == 'FA') return 0;
      console.log(this.instructions)
      let selected = {}
      selected.yyyy= dte.substr(0,4)
      selected.mm = dte.substr(5,2)
      selected.dd = dte.substr(8,2)
      if (selected.yyyy > this.current.yyyy) return 1;
      if (selected.mm > this.current.mm) return 1;
      if (selected.dd > this.current.dd) return 1;
      return 0
    },
    updateValue: function (pvalueT) {
      if (this.checkIfInFuture(pvalueT)) {
        infoSnackbar('RW - Not allowed to choose date in future.')
        this.$emit('input', this.current.yyyy + '-' + this.current.mm + '-' + this.current.dd)
        return
      }
      this.showDate = false
      this.$emit('input', pvalueT)
    }
  },
  mounted() {
    let today = new Date()
    this.current.dd = String(today.getDate()).padStart(2, '0');
    this.current.mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    this.current.yyyy = today.getFullYear();
  }
};
</script>          