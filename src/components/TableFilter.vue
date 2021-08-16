<template>
 <v-container fluid> 
     <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <base-search @clear="search=''" v-model="search" />
      <v-btn class="ma-2" @click="addNewBate"> Add Order</v-btn>
      <v-btn class="ma-2" @click="getData"> Refresh </v-btn>
      <v-btn class="ma-2" @click="showTablePrint = true"> Export </v-btn>
     </v-card>
       <v-row justify="space-around" class="row wrap" color="green">
         <v-card v-for="s in bateType" :key="s.id" class="mb-2">
           <v-switch v-model="s.switch"
                    hide-details
                    class="mt-1 mr-2 mb-2 ml-2"
                    :label="s.type" >
           </v-switch>
         </v-card>
       </v-row>

     <v-row>
       <v-col cols="12">
         <v-card  elevation-6>
           <v-data-table v-if="orTable.length"
                 :headers="orTableHeader"
                 :items="orTableFilter"
                 :search="search"
                 :items-per-page="30"
                 :footer-props="{
                    'items-per-page-options': [10, 20, 30, 40, 50]
                  }"
                 @click:row="clickOnTableRow"
           >
           </v-data-table>
         </v-card>
       </v-col>
     </v-row>

  <v-dialog v-model="showAddTable"  :fullscreen="$vuetify.breakpoint.mobile" width="auto">
   <v-card>
    <v-card-text class="ma-2 pa-2">
       <template v-if="updateMessage == 'Create' && Table.qty > 1">
           werwerwewer
       </template>
       <template v-else>
           ewr else rewert
        />                      
       </template>
      <v-layout row wrap align-content-start justify-space-between class="ma-2 pa-2">       
       <v-col cols="12"  md="6">
        <v-text-field dense v-model="Table.item" 
                      label="Item" :rules="rules.required" required />
       </v-col>
       <v-col cols="12"  md="6">
        <v-text-field dense v-model="Table.qty" 
                      label="Qty" :rules="rules.required" required />
       </v-col>
       <v-col cols="6" md="4">
        <v-select dense
          v-model="Table.id"
          :items="getZml.Tablestatus"
          item-text="description"
          item-value="id"
          label="Status"
          required
        />                              
       </v-col>       

       <!--v-col cols="12" md="4">
        <v-text-field dense v-model="Table.salesorderno" 
                      label="Sales Order No" 
                      :rules="rules.required" required />
       </v-col-->       
       <v-col cols="12" md="4">
           <base-date v-model="Table.name" 
                      instructions="FA" 
                      label="Initial Deliver Date" />
       </v-col>
       <v-col cols="12">
        <v-textarea dense v-model="Table.description" 
                      label="Note" />
       </v-col>
      <v-col cols="12">
       <template v-if="updateMessage == 'Create' && Table.qty > 1">
           bdialog
       </template>
       <template v-else>
           bdialog mowsefrwer
       </template>
      </v-col>
      </v-layout>
     </v-card-text>
   </v-card>
  </v-dialog> 

<v-dialog v-model="showTablePrint" width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
  <front-json-to-csv v-if="orTable"
                   :json-data="orTableFilter"
                   :csv-title="'Bate Lys/Stock Table'"
                   @hideModal="showTablePrint = false">
   <v-btn>
      Download with custom title
   </v-btn> 
  </front-json-to-csv>
</v-dialog>

 </v-container>   
</template>

<script>
import { zmlFetch } from '@/api/zmlFetch';
import { getters } from "@/api/store"
import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
//import { notLoggedInSnackbar } from "@/api/GlobalActions"
import BaseSearch from '@/components/base/BaseSearch.vue';
import { errorSnackbar, infoSnackbar } from "@/api/GlobalActions"

