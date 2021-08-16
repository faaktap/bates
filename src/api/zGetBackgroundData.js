import { zmlConfig } from '@/api/constants';
import { getters } from "@/api/store";
import { zmlFetch } from '@/api/zmlFetch';
import { zDate } from '@/api/zDate.js'

//import { zData } from "@/api/zGetBackgroundData.js"

export const zData = {
    someGlobals :  'hallo',
    l: (...args) => {   
       console.log(...args)
    },
    sendEmail(emailInfo) {
        let email = emailInfo
        email.method = "advemail"
        if (!email.subject) email.subject  = "A Subject"
        if (!email.email_to) email.email_to = "faaktap@gmail.com"
        if (!email.htmlmessage) email.htmlmessage = '<h1> Hallo World </h1>'
        if (!email.email_cc) email.email_cc = ''
        if (!email.email_replyto) email.email_replyto = ''
        if (!email.test) email.test = "no"
        if (!email.email_from) email.email_from = "admin@kuiliesonline.co.za"
        if (!email.trusted_user) email.trusted_user = "info@kuiliesonlin.co.za"
        let apiConfig = { method: 'POST'
                        , headers: { 'Accept': 'application/json'
                                   , api: zmlConfig.apiDKHS
                                   , 'Content-Type': 'application/json;charset=UTF-8'}
                        , body: JSON.stringify(email)
                        }
        fetch(zmlConfig.emailPath, apiConfig);
    },
    initialData:  (whatever) => {
        if (whatever !== undefined)
            console.log(whatever)

        if (!getters.getState({ object: "gZml" }).subjects.length) {
            let ts = { api: zmlConfig.apiDKHS
                     , task: 'loadlearn'
                     , language: getters.getState({ object: "gZml" }).login.lang
                    }
            zmlFetch(ts, finishedLoadingBasic, errorLoading)
        }
        return "something";
    },
    calendarData: (whatever) => {  
        if (whatever !== undefined) console.log(whatever)
        if (!getters.getState({ object: "gZml" }).calendar.length) {
            let ts = {}
            ts.task = 'PlainSql'
            ts.sql = "select  menemonic, persid,public_preferredname "
                   + ", concat('2021-', substr(IDNumber,3,2), '-', substr(IDNumber,5,2)) StartDate "
                   + " from dkhs_personel where IDNumber > 0 and public_preferredname is not null"
            ts.api = zmlConfig.apiDKHS
            zmlFetch(ts, finishedLoadingCalendar, errorLoading);
        }
        return "something"
    },
    functionData: (whatever) => {  
        if (whatever !== undefined) console.log(whatever)
        if (!getters.getState({ object: "gZml" }).functions.length) {
            let ts = {}
            ts.task = 'PlainSql'
            ts.sql = 'select * from dkhs_lfunction order by sortorder'
            ts.api = zmlConfig.apiDKHS
            zmlFetch(ts, finishedLoadingFunctions, errorLoading);
        }
        return "something"
    },
    randomChuckNorris: async () => {
        let response = await fetch('https://api.chucknorris.io/jokes/random')
        let data = await response.json()
        return data
    }
  
}
function finishedLoadingCalendar(response) {
    response.forEach(ele => {
        const evt= {name: ele.public_preferredname
                 , start: ele.StartDate
                 , end: ele.StartDate
                 , color: 'indigo'
                 , type: 'Birthday'
                 , timed: false
                 , detail: ele.menemonic
                   }
        getters.getState({ object: "gZml" }).calendar.push(evt)
       })    
    loadSchoolsDays()
}

//----------------------------------------------------------------
function finishedLoadingBasic (response) {
    //getZml = getters.getState({ object: "gZml" })
    console.log('finishedLoadingBasic')
    getters.getState({ object: "gZml" }).subjects = response.subjects;
    getters.getState({ object: "gZml" }).folders = response.folders;
    getters.getState({ object: "gZml" }).functions = response.functions;    
    getters.getState({ object: "gZml" }).persMenemonic = response.pers;    
}

//----------------------------------------------------------------
function loadSchoolsDays() {
   zDate.publicHolidays.forEach(xx => {
        const evt= {name: xx.title
                 , start: zDate.format(xx.date,'yyyy-MM-dd')
                 , type: 'Holiday'
                 , color: 'green'
                   }
        getters.getState({ object: "gZml" }).calendar.push(evt)
   })
   let startDate = new Date(2021,2,1)
   startDate.setHours(0,0,0,0)
   const startOfMonth = zDate.startOfMonth(startDate)
   let dayCnt = zDate.curDay(startOfMonth)
   let Group = 'A'
   //Kan jy my sê watter skooldag is vandag? (11/03/2021) - Dag 10 sir.      
   
   for (let i=0; i< 232; i++) {
      const dayX = zDate.add( startOfMonth, {days:i} )
      if (zDate.isWeekend(dayX))       {       continue   } 
      if (zDate.isPublicHoliday(dayX)) {       continue   } 
      const evt= {name: 'day' + dayCnt + ' ' + Group
               , start: zDate.format(dayX,'yyyy-MM-dd') //dayX
               , end: zDate.format(dayX,'yyyy-MM-dd') //dayX   
               , color: 'light-blue'
               , type: 'School'
               , timed: false
                 }
      getters.getState({ object: "gZml" }).calendar.push(evt)
      if (dayCnt == 10 && Group == 'B')  {Group = 'A'; dayCnt = 1; continue;}
      if (Group == 'A') { Group = 'B'; continue;}
      if (Group == 'B') { Group = 'A'; dayCnt += 1; continue;}
   }
}

//----------------------------------------------------------------
function finishedLoadingFunctions (response) {
    getters.getState({ object: "gZml" }).functions = response
}
function errorLoading (response) {
    alert('We had an error loading your data!')
    console.log('We had an error loading your data!',response)
}