<template>
  <v-container v-if="logList">
   
   <v-row>
     <v-col cols="12">
       <toolbar-buttons menuDisplay="vertical" :buttonGroup="toolbars" />
     <h1> Registered Users  {{ logList.length}} </h1>
        
    <v-card class="mx-auto">
       <v-container>
         <v-layout>
         <v-flex>
        <v-text-field
           v-model="search"
           append-icon="mdi-magnify"
           label="Search"
           single-line
           hide-details
         ></v-text-field>
         </v-flex>
         </v-layout>
         <v-row dense>
           <v-col cols="12">
             <v-card color="purple lighten-5">
               <div>
   <v-data-table
    v-if="logList && logList.length > 0"
    :headers="logHeader"
    :items="logList"
    :items-per-page="15"
    :search="search"
    class="elevation-1"
    color="purple lighten-3"
    loading="tableLoading"
    loading-text="Loading... Please wait"
    multi-sort
  >
      <template v-slot:[`item.action`]="{ item }">
        <v-btn class="mx-2" 
               small 
               title="Click here to reset password"
               @click="onButtonClick('reset password',item)">
          <v-icon dark>mdi-lock-reset</v-icon>
        </v-btn>
      </template>
      <template v-slot:top>
        <v-card color="green darken-1" align="center" class="ma-2 pa-2">
            First time and last time and how many times a user has created a log entry
        </v-card>
      </template>
      <template v-slot:[`footer.page-text`]>
        <v-card color="green darken-1" align="center" class="ma-2 pa-2">
         <v-btn @click="getLogs"
                title="Click here to refresh all users who have logged in"
         ><v-icon>mdi-table-refresh</v-icon></v-btn> 
        </v-card>
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
   <v-dialog v-model="showPasswordChange" :scrollable="false" persistent width="50%" >
  <v-card v-if="curItem" elevation="12" color="white darken-1">
    <v-card-title>
      PASSWORD RESET
    </v-card-title>
    
    <v-card-text>
      <v-card color="green" class="ma-2 pa-2">
      User : {{ curItem.user_name }}
      <br>Name : {{ curItem.user_fullname }}
      
      <br>CellPhone : {{ curItem.user_cell }}
      <br>Last Login : {{ curItem.last }}
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn title="Click here to reset password to the word 'password'"
             @click="passwordReset"  
      > Reset password </v-btn>
      <v-spacer />
      <v-btn title="Close"
             @click="showPasswordChange = false"  
      > Close </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>   



  </v-container>   
</template>


<script>
import { zmlFetch } from "@/api/zmlFetch"
import { zmlConfig } from '@/api/constants'
import { getters } from "@/api/store"
import { errorSnackbar, infoSnackbar } from '@/api/GlobalActions'
import ToolbarButtons from '@/components/ToolbarButtons'
export default {
    name:"ViewLog",
    components:{ ToolbarButtons },    
    props: [],
    data: () => ({
        getZml: getters.getState({ object: "gZml" }),
        toolbars:['tool','test','login'],
        showPasswordChange:false,
        curItem:{},
        search:null,
        logList:null,
        tableLoading:false,
        logHeader: [
          {text: 'User',             value: 'user_name' },
          {text: 'fullname',         value: 'user_fullname' },          
          {text: 'Type',             value: 'user_type' },
          {text: 'Grade',            value: 'user_grade' },
          {text: 'first use',        value: 'first' },
          {text: 'last use',         value: 'last' },
          {text: 'times used',       value: 'times' },
          {text: "reset",             value: "action", sortable: false }
        ]      
    }),
    methods:{
      onButtonClick(todo,data) {
        this.showPasswordChange = true
        this.curItem = data
        //this.$cs.l(data)
      },
      getLogs() {
        this.tableLoading = true
        let sl = { task: 'plainSql'
                 , sql: "SELECT u.userid,u.user_name, u.user_fullname, user_type, user_cell, user_grade, min(log_dte) first, max(log_dte) last, count(*) times "
                       + "FROM dkhs_learner u "
                       + " left outer join dkhs_log as l on l.user = u.user_name"
                       + " group by u.userid, u.user_name, u.user_fullname, user_type, user_grade, user_cell"
                       + " order by last DESC"
                 }
/*
SELECT u.userid,u.user_name,l.user, u.user_fullname, user_type, user_cell, user_grade, min(log_dte) first, max(log_dte) last, count(*) times
  FROM dkhs_learner u
left outer join dkhs_log as l on l.user = u.user_name
group by u.userid,u.user_name, l.user, u.user_fullname, user_type, user_grade, user_cell order by last DESC
*/                 
        zmlFetch(sl, this.processAfterFetch, this.processError);
      },
      processAfterFetch(response) {
          errorSnackbar(response)
          if (!response.error) {
             this.logList = response
          } else {
            alert('we have an error:' + response.errorcode + ' on fetching users')
          }
          this.tableLoading = false
      },
      processError(response) {
        zmlConfig.cl('ERROR on USER RESET FORM : ' , response)
        errorSnackbar(response)
      },
      passwordReset() {
        let sl = { task: 'plainSql'
                 , sql: "update dkhs_learner "
                      + "   set user_password = 'password' "
                      + " where userid = " + this.curItem.userid
                 }
        zmlFetch(sl, this.processAfterReset, this.processError);
      },
      processAfterReset(response) {
          if (!response.error == 0) {
             infoSnackbar('Password for user ' + this.curItem.userid + ' was reset to "password"')
          } else {
             errorSnackbar('we have an error:' + response.errorcode + ' on password reset')
          }
          this.showPasswordChange = false
      }

    },
    mounted: function() {
        console.log('Start:',this.$options.name)
        this.getLogs()
    },
    watch: {
    }
}
</script>

