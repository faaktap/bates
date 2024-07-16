<template>

 <v-container fluid>
  <base-title-expand :heading="entity + ' View Table!'">

    <p>Refined item types - main category could be furniture, here we would have tables, desks and chairs</p>
    <p>To add stock from here, press the add stock button on the specific item
      (This is just to make it easier to add items)
    </p>

  </base-title-expand>



<!------------------SEARCH, ADD, REFRESH, EXPORT------------------------------------------->
   <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <base-search @clear="search=''" v-model="search" />
      <v-btn class="ma-2" @click="addNew"> Add {{ entity }}</v-btn>
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
                 :mobile-breakpoint="0"
                 :footer-props="{
                    'items-per-page-options': [20, 40, 150]
                  }"
           >
             <template v-slot:[`item.typeid`]="{ item }">
              <!--{{ item.typeid }}-->
               <div class="float-right">
                <v-btn class="mx-1" x-small  @click="retrieveForDeleting(item)">
                    <v-icon small color="red" class="my-1">mdi-delete</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Delete </template>
                </v-btn>
                <v-btn class="mx-1" x-small  @click="retrieveForEditing(item)">
                    <v-icon small color="green" class="my-1">mdi-circle-edit-outline</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Edit </template>
                </v-btn>
                <v-btn class="mx-1" x-small  @click="retrieveForAddStock(item)"
                       tip="add Stock">
                    <v-icon small color="blue" class="my-1">mdi-plus</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Add Stock </template>
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
            fullscreen
            content-class="elevation-2"
            style="overflow:hidden"
            xwidth="auto">
   <table-item-form :updateMessage="updateMessage"
                      :dataTable="editTable"
                      :entity="entity"
                      :editFieldDisplay="editTable.name"
                      @save="clickOnForm"
                      @cancel="clickOnForm"
                      @create="clickOnForm"/>
  </v-dialog>
<!------------------ADD/UPDATE STOCK FORM-------------------------------------->
  <v-dialog v-model="showAddStockTable"  fullscreen>
   <table-stock-form :updateMessage="updateMessage"
                      :dataTable="editStockTable"
                       entity="Stock from Type"
                      :editFieldDisplay="editStockTable.name"
                      @save="clickOnStockForm"
                      @cancel="clickOnStockForm"
                      @create="clickOnStockForm"/>
  </v-dialog>
<!------------------EXPORT------------------------------------------->
  <v-dialog v-model="showTablePrint" width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
   <front-json-to-csv v-if="entityTable"
                   :json-data="entityTableFilter"
                   :csv-title="'Bate Item Kategorie Lys/Stock Item Category Table'"
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
import { tabwSItem } from "@/components/crud/TableItem.js"
import { tableWork } from "@/components/crud/TableStock.js"
import { crudTask } from "@/components/crud/crudTask.js"
import TableItemForm from "@/components/crud/TableItemForm"
import TableStockForm from "@/components/crud/TableStockForm"

import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import BaseTitleExpand from '@/components/base/BaseTitleExpand.vue'

export default {
  name: "TableItemCat",
  props: ['entity'],
  components: {FrontJsonToCsv
            , BaseSearch
            , BaseTitleExpand
            , TableItemForm
            , TableStockForm
            },

  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      showAddTable: false,
      showAddStockTable: false,
      showTablePrint:false,
      search:'',
      updateMessage:'Create',
      entityTable:[],
      entityTableHeader:[
           { text: 'Category', value: 'category'}
          ,{ text: 'Name', value: 'name' }
          ,{ text: 'StockType', value: 'stocktype'}
          ,{ text: 'actions', value: 'typeid' , align: 'right'}

      ],
      editTable:{typeid:'', catid:'' ,name:'', stocktype:''},
      editStockTable:{},
      switchType:[],

  }),
  computed: {
      entityTableFilter() {
        console.log('start filter')
        //If the table is empty - return blank
        if (!this.entityTable.length) return [];
        console.log('start filter 1')
        //If we have any switches on, add them to onlyThese
        let onlyThese = this.switchType.filter(ele => ele.switch == true)
        console.log('start filter 2', onlyThese, this.switchType)
        console.log('start filter 2a', onlyThese.length, this.switchType.length)
        //If we have no switch active, activate at least one
        if (!onlyThese.length ) {
            this.switchType.forEach(element => { element.switch == true})
            onlyThese = this.switchType
        }
        console.log('start filter 3', onlyThese.length, onlyThese)
        let answer = this.entityTable.filter(ele => onlyThese.some(e => e.type == ele.category) )
        console.log('start filter 4', answer)
        if (answer.length > 0) return answer
        console.log('start filter 5a')
        return this.entityTable
      }
  },
  methods: {
    retrieveForDeleting(item) {
      this.$root.$confirm("Are you sure about deleting?", "If you press YES,byebye", { color: 'red' })
       .then((confirm) => {
         if (confirm) {
           tabwSItem.deleteData(item,this.refresh)
         } else {
           //alert('you pressed NO ' + item.name)
         }
      })
    },
    addNew() {
        this.updateMessage = 'Create'
        this.editTable = {typeid:''
                    ,name:'A new One'
                    ,catid:''
                    ,stocktype:''
                    }
        this.showAddTable = true
    },
    retrieveForEditing(item) {
      let index = tabwSItem.getIndex(item.typeid,this.entityTable)
      if (index !== -1) {
        this.updateMessage = 'Edit'
        this.editTable = this.entityTable[index]
        this.showAddTable = true
      }
    },
    tableDone(response) {
      if (crudTask.reportError(response)) return
      this.entityTable = response
      crudTask.save('itemtype', response)

      //load switches...only when empty
      crudTask.recalcSwitches(this.switchType, this.entityTable, 'category')
    },
    retrieveForAddStock(item){
      this.updateMessage = 'Create'
      this.editStockTable = {stockid:''  ,typeid:item.typeid
                           ,userid:this.getZml.login.userid
                           ,originalownerid:''
                           ,devalid: 3      ,placeid:''
                           ,name:''            ,description:''   ,quantity:1
                           ,serialno:''        ,datereceived:''  ,price:0
                           }
      this.showAddStockTable = true
    },
    clickOnStockForm(editTable,method) {
      if (method != 'cancel')  {
         this.editStockTable = editTable
         tableWork.createNewItem(this.editStockTable, this.refresh)
      }
      this.showAddStockTable = false
    },

    //--------------------------------------------------------------------------------
    clickOnForm(editTable,method){
      console.log(editTable, method)
      switch (method) {
        case 'save':
             tabwSItem.saveData(editTable, this.refresh)
             break
        case 'create':
             tabwSItem.createNewItem(editTable, this.refresh)
             break
        case 'cancel':
             break
        default:
             crudTask.showError('We do not know about ' + method)
      }
      this.showAddTable = false
    },
    loadError(response) {
       crudTask.showError(response)
    },
    refresh(response) {
      //If we have an error, report and wait.
      crudTask.reportError(response)
      tabwSItem.getData(this.entity, this.tableDone)
    },
    checkSaveError(response) {
      //If we have an error, report and wait.
      if (crudTask.reportError(response)) return
      this.refresh()
    },
  },
  mounted() {
     console.log('Start' , this.$options.name)
     this.entityTable = crudTask.load('itemtype')
     if (this.entityTable.length == 0) {
       this.refresh()
     } else {
       crudTask.recalcSwitches(this.switchType, this.entityTable, 'category')
       console.log(this.entityTable)
     }
  }
}
</script>