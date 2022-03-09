<template>

 <v-container fluid>
  <base-title-expand :heading="entity + ' Table'">

    <p>To tie the rooms/garages/places together. Hallway 1, or `behind the pavillion` </p>
    <p>Double click to go to locations for a workarea.</p>

  </base-title-expand>
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
                    'items-per-page-options': [10, 20]
                  }"
                 @dblclick:row="startPlaceView"
           >
             <template v-slot:[`item.workareaid`]="{ item }">
              <!--{{ item.workareaid }}-->
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
   <table-work-area-form :updateMessage="updateMessage"
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
                   :csv-title="'Werksarea Lys/Workarea Table'"
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
import { tableWork } from "@/components/crud/TableWorkArea.js"
import { crudTask } from "@/components/crud/crudTask.js"
import TableWorkAreaForm from "@/components/crud/TableWorkAreaForm"

import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import BaseTitleExpand from '@/components/base/BaseTitleExpand.vue'


export default {
  name: "TableWorkArea",
  props: { entity:{default:"Location(Work) Areas"}
         },
  components: {FrontJsonToCsv
            , BaseSearch
            , BaseTitleExpand
            , TableWorkAreaForm
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
          //,{ text: 'Description', value: 'description'}
          //,{ text: 'ownerid', value: 'ownerid'}
          //,{ text: 'ownername', value: 'ownername'}
          ,{ text: 'actions', value: 'workareaid', align:'right'}

      ],
      editTable:{workareaid:'',ownerid:'',name:'', description:''},

  }),
  computed: {
      formIsValid () {
        return (
          this.editTable.workareaid &&
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
    startPlaceView(e,{item}) {
      console.log(e,item)
      this.$root.$confirm('View Locations ?'
         , `Do you want to view locations for ${item.name} ?`, { color: 'green' })
       .then((confirm) => {
         if (confirm) {
           this.$router.push({ name: 'Classes' ,params:{area:item.name}})
         } else {
           //alert('you pressed NO ' + item.name)
         }
      })
    },
    retrieveForDeleting(item) {
      this.$root.$confirm("Are you sure about deleting?", "If you press YES, info will be gone", { color: 'red' })
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
        this.editTable = {workareaid:''
                    ,ownerid:''
                    ,name:'A new One'
                    ,description:''
                    }
        this.showAddTable = true
    },
    retrieveForEditing(item) {
      console.log('retrie4edit',item)
      let index = tableWork.getIndex(item.workareaid,this.entityTable)
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