export default {
  name: "TableFilter",

  components: {FrontJsonToCsv
            , BaseSearch
            },

  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      rules: {
       required: [value => !!value || "Required."]
      },
      showAddTable: false,
      showTablePrint:false,
      search:'',
      showPassword:false,
      orTable:[{id:1,type:'type' , name:'name1',description:'descriptionAA'}
                   ,{id:2,type:'type1', name:'name2',description:'descriptionBB'}
                   ,{id:3,type:'type2', name:'name3',description:'descriptionCC'}
                   ,{id:4,type:'type3', name:'name4',description:'descriDD'}],
      updateMessage:'Create',
      orTableHeader:[
           { text: 'id', value: 'id' , align: 'start',   sortable: true}
          ,{ text: 'Type', value: 'type' }
          ,{ text: 'Name', value: 'name' }
          ,{ text: 'Description', value: 'description'}
      ],
      Table:{id:'',type:'',name:'', description:''},
      bateType:[{switch:true,type:'type'}
               ,{switch:true,type:'type1'}
               ,{switch:true,type:'type2'}
               ,{switch:true,type:'type3'}],
  }),
  computed: {
      formIsValid () {
        return (
          this.Table.id &&
          this.Table.type && 
          this.Table.description &&
          this.Table.name
        )
      },
      orTableFilter() {
        //If the table is empty - return blank
        if (!this.orTable.length) return [];
        //If we have any switches on, add them to onlyThese
        let onlyThese = this.bateType.filter(ele => ele.switch == true)
        //If we have no switch active, activate at least one
        if (!onlyThese.length ) {
            this.bateType.forEach(element => { element.switch == true})
            onlyThese = this.bateType
        }
        return this.orTable.filter(ele => onlyThese.some(e => e.type == ele.type) ) 
      } 
  },
  methods:{
    clickOnTableRow(p1,p2) {
          console.log('click = ', p1, p2)
          let index = this.orTable.findIndex(ele => ele.id == p1.id)
          console.log('index = ', index)
          this.editTable(index)
    },
    getData () {
       this.showAddTable = false
       let ts = {}
       alert('fetch',ts)
    },
    loadError(response) {
      console.log('ERROR on LOAD', response)
      let errorMessage = response.errorcode + ' ' + response.error
      errorSnackbar("ERROR:" +  errorMessage);
    },
    TableDone(response) {
      if (!response.constructor === Array) {
          console.log('DbErr:',response)
          this.orTable = []
          return
      }
      this.orTable = response
      infoSnackbar("RECORDS : " +  response.length);        
    },
    editTable(index) {
        this.updateMessage = 'Edit'
        this.Table = this.orTable[index]
        this.showAddTable = true        
    },
    addNewBate() {
        this.updateMessage = 'Create'
        this.Table = {id:''
                    ,type:''
                    ,name:''
                    ,description:''
                    }
        this.showAddTable = true    
    },
    saveTable() {
        if (!this.formIsValid) {
          alert('form not valid yet')
          return
        }
        if (this.updateMessage == 'Create') {
            this.createNewTable(this.Table)
            return
        }
        this.saveSqlTable(this.Table)
    },
    saveSqlTable(u) {
        let ts = {}
        ts.task = 'UpdateOrder'
        ts.data = u
        zmlFetch(ts, this.checkSaveError, this.loadError);
    },
    createNewTable(u) {
        let ts = {}
        ts.task = 'AddOrder'
        ts.data = u
        zmlFetch(ts, this.checkSaveError, this.loadError);
    },
    checkSaveError(response) {
      //First check for an error, and then call getData
      if (response.constructor === Array || response.errorcode == 0) {
         infoSnackbar('update')
      } else {
        let err = "We had an Error!, " + response.errorcode + ' ' + response.error
         errorSnackbar(err)
      }
      this.getData()
    }    
  },
  mounted() {
     // console.log('Start Table')
     /*
      if (this.getZml.login.userid == 0) {
         notLoggedInSnackbar(this.$router)
         return
      }
      this.getData()
      */
  }
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: rgba(192, 0, 250, 0.986);
}
</style>