<template>
 <v-container fluid>
   rh - {{ reportHeader }}
     <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
     <v-btn class="ma-2" @click="showPrint = true"> Export </v-btn>
     </v-card>
      <v-data-table
            :headers="labels"
            :items="orDTTable"
            :items-per-page="30"
            :footer-props="{
               'items-per-page-options': [20, 50, 100]
             }"
      >
      </v-data-table>

<v-dialog v-model="showPrint" xwidth="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
  <front-json-to-csv v-if="orDTTable"
                   :json-data="orDTTable"
                   :csv-title="reportHeader"
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
  name: "TableReport",
  props:{
         sqlSelect:{type:String, required:true},
         reportHeader:{type:String, default:"reportHeader"},
         entity:{type:String},
         },
  components: {FrontJsonToCsv},
  data: () => ({
      showPrint:false,
      orDTTable:[],
      labels:[]
  }),
  computed: {
  },
  methods:{
    getData () {
      console.log(this.$options.name,'getdata', this.sqlSelect)
      zmlFetch({task: 'PlainSql'
               ,sql: this.sqlSelect
               }, this.activityDone, this.loadError);
    },
    loadError(response) {
      console.log(this.$options.name,'errdata', this.sqlSelect)
      errorSnackbar('Error:' + JSON.stringify(response))
    },
    activityDone(response) {
      console.log(this.$options.name,'done', this.sqlSelect)
      if (!response.constructor === Array) {
          errorSnackbar('Error:' + JSON.stringify(response))
          this.orDTTable = []
          return
      }
      this.orDTTable = response
      console.log('our length is ', this.orDTTable.length )
      if (this.orDTTable.length) {
         this.$playSound()
         this.buildHeaders()
      }
    },
    buildHeaders() {
      console.log('start build headers')
      Object.keys(this.orDTTable[0]).forEach(ele => {
        console.log(ele)
        this.labels.push( {text:ele, value:ele} )
      })
    }

  },
  mounted() {
    console.log('started ', this.$options.name)
      if (this.sqlSelect) this.getData()
  },
  watch:{
      sqlSelect() {
        console.log(this.$options.name,'watchers', this.sqlSelect)
          if (this.sqlSelect) this.getData()
      }
  }

}
</script>
