<template>
 <v-container fluid> 
   <v-expansion-panels rounded class="ma-2 pa-4 long-line">
    <v-expansion-panel>
     <v-expansion-panel-header  color="green">
         <h1>Score Input Function</h1>
     </v-expansion-panel-header>
     <v-expansion-panel-content>
       <p>Enter the tasteid, and at least two scores. And press the add score button.<br>The scores will 
       appear in the table below the button. Once you have entered a few scores, check them and the press
       the commit button to save them to the server. <i>Remember</i> No scores are saved until you press
       the COMMIT button. You can export your scores to excel via the export button.
       <br>You can edit or delete the scores before committing.
       <br>tasteid must be between 1 and 3000 and scores between 11 and 99
       <br>
       <br>Judges are optional, and fields will not be cleared.
       <br>
       <br>Any scores already on the server will stay there. We will just add to them.
       (To delete wrong scores is a different kettle of fish, you need admin rights for it.)
       </p>
     </v-expansion-panel-content>
    </v-expansion-panel>
   </v-expansion-panels>

  <v-card class="ma-7 pa-2" elevation="4">
   <v-row class="ma-2">
    <v-col cols="12" md="3">
     <v-text-field v-model="w_tasteid" label="tasteid" type="number" dense outlined rounded shaped />
    </v-col>
    <v-col v-for="(s,i) in w_score" :key="i" cols="6" md="2">
      <v-text-field v-model="w_score[i]" :label="'Score '+ (i+1)" type="number"  dense outlined rounded shaped/>
    </v-col>
   </v-row>
   <v-row>
    <v-col cols="12" md="3">
    </v-col>
    <v-col v-for="(s,i) in w_score" :key="i" cols="6" md="2">
      <v-select dense
                  v-model="w_judge[i]"
                  :items="judges"
                  item-text="name"
                  item-value="id"
                  :label="'Judge' + (i+1)"
                  outlined rounded shaped />        
    </v-col>
   </v-row>

   <v-row class="ma-6">
     <v-col cols="6">
     <v-btn class="float-right ma-2 pa-2 green" @click="addScore"> <v-icon small class="mr-2">mdi-scoreboard</v-icon> Add  </v-btn>
     
     </v-col><v-col cols="6">
     <v-btn class="float-left ma-2 pa-2 green" @click="updateScore"> <v-icon small class="mr-2">mdi-scoreboard-outline</v-icon>Update </v-btn>
     </v-col>
   </v-row>
  </v-card>
<!-------------------TABLE------------------------------------------>
   <v-row class="ma-2 pa-2">
       <v-col cols="12">
         <v-card  elevation="6">
           <v-data-table 
                 caption="Scores not saved yet"
                 :disable-filtering=true
                 :disable-pagination=true
                 :hide-default-footer=true
                 no-data-text="Please add scores at the top, and press the 'Add Score' button"
                  dense
                 :headers="entityTableHeader"
                 :items="entityTableFilter"
                 :items-per-page="10"
                 :footer-props="{
                    'items-per-page-options': [10, 50]
                  }"
                 @click="clickOnTableRow"
           >
           <template v-slot:item="row">
          <tr>
            <td>{{row.item.tasteid}}</td>
            <td>{{row.item.score[0]}}</td>
            <td>{{row.item.score[1]}}</td>
            <td>{{row.item.score[2]}}</td>
            <td>{{row.item.score[3]}}</td>
            <td class="float-right">
                <v-btn class="mx-2" x-small  @click="deleteScore(row.item)">
                    <v-icon small color="red" class="my-1">mdi-delete</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Delete </template>
                </v-btn>
                <v-btn class="mx-2" x-small  @click="retrieveForEditing(row.item)">
                    <v-icon small color="green" class="my-1">mdi-circle-edit-outline</v-icon>
                    <template v-if="!$vuetify.breakpoint.mobile"> Edit </template>
                </v-btn>

            </td>
          </tr>
           </template>
           </v-data-table>
         </v-card>
       </v-col>
   </v-row>
<!------------------EXPORT------------------------------------------->
   <v-card cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <v-btn class="ma-2" @click="showTablePrint = true"> Export </v-btn>
    </v-card>   
<!--   EditTable: {{editTable}} <br>
   Judge:{{ w_judge }}  <br>
   score:{{w_score}} <br>
   Table= {{ entityTable }} -->
