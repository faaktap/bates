<template>

 <v-container fluid>
  <base-title-expand :heading="entity + ' Table'">

    <p>Classrooms, Halls, Centres, Offices, Garages, Etc.</p>
    <p>Add them here, and assign a responsible person to them.</p>
    <p>Most stocktaking will start here - double click on a place/location/room and
      we will redirect you to the stock capture program </p>

  </base-title-expand>
<!-- {{ switchType }} -->
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
                 mobile-breakpoint="0"
                 :footer-props="{
                    'items-per-page-options': [20, 30, 150]
                  }"
                  @click:row="startStockTake"
           >
             <template v-slot:[`item.placeid`]="{ item }">
              <!--{{ item.placeid }}-->
               <div class="float-right">
                 <z-table-btn color="red"
                             icon="mdi-delete"
                             text="d"
                            @click="retrieveForDeleting(item)"/>
                 <z-table-btn color="green"
                             icon="mdi-circle-edit-outline"
                             text="e"
                            @click="retrieveForEditing(item)" />
                </div>

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
import { tableWork } from "@/components/crud/TablePlace.js"
import { crudTask } from "@/components/crud/crudTask.js"
import TablePlaceForm from "@/components/crud/TablePlaceForm"

import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import BaseTitleExpand from '@/components/base/BaseTitleExpand.vue'
import ZTableBtn from '@/components/fields/ZTableBtn.vue'

export default {
  name: "TablePlace",
  props: {
    entity: {default:'location / class'},
    area:{}
  },
  components: {FrontJsonToCsv
            , BaseSearch
            , TablePlaceForm
            , BaseTitleExpand
            , ZTableBtn
            },

  data: () => ({
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
          ,{ text: 'Function', value: 'function'}
          ,{ text: 'actions', value: 'placeid' , align: 'right'}

      ],
      editTable:{placeid:'',workareaid:'', ownerid:'' ,name:'', description:''},
      switchType:[],
      defaultWorkArea:null,
      delete:false
  }),
  computed: {
      entityTableFilter() {
        //If the table is empty - return blank
        if (!this.entityTable.length) {
          return [];
        }
        //If we have any switches on, add them to onlyThese
        let onlyThese = this.switchType.filter(ele => ele.switch == true)
        //If we have no switch active, activate at least one
        if (!onlyThese.length ) {
            this.switchType.forEach(element => { element.switch == true})
            onlyThese = this.switchType
        }
        //if we have no switches to make active, show all
        if (!onlyThese.length ) {
          return this.entityTable
        } else {
          return this.entityTable.filter(ele => onlyThese.some(e => e.type == ele.workarea) )
        }
      }
  },
  methods: {
    startStockTake(e,{item}) {

      if (this.showAddTable) return
      if (this.delete) return

      console.log(e,item, this.updateMessage)
      this.$root.$confirm('Asset Capture'
         , `Do you want to start asset capture for location ${item.name} ?`, { color: 'green' })
       .then((confirm) => {
         if (confirm) {
           this.$router.push({ name: 'Stock' ,params:{room:item.name}})
         } else {
           //alert('you pressed NO ' + item.name)
         }
      })

    },
    retrieveForDeleting(item) {
      this.delete = true
      this.$root.$confirm("Are you sure about deleting?", "If you press YES, gone!", { color: 'red' })
       .then((confirm) => {
         if (confirm) {
           tableWork.deleteData(item,this.refresh)
         } else {
           //alert('you pressed NO ' + item.name)
         }
         this.delete = false
      })
    },
    addNew() {
        this.updateMessage = 'Create'
        this.editTable = {placeid:''
                    ,name:'A new Room name'
                    ,ownerid:''
                    ,description:''
                    ,function:'Teach'
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
      crudTask.save('place', this.entityTable)
      //load switches...only when empty
      crudTask.recalcSwitches(this.switchType, this.entityTable, 'workarea')
      this.fixIncomingArea()
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
      let filter = ''
      // if (this.$route.params.area) {
      //   filter = `AND w.name like "${this.$route.params.area}%"`
      // }
      tableWork.getData('load'+this.$options.name, this.tableDone, filter)

    },
    checkSaveError(response) {
      //If we have an error, report and wait.
      if (crudTask.reportError(response)) return
      this.refresh()
    },
    fixIncomingArea() {
      console.log('Fix incoming Area:', this.area, this.$route.params.area, this.switchType.length)
      if (this.area) { //this.$route.params && this.$route.params.area)
        console.log('Current switchTypes:', this.switchType)
        let idx = this.switchType.findIndex( e => e.type == this.area)
        console.log('We found and idx')
        if (idx > -1) {
          this.switchType[idx].switch = true
          console.log(this.switchType[idx], 'set to true!')
        }
      }
    }
  },
  mounted() {
     console.log('Start' , this.$options.name, 'a=',this.area, 'et-',this.entityTable.length ,'sw=',this.switchType.length)
     this.entityTable = crudTask.load('place')
     console.log('After Lookup Load' , this.$options.name, 'a=',this.area, 'et-',this.entityTable.length ,'sw=',this.switchType.length)
     if (this.entityTable.length == 0) {
       this.refresh()
     } else {
       crudTask.recalcSwitches(this.switchType, this.entityTable, 'workarea')
       console.log('After reCalc Switches' , this.$options.name, 'a=',this.area, 'et-',this.entityTable.length ,'sw=',this.switchType.length)
       this.fixIncomingArea()
     }
  }
}
</script>