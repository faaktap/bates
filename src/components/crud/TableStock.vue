<template>

 <v-container fluid> 
   <v-card color="green" class="pa-2 mb-2 text-center">
     {{ entity }} View Table
   </v-card>
<!------------------SEARCH, ADD, REFRESH, EXPORT------------------------------------------->
   <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <base-search @clear="search=''" v-model="search" />
      <v-btn class="ma-2" @click="addNew"> Acquire Stock</v-btn>
      <v-btn class="ma-2" @click="refresh"> Refresh </v-btn>
      <v-btn class="ma-2" @click="showTablePrint = true"> Export </v-btn>
    </v-card>
<!------------------SWITCH------------------------------------------->     
    <v-card v-if="switchType && switchType.length" 
             class="row wrap text-center d-flex justify-space-between ml-0 mt-1 mb-2 pl-1 pr-1">
         <v-card v-for="s in switchType" 
                :key="s.id" 
                 class="mb-2">
           <v-switch v-model="s.switch"
                     hide-details
                     class="mt-1 mr-2 mb-2 ml-2"
                    :label="s.type" >
           </v-switch>
         </v-card>
    </v-card>        
<!-------------------TABLE------------------------------------------>
    <v-row>
       <v-col cols="12">
         <v-card  elevation="6">
           <v-data-table v-if="entityTable.length"
                 :headers="entityTableHeader"
                 :items="entityTableFilter"
                 :search="search"
                 :items-per-page="30"
                 :footer-props="{
                    'items-per-page-options': [10, 20,  50]
                  }"
           >
             <template v-slot:[`item.stockid`]="{ item }">
              {{ item.stockid }}
               <div class="float-right"> 
                <v-btn class="mx-2" x-small  @click="retrieveForDeleting(item)">
                    <v-icon small color="red" class="my-1">mdi-delete</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Delete </template>
                </v-btn>
                <v-btn class="mx-2" x-small  @click="retrieveForEditing(item)">
                    <v-icon small color="green" class="my-1">mdi-circle-edit-outline</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Edit </template>
                </v-btn>
                <v-btn class="mx-2" x-small  @click="retrieveForChecking(item)">
                    <v-icon small color="green" class="my-1">mdi-check-circle-outline</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Check </template>
                </v-btn>
                <v-btn class="mx-2" x-small  @click="retrieveForWriteOff(item)">
                    <v-icon small color="green" class="my-1">mdi-recycle-variant</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Write Off </template>
                </v-btn>
                <v-btn class="mx-2" x-small  @click="retrieveForWriteOff(item)">
                    <v-icon small color="green" class="my-1">mdi-phone-missed-outline</v-icon>
                    <v-icon small color="green" class="my-1">crosshairs-question</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Lost </template>
                </v-btn>
                
                </div>

             </template>

           </v-data-table>
         </v-card>
       </v-col>
    </v-row>
<!------------------TABLE END------------------------------------------->   
  <v-card color="green" class="mt-2 pa-2 text-center">
     End Of {{ entity }} View Table
  </v-card>
<!------------------ADD/UPDATE FORM------------------------------------------->
  <v-dialog v-model="showAddTable"  
           :fullscreen="$vuetify.breakpoint.mobile" 
            content-class="elevation-2"
            style="overflow:hidden"
            xwidth="auto">
   <table-stock-form :updateMessage="updateMessage" 
                      :dataTable="editTable"
                      :entity="entity"
                      :editFieldDisplay="editTable.name"
                      @save="clickOnForm"
                      @cancel="clickOnForm"
                      @create="clickOnForm"/>
                     
  </v-dialog> 
<!------------------EXPORT------------------------------------------->
  <v-dialog v-model="showTablePrint" width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
   <front-json-to-csv v-if="entityTable"
                   :json-data="entityTableFilter"
                   :csv-title="'Bate  Lys/Stock Table'"
                   @hideModal="showTablePrint = false">
    <v-btn>
      Download with custom title
    </v-btn> 
   </front-json-to-csv>
  </v-dialog>
<!------------------------------------------------------------->  
 </v-container>   
</template>

<script>
import { getters } from "@/api/store"
import { tableWork } from "@/components/crud/TableStock.js"
import TableStockForm from "@/components/crud/TableStockForm"

import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import { errorSnackbar, infoSnackbar } from "@/api/GlobalActions"