<!------------------EXPORT------------------------------------------->
  <v-dialog v-model="showTablePrint" width="auto" :fullscreen="$vuetify.breakpoint.smAndDown">
   <front-json-to-csv v-if="entityTable"
                   :json-data="entityTableFilter"
                   :csv-title="'Michelangelo Scores Export'"
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
import { tableWork } from "@/components/crud/TableJudge.js"
import FrontJsonToCsv from '@/api/csv/FrontJsonToCsv.vue'
import { errorSnackbar, infoSnackbar } from "@/api/GlobalActions"

export default {
  name: "TableJudge",
  props: ['entity'],
  components: {FrontJsonToCsv},
  data: () => ({
      showTablePrint:false,    
      w_tasteid:null,
      w_score:['','','',''],
      w_judge:['','','',''],
      entityTable:[],
      entityTableHeader:[
           { text: 'Taste id', value: 'tasteid'}
          ,{ text: 'Score 1', value: 'score[0]' }
          ,{ text: 'S2', value: 'score[1]' }
          ,{ text: 'S3', value: 'score[2]'}
          ,{ text: 'S4', value: 'score[3]'}
          ,{ text: 'J1', value: 'judge[0]'}
          
      ],
      editTable:{id:'', tasteid:'',score:[0,1,2,3],judges:[0,1,2,3], add:1},
      practise:[],
  }),
  computed: {
      entityTableFilter() {
        //If the table is empty - return blank
        if (!this.entityTable.length) return [];
        return this.entityTable
      },
      judges() {
        console.log('judges = ', tableWork.theJudges)
        return tableWork.theJudges
      }
  },
  methods: {
    deleteScore(item) {
      console.log('to be deleted : ' ,item)
      let index = this.entityTable.findIndex(ele => ele.tasteid == item.tasteid)
      if (index == -1) {
        errorSnackbar('item not found for deletion', index)
        return
      }
      this.entityTable.splice(index,1);
    },
    updateScore(item) {
      console.log('to be updated : ', this.w_tasteid, item)
      let index = this.entityTable.findIndex(ele => ele.tasteid == this.w_tasteid)
      if (index == -1) {
        errorSnackbar('item not found for updating', index)
        return
      }
      if (this.testValidity()) {
        errorSnackbar(this.testValidity())
        return
      }
      this.entityTable[index].score = this.w_score
      this.entityTable[index].judges = this.w_judge
    },
    testValidity() {
      let err = ''
      if (this.w_tasteid < 1 || this.w_tasteid > 3999) err = 'Taste ID must be between 1 and 3999'
      if (!err && (this.w_score[0] < 10 || this.w_score[0] > 99)) err = 'Score 1 must be between 10 and 99'
      if (!err && (this.w_score[1] < 10 || this.w_score[1] > 99)) err = 'Score 2 must be between 10 and 99'
      if (!err && (this.w_score[2] > 99)) err = 'Score 3 must be below 100'
      if (!err && (this.w_score[3] > 99)) err = 'Score 4 must be below 100'
      return err

    },
    addScore(){
      let index = this.entityTable.findIndex(ele => ele.tasteid == this.w_tasteid)
      if (index !== -1) {
        errorSnackbar('item already in our list - click on update : ' + this.w_tasteid)
        return
      }      
      if (this.testValidity()) {
        errorSnackbar(this.testValidity())
        return
      }
      let obj = {id : new Date()
                       ,tasteid : this.w_tasteid
                       ,score : []
                       ,judges : []
                       }
      for (let i=0; i<4; i++) {
           if (this.w_score[i]) {
               obj.score.push(Number(this.w_score[i]))
               obj.judges.push(Number(this.w_judge[i]) || 0)
           } else {
               obj.score.push(0)
               obj.judges.push(this.w_judge[i] || 0)
           }

      }
      this.entityTable.push(obj)
      infoSnackbar('Score Added')
      this.$playSound()
      this.w_score.fill('',0,4)
      this.w_tasteid = ''; 
    },
    retrieveForEditing(p1) {
      infoSnackbar('Editing ' + p1.tasteid)
      let index = this.entityTable.findIndex(ele => ele.tasteid == p1.tasteid)
      this.editTable = this.entityTable[index]
      this.w_tasteid = this.editTable.tasteid
      for (let i=0; i<4; i++) {
          this.w_score[i] = this.editTable.score[i] 
          this.w_judge[i] = this.editTable.judges[i]
      }  
      this.w_judges  = this.editTable.judge
    },
    clickOnTableRow(p1) {
      infoSnackbar('YOU CLICKED ON ' + p1.tasteid)
      this.retrieveForEditing(p1)  //We never get clickonTableRow fired, since we have buttons?
    }
  },  
  mounted() {
    tableWork.hello('from ' + this.$options.name)
    //this.$playSound('img/ice-cubes-glass-daniel_simon.mp3')
  }
}
</script>



