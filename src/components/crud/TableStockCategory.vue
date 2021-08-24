<template>

 <v-container fluid> 
   <v-card color="green" class="pa-2 mb-2 text-center">
     {{ entity }} View Table
   </v-card>
<!------------------SEARCH, ADD, REFRESH, EXPORT------------------------------------------->
   <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <base-search @clear="search=''" v-model="search" />
      <v-btn class="ma-2" @click="addNew"> Add {{ entity }}</v-btn>
      <v-btn class="ma-2" @click="refresh"> Refresh </v-btn>
      <v-btn class="ma-2" @click="showTablePrint = true"> Export </v-btn>
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
                    'items-per-page-options': [10, 20, 30, 40, 50]
                  }"
           >
             <template v-slot:[`item.description`]="{ item }">
               <template v-if="item.description.length > 80">
               {{ item.description.substr(0,80)}} ...
               </template>
               <template v-else>
                 {{ item.description }} 
               </template>
             </template>
             <template v-slot:[`item.catid`]="{ item }">
              <!--{{ item.catid }}-->
               <div class="float-right"> 
                <v-btn class="mx-2" x-small  @click="retrieveForDeleting(item)">
                    <v-icon small color="red" class="my-1">mdi-delete</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Delete </template>
                </v-btn>
                <v-btn class="mx-2" x-small  @click="retrieveForEditing(item)">
                    <v-icon small color="green" class="my-1">mdi-circle-edit-outline</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Edit </template>
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
   <table-stock-category-form :updateMessage="updateMessage" 
                      :dataTable="editTable"
                      :entity="entity"
                      :editFieldDisplay="entity.name"
                      @save="clickOnForm"
                      @cancel="clickOnForm"/>
                     
  </v-dialog> 
<!------------------EXPORT------------------------------------------->
  <v-dialog v-model="showTablePrint" width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
   <front-json-to-csv v-if="entityTable"
                   :json-data="entityTableFilter"
                   :csv-title="'Bate Kategorie Lys/Stock Category Table'"
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
import { zmlFetch } from '@/api/zmlFetch';
import { getters } from "@/api/store"
import { tableWork } from "@/components/crud/TableStockCategory.js"

import TableStockCategoryForm from "@/components/crud/TableStockCategoryForm"
import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import { errorSnackbar, infoSnackbar } from "@/api/GlobalActions"

export default {
  name: "TableStockCategory",
  props: ['entity'],
  components: {FrontJsonToCsv
            , BaseSearch
            , TableStockCategoryForm
            },

  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      showAddTable: false,
      showTablePrint:false,
      search:'',
      updateMessage:'Create',      
      entityTable:[],
      entityTableHeader:[
           { text: 'Name', value: 'name' }
          ,{ text: 'Description', value: 'description'}
          ,{ text: 'catid', value: 'catid' , align: 'start'}          

      ],
      editTable:{catid:'',name:'', description:''},


  }),
  computed: {
      formIsValid () {
        return (
          this.editTable.catid &&
          this.editTable.description &&
          this.editTable.name
        )
      },
      entityTableFilter() {
        //If the table is empty - return blank
        if (!this.entityTable.length) return []
        return this.entityTable
      }
  },
  methods: {
    retrieveForDeleting(item) {
      this.$root.$confirm("Are you sure about deleting?", "If you press YES,byebye", { color: 'red' })
       .then((confirm) => {
         if (confirm) { 
           tableWork.deleteData(item,this.refresh)
         } else {
           alert('you pressed NO ' + item.name)
         }
      })
    },
    addNew() {
        this.updateMessage = 'Create'
        this.editTable = {catid:''
                    ,name:'A new One'
                    ,description:''
                    }
        this.showAddTable = true    
    },    
    retrieveForEditing(item) {
      console.log('retrie4edit',item)
      let index = tableWork.getIndex(item.catid,this.entityTable)
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
      if (!response.constructor === Array) {
          console.log('DbErr:',response)
          this.entityTable = []
          return
      }
      this.entityTable = response
      infoSnackbar("RECORDS : " +  response.length);        
    },
    saveTable() {
        if (!this.formIsValid) {
          alert('form not valid yet')
          return
        }
        if (this.updateMessage == 'Create') {
            this.createNewTable(this.editTable)
            return
        }
        this.saveSqlTable(this.editTable)
    },
    saveSqlTable(u) {
        let ts = {}
        ts.task = 'Update'+this.entity
        ts.data = u
        zmlFetch(ts, this.checkSaveError, this.loadError);
    },
    createNewTable(u) {
        let ts = {}
        ts.task = 'Add'+this.entity
        ts.data = u
        zmlFetch(ts, this.checkSaveError, this.loadError);
    },
    refresh() {
        tableWork.getData('loadCategories', this.tableDone)
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
