<template>
 <v-container fluid>
   <base-title-expand :heading="entity + ' Table' + ( roomname ? ' Room ':' All' ) + roomname">

       <p class="heading-4">How does this work?? </p>
       <p class="float-right">
                <v-btn class="mx-1" x-small  tip="delete">
                    <v-icon small color="red" class="my-1">mdi-delete</v-icon>
                     Delete
                </v-btn>
                <v-btn class="mx-1" x-small tip="edit">
                    <v-icon tip="edit" small color="green" class="my-1">mdi-circle-edit-outline</v-icon>
                     Edit
                </v-btn>
                <v-btn class="mx-1" x-small tip="check/stocktake">
                    <v-icon small color="purple" class="my-1">mdi-check-circle-outline</v-icon>
                     Check
                </v-btn>
       </p>
       <p>A new teacher in a class can delete all the items and start again, or take ownership of current items. </p>
       <p> Look at the buttons on the righthand side. Each stock item can be processed with one of these
         buttons.
         <ul>
           <li> Delete will be used 4 testing, since a stock item cannot be deleted
               <p>The deleted item will still be visible in reports.</p></li>
           <li> Edit will allow you to edit an item, but rather use <strong>Check</strong> button, since this will save a "movement" transaction </li>
           <li> Check will be used yearly, the form will popup, you can make changes, and then save.
               <p>This will create a journal entry that you have seen the form, and are happy</p></li>
         </ul>
       </p>
       <p>Each stock item will have these buttons. To create a new stock item, click on the "Acquire Stock".
         Once our stock is loaded, this will be handled by a single person I guess.
       </p>

   </base-title-expand>
   <!------------------SEARCH, ADD, REFRESH, EXPORT------------------------------------------->
   <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">

      <base-search v-if="roomname" @clear="search=''" v-model="search" />
      <template v-else>
        <h2>AllStock</h2>
         <!-- So, if we can see all stock, let us filter here -->
         <v-text-field v-model="searchString" max-width="120" width="100" />
         <span>|| to search multiple</span>
      </template>
      <v-btn class="ma-2" @click="addNew"> Acquire Stock</v-btn>
      <v-btn class="ma-2" @click="refresh"> Refresh </v-btn>
      <!-- <v-btn class="ma-2" @click="showTablePrint = true"> Export </v-btn> -->
      <v-btn class="ma-2" @click="doPrint"
             title="Go to reports for a neat printout.">
         <v-icon> mdi-printer</v-icon> Quick Print
      </v-btn>
   </v-card>
<!------------------SWITCH------------------------------------------->

    <!-- <v-card v-if="switchType && switchType.length"
             class="row wrap text-center d-flex justify-space-between ml-0 mt-1 mb-2 pl-1 pr-1">
         <v-card v-for="s in switchType"
                :key="s.id"
                 class="mb-2">
           <v-switch v-model="s.switch"
                     inset dense color="green"
                     hide-details
                     class="mt-1 mr-2 mb-1 ml-2"
                    :label="s.type" >
           </v-switch>
         </v-card>
    </v-card> -->
<!-------------------TABLE------------------------------------------>
    <v-row>
       <v-col cols="12">
         <v-card  elevation="6">
           <v-data-table v-if="entityTable.length"
                 :headers="entityTableHeader"
                 :items="entityTableFilter"
                 :search="search"
                 :items-per-page="30"
                 mobile-breakpoint="0"
                 :footer-props="{
                    'items-per-page-options': [20, 40,  250]
                  }"
                  @dblclick:row="dblClick"
           >
             <template v-slot:[`item.stockid`]="{ item }">
              <!-- {{ item.stockid }} -->
                <v-icon small color="red" @click="retrieveForDeleting(item)">mdi-delete</v-icon>
                <v-icon small color="green" @click="retrieveForEditing(item)" title="edit" >mdi-circle-edit-outline</v-icon>
                <z-table-btn color="purple"
                             text="c"
                             icon="mdi-check-circle-outline"
                             title="check stock item"
                            @click="retrieveForChecking(item)" />
             </template>
           </v-data-table>
         </v-card>
       </v-col>
    </v-row>
<!------------------TABLE END------------------------------------------->
  <v-card color="green" class="mt-2 pa-2 text-center">
     End of {{ entity }} Table
  </v-card>

