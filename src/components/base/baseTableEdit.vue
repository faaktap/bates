<template>
  <v-container v-if="tHeader.length && tList.length">
   <v-row >
    <v-col cols="12" v-if="tHeading">
     <h1 class="text-center grey--text"> {{ tHeading }} </h1>
    </v-col>
    <v-col cols="12">   
     <v-card xcolor="deep-purple">
       <v-container fluid>
         <v-layout color="gray--text text--lighten-5">
         <v-flex>
        <v-text-field
           
           v-model="search"
           append-icon="mdi-magnify"
           label="Search"
           single-line
           hide-details
         >
         </v-text-field>
         </v-flex>
         </v-layout>
         <v-row dense>
           <v-col cols="12">
             <v-card color="blue lighten-5" class="ma-1">
              <div>
                  <v-card class="text-center ma-2 pa-2" color="primary gray--text text--lighten-3"> {{ bHeading }} </v-card>
                <v-data-table
                 v-if="tList && tHeader.length > 0"
                 :headers="tHeader"
                 :items="tList"
                 :items-per-page="5"
                 :search="search"
                  class="elevation-1"
                 color="purple lighten-3"
                 multi-sort
                 @click:row="clickOnTableRow"
                 @dblclick:row.prevent="doubleClickOnTableRow"                 
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
 </v-container>   
</template>


<script>
export default {
    name:"BaseTableEdit",
    props: ['tList', 'tHeading', 'bHeading'],
    data: () => ({
        curItem:{},
        search:null,
        tableLoading:false,
        tHeader: []      
    }),
    methods:{
      allocate() {
          alert('alloc')
      },
      clickOnTableRow(p1,p2) {
          this.$emit('select', p1, p2)
      },
      doubleClickOnTableRow(p1,p2) {
          this.$emit('edit', p1, p2)
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

