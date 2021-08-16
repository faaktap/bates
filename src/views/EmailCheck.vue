<template>
  <div>
      <v-progress-linear :active="progress" :indeterminate="progress" color="grey lighten-1" />
         <v-row>
          <v-col cols="12">
           <h3> EMail Status List </h3>
         </v-col>
         </v-row>
         <base-table-edit 
                     :tList="emailStatusList" 
                     :tHeading="'EMail Status - Records = ' + emailStatusList.length" 
                     bHeading="How are the email doin" 
                     @edit="tableEdit"
                     @select="tableSelect"
         />
      <v-btn @click="loadAllData"> Refresh Email List </v-btn>
  </div>
</template>

<script> 
import { getters } from  "@/api/store"
import { zmlFetch } from '@/api/zmlFetch'
import BaseTableEdit from    '@/components/base/baseTableEdit'
const  WAIT = 0, READY = 1,  BUSY = 2,  DONE = 3
export default {
    components: {
        BaseTableEdit
    },
    props: [],
    data () {
      return {
        getZml: getters.getState({ object:"gZml" }),
        uniqid:0,
        progress:false,
        timerHandle:null,
        dataSequence:false,
        getData:{id:0
                 , desc: "Emails Sent"
                 , workDone: WAIT
                 , response: {}
                 , processor: this.loadEmailStatus
                 , sql:"SELECT s.deliveryid, m.subject, s.status "
                    + "     , min(s.sentdate) startdate , max(s.sentdate) enddate "
                    + "     , datediff( max(s.sentdate), min(s.sentdate)) diff "
                    + "     , count(*) "
                    + "FROM m_emailsent s, m_delivery m "
                    + "where m.deliveryid = s.deliveryid "
                    + "group by s.deliveryid desc, s.status"
                },
        emailStatusList:{},        
       } 
       
   }, 
   computed: {    
   }, 
   methods: {
     tableEdit(evt,item) {
         console.log('back at base - Edit:',item.item, evt)
     },
     tableSelect(evt,item) {
         console.log('back at base - select:',item.item, evt)

     },
     loadAllData() {
       this.progress = true;
       console.info('fetching in zmlFetchArray......:',this.getData.id, this.getData.desc)
       let ts = {sql: this.getData.sql
                ,task: 'PlainSql'}
       zmlFetch(ts, this.processAllData, this.loadError, this.getData);
     },
     processAllData(response,notused,queue) {
       console.log('emc',notused, queue)
       this.getData.workDone = READY
       this.getData.response = response
       if (!this.timerHandle) {
          this.startTimer( 2000, this.rollCall)
       }
     },
     startTimer(duration, funcToCall) {
       let loops = 5
          this.timerHandle = setInterval(function () {
            funcToCall('dummy')
            loops = loops - 1
            if (loops < 0) {
              clearInterval(this.timerHandle)
            }
          }, duration);
     },
     rollCall() {  
       console.info('Start of RollCall')
       if (this.getData.workDone == READY) {
           this.getData.workDone = BUSY
           //Call the assignor
           this.getData.processor(this.getData)
        }
       //Check if all is done
       if (this.getData.workDone == DONE)  {
           this.getData.workDone = WAIT 
           if (this.timerHandle) {
               clearInterval(this.timerHandle) 
               this.timerHandle = null
           }
           this.progress = false;
        }
        console.info('RC - End ',this.getData.workDone)        
        return "not used here"
     },
     loadEmailStatus(e) {
       this.emailStatusList = e.response
       e.workDone = DONE
     },
   }
}
</script>
