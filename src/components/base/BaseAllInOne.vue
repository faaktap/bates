<template>
 <v-container fluid>
     <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <v-text-field filled dense
                    class="ma-2" 
                    v-model="search" 
                    append-icon="mdi-close"
                   @click:append="search = ''"
                    placeholder="search"/>
      <v-btn class="ma-2" @click="addNew"> Add {{ entity }} </v-btn>
      <v-btn class="ma-2" @click="getData"> Refresh </v-btn>
      <v-btn class="ma-2" @click="showPrint = true"> Export </v-btn>
     </v-card>  
      <v-data-table
            :headers="tableHeader"
            :items="orDTTable" 
            :search="search"
            :items-per-page="30"
            :footer-props="{
               'items-per-page-options': [10, 20, 30, 40, 50]
             }"
            @click:row="clickOnTableRow"
      >
      </v-data-table>

  <v-dialog v-model="showAdd"  :fullscreen="$vuetify.breakpoint.mobile" max-width="600" width="auto">
   <v-card>
    <v-card-text class="ma-2 pa-2">
      <v-card color="light-blue" class="ma-4 pa-4"> 
          {{ entity }} Details ({{ updateMessage }})
          <v-btn small class="float-right" @click="save"> Save </v-btn>
      </v-card>
      <v-layout row wrap align-content-start justify-space-between class="ma-2 pa-2">       
       <v-col cols="12">
        <v-text-field dense v-model="activity.name" 
                      label="Name" :rules="rules.required" required />
       </v-col>
      </v-layout>
     </v-card-text>
   </v-card>
  </v-dialog> 

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
  props:{sqlUpdate:{type:Function, required:true},
         sqlInsert:{type:Function, required:true},
         sqlSelect:{type:Function, required:true},
         tableHeader:{type:Array, required:true},
         tableRecord:{type:Object, required:true},
         entity:{type:String},
         },
  components: {FrontJsonToCsv},
  data: () => ({
      rules: {
       required: [value => !!value || "Required."]
      },
      showAdd: false,
      showPrint:false,
      search:'',
      showPassword:false,
      orDTTable:[],
      updateMessage:'Create',
      activity:{id:'',name:''},
  }),
  computed: {
      formIsValid (u) {
        return (
          u.name
        )
      },  
  },
  methods:{
    clickOnTableRow(p1) {
      let index = this.orDTTable.findIndex(ele => ele.id == p1.id)
      this.edit(index)
    },
    getData () {
      this.showAdd = false
      zmlFetch({task: 'PlainSql'
               ,sql: this.sqlSelect()
               }, this.activityDone, this.loadError);
    },
    loadError(response) {
      errorSnackbar(response)
    },
    activityDone(response) {
      if (!response.constructor === Array) {
          errorSnackbar(response)
          this.orDTTable = []
          return
      }
      this.orDTTable = response
      this.$playSound()
    },
    edit(index) {
        this.updateMessage = 'Edit'
        this.activity = this.orDTTable[index]
        this.showAdd = true        
    },
    addNew() {
        this.updateMessage = 'Create'
        this.activity = {id:''
                        ,name:''}
        this.showAdd = true        
    },
    save() {
        if (!this.formIsValid(this.activity) ) {
          alert('form not valid yet')
          return
        }
        if (this.updateMessage == 'Create') {
            this.createNew(this.activity)
            return
        }
        this.saveSql(this.activity)
    },
    saveSql(u) {
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = this.sqlUpdate(u)
        zmlFetch(ts, this.getData, this.loadError);
    },
    createNew(u) {
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = this.sqlInsert(u)
        zmlFetch(ts, this.getData, this.loadError);
    }
  },
  mounted() {
      if (!this.orDTTable.lenght) {
          this.getData()
      }

  }
}
</script>
