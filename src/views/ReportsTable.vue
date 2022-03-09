<template>
 <v-container fluid>
     <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <v-text-field filled dense
                    class="ma-2"
                    v-model="search"
                    append-icon="mdi-close"
                   @click:append="search = ''"
                    placeholder="search"/>
      <v-btn class="ma-2" @click="showPrint = true"> Export </v-btn>
     </v-card>
      <v-data-table
            :headers="tableHeader"
            :items="orDTTable"
            :items-per-page="30"
            :footer-props="{
               'items-per-page-options': [10, 20, 40, 100]
             }"
      >
      </v-data-table>

<v-dialog v-model="showPrint" xwidth="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
  <front-json-to-csv v-if="orDTTable"
                   :json-data="orDTTable"
                   :csv-title="'onRoute App - ' + entity"
                   @hideModal="showPrint = false">
   <v-btn>
      Download with custom title
   </v-btn>
  </front-json-to-csv>
</v-dialog>

 </v-container>
</template>

<script>
import { zmlFetch } from '@/api/zmlFetch';
import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import { errorSnackbar } from "@/api/GlobalActions"
export default {
  name: "BaseAllInOneTable",
  props:{
         sqlSelect:{type:String, required:true},
         tableHeader:{type:Array, required:true},
         entity:{type:String},
         },
  components: {FrontJsonToCsv},
  data: () => ({
      rules: {
       required: [value => !!value || "Required."]
      },
      showPrint:false,
      search:'',
      showPassword:false,
      orDTTable:[],
      activity:{id:'',name:''},
  }),
  computed: {
  },
  methods:{
    getData () {
      this.showAdd = false
      zmlFetch({task: 'PlainSql'
               ,sql: this.sqlSelect
               }, this.activityDone, this.loadError);
    },
    loadError(response) {
      errorSnackbar('Error:' + JSON.stringify(response))
    },
    activityDone(response) {
      if (!response.constructor === Array) {
          errorSnackbar('Error:' + JSON.stringify(response))
          this.orDTTable = []
          return
      }
      this.orDTTable = response
      this.$playSound()
    },
  },
  mounted() {

  },
  watch:{
      sqlSelect() {
          if (this.sqlSelect) this.getData()
      }
  }

}
</script>
