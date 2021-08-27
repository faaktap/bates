<template>

 <v-container fluid> 
  <base-title-expand :heading="entity + ' View Table'">
   
    <p>Classrooms, Halls, Centres, Offices, Garages, Etc.</p> 
    <p>Add them here, and assign a responsible person to them.</p>

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
                 :footer-props="{
                    'items-per-page-options': [10, 20, 30, 40, 50]
                  }"
           >
             <template v-slot:[`item.placeid`]="{ item }">
              <!--{{ item.placeid }}-->
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
   <table-place-form :updateMessage="updateMessage" 
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
                   :csv-title="'Klaskamer Lys/Classroom Table'"
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
import { tableWork } from "@/components/crud/TablePlace.js"
import { crudTask } from "@/components/crud/crudTask.js"
import TablePlaceForm from "@/components/crud/TablePlaceForm"

import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import BaseTitleExpand from '@/components/base/BaseTitleExpand.vue'


export default {
  name: "TableItem",
  props: ['entity'],
  components: {FrontJsonToCsv
            , BaseSearch
            , TablePlaceForm
            , BaseTitleExpand
            },

  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      showAddTable: false,
      showTablePrint:false,
      search:'',
      updateMessage:'Create',      
      entityTable:[],
      entityTableHeader:[
           { text: 'RoomNo', value: 'name' }
          ,{ text: 'Owner', value: 'owner'}
          ,{ text: 'Workarea', value: 'workarea'}
          ,{ text: 'Description', value: 'description'}
          ,{ text: 'actions', value: 'placeid' , align: 'right'}          

      ],
      editTable:{placeid:'',workareaid:'', ownerid:'' ,name:'', description:''},
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
        return this.entityTable.filter(ele => onlyThese.some(e => e.type == ele.workarea) ) 
      } 
  },
  methods: {
    retrieveForDeleting(item) {
      this.$root.$confirm("Are you sure about deleting?", "If you press YES, gone!", { color: 'red' })
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
        this.editTable = {placeid:''
                    ,name:'A new One classroom name'
                    ,ownerid:''
                    ,description:''
                    ,workareaid:''
                    }
        this.showAddTable = true    
    },    
    retrieveForEditing(item) {
      console.log('retrie4edit',item)
      let index = tableWork.getIndex(item.placeid,this.entityTable)
      if (index !== -1) {
        this.updateMessage = 'Edit'
        this.editTable = this.entityTable[index]
        console.log('loaded:', this.editTable)
        this.showAddTable = true
      }
    },
    tableDone(response) {
      if (crudTask.reportError(response)) return
      this.entityTable = response
      //load switches...only when empty
      crudTask.recalcSwitches(this.switchType, this.entityTable, 'workarea')
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
             tableWork.createNewItem(editTable, this.refresh)
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
      if (crudTask.reportError(response)) return
      tableWork.getData('load'+this.$options.name, this.tableDone)
    },
    checkSaveError(response) {
      //If we have an error, report and wait.      
      if (crudTask.reportError(response)) return
      this.refresh()
    },
  },  
  mounted() {
     console.log('Start' , this.$options.name)
     this.refresh()
  }
}
</script>