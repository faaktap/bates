<template>
<!--
This is a example of editable tables. We call it with an entiy name (like "Bate"), but all the
actual work is hardcoded in this area. Except fot the logic of the form, which is hardcoded
in table-filter-form.
So if we want to create a new one, we would copy the tablefilter.vue and tablefilterform.vue
to new files, and we would edit as we want to.
(Eventually we will have a new entity)
if switchType is used, a list of switches will be shown under search
constructs : entityTable, entityTableHeader, editTable
  -->
 <v-container fluid> 
   <v-card color="green" class="pa-2 mb-2 text-center">
     {{ entity }} View Table
   </v-card>
<!------------------SEARCH, ADD, REFRESH, EXPORT------------------------------------------->
   <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <base-search @clear="search=''" v-model="search" />
      <v-btn class="ma-2" @click="addNew"> Add {{ entity }}</v-btn>
      <v-btn class="ma-2" @click="getData"> Refresh </v-btn>
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
                 @click="clickOnTableRow"
           >
             <!--template v-slot:cell(bdate)="{ item }"-->
             <template v-slot:[`item.bdate`]="{ item }">
               {{ item.bdate }}
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
   <table-filter-form :updateMessage="updateMessage" 
                      :dataTable="editTable"
                      :entity="entity"
                      :editFieldDisplay="editTable.description"
                      @save="clickOnForm"
                      @cancel="clickOnForm"
                      @create="clickOnForm"/>
                     
  </v-dialog> 
<!------------------EXPORT------------------------------------------->
  <v-dialog v-model="showTablePrint" width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
   <front-json-to-csv v-if="entityTable"
                   :json-data="entityTableFilter"
                   :csv-title="'Bate Lys/Stock Table'"
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
import TableFilterForm from "@/components/crud/TableFilterForm"
import { tableWork } from "@/components/crud/TableFilter.js"
import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import { errorSnackbar, infoSnackbar } from "@/api/GlobalActions"

export default {
  name: "TableFilter",
  props: ['entity'],
  components: {FrontJsonToCsv
            , BaseSearch
            , TableFilterForm
            },

  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      showAddTable: false,
      showTablePrint:false,
      search:'',
      updateMessage:'Create',      
      entityTable:[{id:1,type:'type' , status:'Close', name:'name1',description:'descriptionAA', check:false,bdate:'2021-01-22'}
                   ,{id:2,type:'type1', status:'Open', name:'name2',description:'descriptionBB', check:false, bdate:null}
                   ,{id:3,type:'type2', status:'Open', name:'name3',description:'descriptionCC', check:false, bdate:'2021-10-20'}
                   ,{id:4,type:'type3', status:'Open', name:'name4',description:'descriDDionDD', check:false, bdate:null}],
      entityTableHeader:[
           { text: 'id', value: 'id' , align: 'start',   sentityTable: true}
          ,{ text: 'Status', value: 'status' }
          ,{ text: 'Type', value: 'type' }
          ,{ text: 'Name', value: 'name' }
          ,{ text: 'Description', value: 'description'}
          ,{ text: 'Check', value: 'check'}
          ,{ text: 'Date', value: 'bdate'}
      ],
      editTable:{id:'',type:'',name:'', description:''},
      switchType:[{switch:true,type:'hierdie is type'}
               ,{switch:true,type:'type1'}
               ,{switch:true,type:'Hierso is iets wat baie plek opvat'}
               ,{switch:true,type:'type2'}
               ,{switch:true,type:'lang text'}
               ,{switch:true,type:'heelwatlander teks'}
               ,{switch:true,type:'type3'}],

  }),
  computed: {
      formIsValid () {
        return (
          this.editTable.id &&
          this.editTable.type && 
          this.editTable.description &&
          this.editTable.status &&
          this.editTable.name
        )
      },
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
        return this.entityTable.filter(ele => onlyThese.some(e => e.type == ele.type) ) 
      }
  },
  methods: {
    retrieveForDeleting(item) {
      this.$root.$confirm("Are you sure about deleting?", "If you press YES,byebye", { color: 'red' })
       .then((confirm) => {
         if (confirm) { 
           tableWork.delete(item.id,this.entityTable)
         } else {
           alert('you pressed NO ' + item.description)
         }
      })
    },
    addNew() {
        this.updateMessage = 'Create'
        this.editTable = {id:''
                    ,type:''
                    ,status:'Close'
                    ,name:'A new One'
                    ,description:''
                    ,check:false
                    ,bdate:''
                    }
        this.showAddTable = true    
    },    
    retrieveForEditing(item) {
      console.log('retrie4edit')
      let index = tableWork.getIndex(item.id,this.entityTable)
      if (index !== -1) {
        this.updateMessage = 'Edit'
        this.editTable = this.entityTable[index]
        console.log('loaded:', this.editTable)
        this.showAddTable = true
      }
    },
    clickOnTableRow(p1,p2) {
      console.log('clickonrow')
      alert('clickOnRow  ' + p1 + p2)
      let index = this.entityTable.findIndex(ele => ele.id == p1.id)
      console.log('index = ', index)
      this.xxeditTable(index)
    },
    clickOnForm(editTable,method){
      console.log(editTable, method)
      switch (method) {
        case 'save':
             console.log('we save')
             break
        case 'create':
             console.log('we create')
             break
        case 'cancel':
             console.log('we cancel')
             break
        default:
             alert('We do not know about ' + method)
      }
      this.showAddTable = false
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
          this.entityTable = []
          return
      }
      this.entityTable = response
      infoSnackbar("RECORDS : " +  response.length);        
    },
    xxeditTable(index) {
        this.updateMessage = 'Edit'
        this.editTable = this.entityTable[index]
        this.showAddTable = true        
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
    checkSaveError(response) {
      //First check for an error, and then call getData
      if (response.constructor === Array || response.errorcode == 0) {
         infoSnackbar('update')
      } else {
        let err = "We had an Error!, " + response.errorcode + ' ' + response.error
         errorSnackbar(err)
      }
      this.getData()
    },
    showUs(response) {
      console.log('showus = ' , response)
    }    
  },  
  mounted() {
     console.log('Start' , this.$options.name)
     tableWork.hello('from ' + this.$options.name)
     tableWork.getData('loadstuff', this.showUs)
  }
}
</script>