export default {
  name: "TableStock",
  props: ['entity'],
  components: {FrontJsonToCsv
            , BaseSearch
            , TableStockForm
            },

  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      showAddTable: false,
      showTablePrint:false,
      search:'',
      updateMessage:'Create',      
      entityTable:[],
      /*
SELECT s.stockid, s.userid, s.originalownerid, s.devalid, s.placeid, s.name, s.datereceived
     , s.description, s.serialno
     , p1.public_preferredname originalownername, p2.public_preferredname user
     , p.name place, d.rulename
*/               
      entityTableHeader:[
           { text: 'Name', value: 'name'}
          ,{ text: 'Place', value: 'place'}
          ,{ text: 'Category', value: 'category'}
          ,{ text: 'Date', value: 'datereceived'}
          ,{ text: 'Quantity', value: 'quantity'}
          ,{ text: 'OOwner', value: 'originalownername'}
          ,{ text: 'stockid', value: 'stockid'}
          //,{ text: 'userid', value: 'userid'}
          //,{ text: 'ownerid', value: 'originalownerid'}
          //,{ text: 'User', value: 'user'}
          //,{ text: 'placeid', value: 'placeid'}
      ],
      editTable:{stockid:''
                  ,typeid:''
                  ,userid:''
                  ,originalownerid:''
                  ,devalid:''
                  ,placeid:''
                  ,name:''
                  ,description:''
                  ,quantity:1
                  ,serialno:''
                  ,datereceived:''
                  ,price:0},
      switchType:[],

  }),
  computed: {
      entityTableFilter() {
        //If the table is empty - return blank
        if (!this.entityTable.length) return [];
        //If we have any switches on, add them to onlyThese
        let onlyThese = this.switchType.filter(ele => ele.switch == true)
        //If we have no switch active, activate at least one
        if (!onlyThese.length ) {
            this.switchType.forEach(element => { element.switch == true})
            onlyThese = this.switchType
        }
        return this.entityTable.filter(ele => onlyThese.some(e => e.type == ele.category) ) 
      } 
  },
  methods: {
    retrieveForDeleting(item) {
      this.$root.$confirm("Are you sure about deleting?", "If you press YES,byebye", { color: 'red' })
       .then((confirm) => {
         if (confirm) { 
           tableWork.deleteData(item,this.refresh)
         } else {
           //alert('you pressed NO ' + item.name)
         }
      })
    },
    addNew() {
        this.updateMessage = 'Create'
        this.editTable = {stockid:''  ,typeid:''         ,userid:190
                  ,originalownerid:190 ,devalid:3         ,placeid:''
                  ,name:''            ,description:''   ,quantity:1
                  ,serialno:''        ,datereceived:''  ,price:0
                  }
        this.showAddTable = true    
    },    
    retrieveForEditing(item) {
      console.log('retrie4edit',item)
      let index = tableWork.getIndex(item.stockid,this.entityTable)
      if (index !== -1) {
        this.updateMessage = 'Edit'
        this.editTable = this.entityTable[index]
        console.log('loaded:', this.editTable)
        this.showAddTable = true
      }
    },
    clickOnForm(editTable,method){
      console.log(editTable, method)
      switch (method) {
        case 'save':
          tableWork.saveData(editTable, this.refresh)
          break
        case 'create':
          console.log('we create')
          tableWork.createNewItem(editTable, this.refresh)
          break
        case 'cancel':
          console.log('we cancel')
          break
        default:
          alert('We do not know about ' + method)
      }
      this.showAddTable = false
    },
    loadError(response) {
      console.log('ERROR on LOAD', response)
      let errorMessage = response.errorcode + ' ' + response.error
      errorSnackbar("ERROR:" +  errorMessage);
    },
    tableDone(response) {
      if (response !== undefined && response.errorcode && response.errorcode != 0) {
          console.log('DbErr:',response)
          errorSnackbar("ERROR : " +  response.error);  
          return
      }
      this.entityTable = response
      //infoSnackbar("RECORDS : " +  response.length);  
      //load switches...
      this.switchType = []
      this.entityTable.forEach(e => {
        console.log(e.shortdesc)
        if (this.switchType.findIndex(element => element.type === e.category) == -1 ) {
          this.switchType.push({switch:true, type: e.category})
        }
      })      
    },
    refresh(response) {
      if (response !== undefined && response.errorcode && response.errorcode != 0) {
          console.log('DbErr:',response)
          errorSnackbar("ERROR : " +  response.error);  
          return
      }
      tableWork.getData('loadStock', this.tableDone)
    },
    checkSaveError(response) {
      //First check for an error, and then call getData
      if (response.constructor === Array || response.errorcode == 0) {
         infoSnackbar('update')
      } else {
        let err = "We had an Error!, " + response.errorcode + ' ' + response.error
         errorSnackbar(err)
      }
      this.refresh()
    },
  },  
  mounted() {
     console.log('Start' , this.$options.name)
     this.refresh()
  }
}
</script>
