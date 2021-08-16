<template>
 <v-container>

 <!-- TABLE HEADING AND DISPLAY -->   
  <v-row >
   <v-col cols="12" v-if="tHeading">
    <h1 class="text-center grey--text"> {{ tHeading }} </h1>
   </v-col>
   <v-col cols="12">   
    <v-card xcolor="deep-purple lighten-4">
     <v-container fluid color="gray--text text--lighten-5">
      <v-row >
       <v-col>
        <v-text-field
           v-model="search"
           append-icon="mdi-magnify"
           label="Search"
           single-line
           hide-details
        />
       </v-col>
      </v-row>
      <v-row dense>
       <v-col cols="12">
        <v-card color="blue lighten-5" class="ma-1">
         <div>
          <v-card class="text-center ma-2 pa-2" color="primary gray--text text--lighten-3"> {{ bHeading }} </v-card>
           <v-data-table
                 v-if="tList && tHeader.length > 0"
                 :headers="tHeader"
                 :items="tList"
                 :items-per-page="10"
                 :search="search"
                  class="elevation-1"
                 color="purple lighten-3"
                 multi-sort
                 @contextmenu:row.prevent="contextmenuRow"
                 @dblclick:row="doubleClickOnTableRow"
           >
            <template v-slot:footer>
              <v-card class="ma-4"> 
               <v-card-text class="green lighten-4">
               Kliek op die klein ronde dingetjie om data te verander, die op en af pyl om te skuif, en die 
               snaakse + teken onder regs om iets by te voeg.
               </v-card-text>
              </v-card>
            </template>
            <template v-slot:[`footer.page-text`]>
              <v-btn icon @click="allocate()"><v-icon >mdi-table-plus</v-icon></v-btn>
            </template>
           </v-data-table>
          </div>
         </v-card>
        </v-col>
       </v-row>
      </v-container>
     </v-card>
   </v-col>
  </v-row> 

<v-dialog>
</v-dialog>
 </v-container>   
</template>

<script>
import { infoSnackbar } from '@/api/GlobalActions';
export default {
    name:"BaseTabAndEdit",
    props: [],
    data: () => ({
        tList:[{o:'1'},{o:'2'},{o:'3'},{o:'4'}],
        tHeading:'Table Heading',
        bHeading:'B Heading',
        curItem:{},
        search:null,
        tableLoading:false,
        tHeader: []      
    }),
    methods:{
      doubleClickOnTableRow() {
          infoSnackbar('double click on row')
      },
      contextmenuRow() {
          infoSnackbar('contextmenu')
      },
      allocate() {
          infoSnackbar('Add New Entry - Allocate')
      },
      buildHeaders() {
        if (!this.tList || this.tList.length == 0) {
            return
        }
        this.tableLoading = true
        this.tHeader = []
        Object.keys(this.tList[0]).forEach(name => {
            this.tHeader.push(
                 { text:name.charAt(0).toUpperCase() + name.slice(1)
                 , value: name} )
        })
        this.tableLoading = false
      },
    },
    mounted: function() {
        this.buildHeaders()
    },
    watch: {
        tList: {
            deep:true,
            handler() {
               this.buildHeaders()
            }
        }
    }
}
</script>