<!------------------ADD/UPDATE FORM------------------------------------------->
  <v-dialog v-model="showAddTable"
            :fullscreen="$vuetify.breakpoint.mdAndDown"
            content-class="elevation-2"
            style="overflow:hidden"
            width="auto">
   <table-stock-form :updateMessage="updateMessage"
                      :dataTable="editTable"
                      :entity="entity"
                      :editFieldDisplay="editTable.name"
                      @save="clickOnForm"
                      @cancel="clickOnForm"
                      @create="clickOnForm"/>

  </v-dialog>
<!------------------EXPORT------------------------------------------->
  <!-- <v-dialog v-model="showTablePrint" width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
   <front-json-to-csv v-if="entityTable"
                   :json-data="entityTableFilter"
                   :csv-title="'Bate Lys/Stock Table'"
                   @hideModal="showTablePrint = false">
    <v-btn>
      Download with custom title
    </v-btn>
   </front-json-to-csv>
  </v-dialog> -->
<!------------------------------------------------------------->
<!-- {{  entityTable }} -->
 </v-container>
</template>

<script>
import { getters } from "@/api/store"
import { util } from "@/api/util.js"
import { tableWork } from "@/components/crud/TableStock.js"
import { crudTask } from "@/components/crud/crudTask.js"
import TableStockForm from "@/components/crud/TableStockForm"

//import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import { printJSON } from "@/api/zmlPrint.js"
import BaseSearch from '@/components/base/BaseSearch.vue'
import BaseTitleExpand from '@/components/base/BaseTitleExpand.vue'
import ZTableBtn from '@/components/fields/ZTableBtn.vue'

