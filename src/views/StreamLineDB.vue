<template>
  <div>
      <v-progress-linear :active="progress" :indeterminate="progress" color="grey lighten-1" />
      <v-expansion-panels>
       <v-expansion-panel v-for="a in getData" :key="a.id">
        <v-expansion-panel-header>
          {{ a.id }} - {{ a.desc }} - {{ a.response.length }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
         <v-row>
          <v-col cols="6">
           <v-textarea v-model="a.sql" :label="a.desc + ' sql statement'" />
          </v-col><v-col cols="6">
           <h3> {{ a.desc }} - {{ a.response.length }}</h3>
         </v-col>
         </v-row>
         <base-table :tList="a.response" :tHeading="a.response.length" :bHeading="a.desc" />
        </v-expansion-panel-content>
       </v-expansion-panel>
      </v-expansion-panels>

      <h5> Can we see lists? </h5>
<div v-for="a in getData" :key="a.id">
  {{ a.id }} {{ a.response.length }}
</div>
      <v-btn @click="loadAllData"> loadAllData </v-btn>
  </div>
</template>

<script>
import { getters } from  "@/api/store"
import { zmlFetch } from '@/api/zmlFetch'
import BaseTable from    '@/components/base/baseTable'
const  WAIT = 0, READY = 1,  BUSY = 2,  DONE = 3
export default {
    components: {
        BaseTable
    },
    props: [],
    data () {
      return {
        getZml: getters.getState({ object:"gZml" }),
        uniqid:0,
        progress:false,
        timerHandle:null,
        dataSequence:false,
        getData:[{id:0
                 , desc: "Emails Sent"
                 , workDone: WAIT
                 , response: {}
                 , processor: this.firstone
                 , sql:"SELECT s.deliveryid, m.subject, s.status "
                    + "     , min(s.sentdate) startdate , max(s.sentdate) enddate "
                    + "     , datediff( max(s.sentdate), min(s.sentdate)) diff "
                    + "     , count(*) "
                    + "FROM m_emailsent s, m_delivery m "
                    + "where m.deliveryid = s.deliveryid "
                    + "group by s.deliveryid desc, s.status"}
                 ,{id:1
                 , desc: "User Logins"
                 , workDone: WAIT
                 , response: {}
                 , processor: this.secondone
                 , sql:"SELECT user_type "
                     + "     , min(lastlogindate) "
                     + "     , max(lastlogindate)"
                     + "     , sum(logins)"
                     + "     , count(*) "
                     + "FROM dkhs_learner "
                     + "group by user_type"}
                 ,{id:2
                 , desc:"Ip Adresses in Log"
                 , workDone:WAIT
                 , response:{}
                 , processor:this.thirdone
                 , sql:"SELECT ip"
                     + "     , min(log_dte) firsttme "
                     + "     , max(log_dte) lasttme "
                     + "     , count(*) times"
                     + "  FROM dkhs_log "
                     + "where log_dte > DATE_SUB(now(), INTERVAL 31 DAY)"
                     + "group by ip  "
                     + "ORDER BY lasttme desc, times"}
                 ,{id:3
                 , desc:"Onnies wat laai"
                 , workDone:WAIT
                 , response:{}
                 , processor:this.fourthone
                 , sql:"SELECT p.surname,c.persid,max(update_timestamp) , count(*) "
                     + "  FROM dkhs_lcontent c,dkhs_lperstemp p "
                     + "where p.persid = c.persid "
                     + "group by p.surname,c.persid "
                     + "order by count(*)"}                     
                ],
        rfo:{},
        rso:{},
        rto:{}, 
        ron:{},
       } 
       
   }, 
   computed: {    
   }, 
   methods: {
     loadAllData() {
       this.progress = true;
       this.getData.forEach(ele => {
         console.info('fetching in zmlFetchArray......:',ele.id, ele.desc)
         let ts = {sql: ele.sql, task: 'PlainSql'}
         zmlFetch(ts, this.processAllData, this.loadError, ele);
       })
     },
     processAllData(response,what,queue) {
       console.log(what)
       this.getData[queue.id].workDone = READY
       this.getData[queue.id].response = response
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
       console.info('Start of RC ',this.getData[0].workDone,this.getData[1].workDone,this.getData[2].workDone)
       if (this.dataSequence == false) {
            this.getData.forEach(work => {
              if (work.workDone == READY) {
                  work.workDone = BUSY
                  work.processor(work)
               }
           })
       } else {
           if (this.getData[0].workDone == READY) {
              this.getData[0].workDone = BUSY
              this.getData[0].processor(this.getData[0])
           }
           if (this.getData[1].workDone == READY) {
             if (this.getData[0].workDone == DONE) {
                 this.getData[1].workDone = BUSY
                 this.getData[1].processor(this.getData[1])
             }
           }
           if (this.getData[2].workDone == READY) {
             if (this.getData[1].workDone == DONE) {
                 this.getData[2].workDone = BUSY
                 this.getData[2].processor(this.getData[2])
             }
           }
           if (this.getData[3].workDone == READY) {
             if (this.getData[2].workDone == DONE) {
                 this.getData[3].workDone = BUSY
                 this.getData[3].processor(this.getData[3])
             }
           }
           
       }  
       //Check if all is done
       console.info('RC - middle ',this.getData[0].workDone,this.getData[1].workDone,this.getData[2].workDone)
       this.getData.forEach(e => e.workDone == 'DONE')
       if (this.getData[0].workDone == DONE 
        && this.getData[1].workDone == DONE  
        && this.getData[2].workDone == DONE )  {
           this.getData.forEach(ele => {
             ele.workDone = WAIT 
             // do not delte response, we should be able to use it from here...
             //ele.response = ''
           })
           if (this.timerHandle) {
               clearInterval(this.timerHandle) 
               this.timerHandle = null
           }
           this.progress = false;
        }
        console.info('RC - End ',this.getData[0].workDone,this.getData[1].workDone,this.getData[2].workDone)        
        return "not used here"
     },
     firstone(e) {
       this.rfo = e.response
       e.workDone = DONE
     },
     secondone(e) {
       this.rso = e.response
       e.workDone = DONE
     },
     thirdone(e) {
       this.rto = e.response
       e.workDone = DONE
     },
     fourthone(e) {
       this.ronn = e.response
       e.workDone = DONE
     },     
   }
}
</script>