export default {
  name: "TableStock",
  props: ['entity','roomname'],
  components: {
            //FrontJsonToCsv
             BaseSearch
            , TableStockForm
            , BaseTitleExpand
            , ZTableBtn
            },

  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      alwaysFilter:'',
      showAddTable: false,
      //showTablePrint:false,
      search:'',
      searchString:'',  //used for multiple searches
      updateMessage:'Create',
      entityTable:[],

// ALTER TABLE `kuilieso_bib`.`s_stock` ADD UNIQUE `S_PLACETYPEUNQ` (`typeid`, `placeid`);
      /*
SELECT s.stockid, s.userid, s.originalownerid, s.devalid, s.placeid, s.name, s.datereceived
     , s.description, s.serialno
     , p1.public_preferredname originalownername, p2.public_preferredname user
     , p.name place, d.rulename
*/
      tableHeader:[
           { text: 'Name', value: 'name'}
          //,{ text: 'Place', value: 'place'}
          ,{ text: 'Type', value: 'itemtype'}
          ,{ text: 'Category', value: 'category'}
          //,{ text: 'Date', value: 'datereceived'}
          ,{ text: 'Quantity', value: 'quantity'}
          ,{ text: 'Owner', value: 'ownername'}
          ,{ text: 'stockid', value: 'stockid'}
          //,{ text: 'userid', value: 'userid'}
          //,{ text: 'ownerid', value: 'originalownerid'}
          //,{ text: 'User', value: 'user'}
          //,{ text: 'placeid', value: 'placeid'}
      ],
      editTable:{stockid:''
                  ,typeid:1
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
      defaultPlace:null,
      defaultOwner:null,

  }),
  computed: {

      entityTableFilter() {
        if (!this.entityTable.length) return [];
        if (this.searchString) return util.findMultipleSearch(this.entityTable,this.searchString)
        return this.entityTable
      },
      entityTableHeader() {
        if (!this.roomname) {
          return [   { text: 'Name', value: 'name'}
                    ,{ text: 'Place', value: 'place'}
                    ,{ text: 'Type', value: 'itemtype'}
                    ,{ text: 'Category', value: 'category'}
                    ,{ text: 'Date', value: 'datereceived'}
                    ,{ text: 'Quantity', value: 'quantity'}
                    ,{ text: 'Owner', value: 'ownername'}
                    ,{ text: 'Qwnerid', value: 'originalownerid'}
                    ,{ text: 'User', value: 'user'}
                    ,{ text: 'Serial', value: 'serialno'}
                    ,{ text: 'Price', value: 'price'}
                    ,{ text: 'deval', value: 'devalid'}
                    ,{ text: 'stockid', value: 'stockid'}
          ]
        }
        return this.tableHeader
      }
  },
  methods: {
    doPrint() {
        let header = [{ text: 'Name', value: 'name'}
          ,{ text: 'Quantity', value: 'quantity'}
          ,{ text: 'Type', value: 'itemtype'}
          ,{ text: 'Category', value: 'category'}
          ,{ text: 'RoomNo', value: 'place'}
          ,{ text: 'Owner', value: 'ownername'}
          ,{ text: 'stockid', value: 'stockid'}
          ,{ text: 'Serial', value: 'serialno'}
          ,{ text: 'Date', value: 'datereceived'}]
        let title =   `<center><strong> Quick Print for Room  ${this.entityTable[0].place} </strong></center><br><small> Please goto the "Reports Function" for a neat printout to be signed</small>`
        let printTable = []
        this.entityTableFilter.forEach( e => {
          if (e.category.indexOf('/') > 0) e.category = e.category.substring(0, e.category.indexOf('/'));
          if (e.itemtype.indexOf('/') > 0) e.itemtype = e.itemtype.substring(0, e.itemtype.indexOf('/'));
          printTable.push(e)
        })
        printJSON(printTable, header,title)
    },
    retrieveForDeleting(item) {
      this.$root.$confirm("Are you sure about deleting?", "If you press YES,byebye", { color: 'red' })
       .then((confirm) => {
         if (confirm) {
           tableWork.deleteData(item,this.refresh)
         }
      })
    },
    addNew() {
        this.updateMessage = 'Create'
        this.editTable = {stockid:''
                  , typeid:''
                  , userid:this.getZml.login.userid
                  , originalownerid:this.defaultOwner
                  , devalid:'3'
                  , placeid:this.defaultPlace
                  , name:''
                  , description:''
                  , quantity:1
                  , serialno:''
                  , datereceived:''
                  , price:0
                  }
        this.showAddTable = true
    },
    dblClick(a,data) {
      console.log('dblclick',a,data)
      this.retrieveForChecking(data.item)
    },
    retrieveForChecking(item) {

      let index = tableWork.getIndex(item.stockid,this.entityTable)
      if (index !== -1) {
        this.updateMessage = 'Edit'
        this.editTable = this.entityTable[index]
        this.editTable.journalNote = 'Checking'
        console.log('loaded:', this.editTable)
        this.showAddTable = true
      }
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
    tableDone(response) {
      console.log('check error in stokc->crud')
      if (crudTask.reportError(response)) {
        //alert('we got an error at tableDone - but will ignore for now..')
        return
      }
      console.log('check no rows in stokc->crud')
      if (crudTask.reportNoRows(response)) {
        //We have no items for this query
        this.entityTable = []
      } else {
         this.entityTable = response
      }
      // this.translate(this.entityTable)
    },
    translate(tab) {
      tab.foreach(e => {
        // stap deur e se velde, en soek vir 'n slash
        // as jy een kry, besluit of jy die voorste of agterste deel gaan gebuik, en sny hom
        // kyk dalk na getZml.login.lang, of net watter ene die korste is.
        console.log(e)
      })
    },
    //--------------------------------------------------------------------------------
    clickOnForm(editTable,method){
      console.log(editTable, method)
      switch (method) {
        case 'save':
             tableWork.saveData(editTable, this.refresh)
             break
        case 'create':
             console.log('we create')
             if (editTable.placeid && editTable.typeid) {
                 if (editTable.devalid != 3) {
                   //test for devaluation rule
                 }
                 tableWork.createNewItem(editTable, this.refresh)
             } else { return }
             break
        case 'cancel':
             console.log('we cancel')
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
      if (crudTask.reportError(response)){
          alert('we got an crudTasj.reportError on response - ignore for now')
          //return
      }
      tableWork.getData('load'+this.$options.name, this.tableDone, this.alwaysFilter)
    },
    checkSaveError(response) {
      //If we have an error, report and wait.
      if (crudTask.reportError(response)) return
      this.refresh()
    },
    loadPlaceId(response) {
      console.log(response)
      this.defaultPlace = response[0].placeid
      this.defaultOwner = response[0].ownerid
      this.refresh()
    }
  },
  mounted() {
     console.log('Start' , this.$options.name)
     if (this.roomname) {
       this.alwaysFilter = ` AND p.name = "${this.roomname}" `
       tableWork.loadPlaceID(this.roomname,this.loadPlaceId)
     } else {
       this.refresh()
     }
     //Get placeid for the current roomname, and only then do a refresh.

  }
}
</script>