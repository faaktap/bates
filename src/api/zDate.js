/* Quick date functions - no need to include this. 
    let d = new Date();
    let year = d.getFullYear() + 1;
    let month = d.getMonth();
    let day = d.getDate();
    let c = new Date(year + 1, month, day);
    console.log(c);
*/

import { format 
        ,lastDayOfMonth
        ,addYears 
        ,add
        ,formatDuration
        ,isWeekend
        ,isSameDay
        ,startOfMonth
        ,startOfYear
        ,compareAsc
        } from 'date-fns'
 import { maxTime } from 'date-fns/constants'
 import { minTime } from 'date-fns'


//11 Maart 2021 was Dag 10
export const zDate = {
    publicHolidays : [
      //Should use start and end dates for holidays...
    { title : "New Year's Day", date:new Date(2021,0,1)} ,
    { title : "Human Rights Day", date:new Date(2021,2,21)} ,
    { title : "Public Holiday", date:new Date(2021,2,22)} ,
    { title : "Good Friday", date:new Date(2021,3,2)} ,
    { title : "Family Day", date:new Date(2021,3,5)} ,
    { title : "Special School Holiday", date:new Date(2021,3,26)} ,
    { title : "Freedom Day", date:new Date(2021,3,27)} ,
    { title : "Worker's Day", date:new Date(2021,4,1)} ,
    { title : "Youth Day", date:new Date(2021,5,16)} ,
    { title : "Women's Day", date:new Date(2021,7,9)} ,
    { title : "Heritage Day",    date: new Date(2021,8,25)} ,
    { title : "Christmas",       date: new Date(2021,11,25) } ,
    { title : "Day of Goodwill", date: new Date(2021,11,26) } , 
    { title : "School Holiday", date:new Date(2021,3,24)} ,
    { title : "School Holiday", date:new Date(2021,3,25)} ,
    { title : "School Holiday", date:new Date(2021,3,26)} ,
    { title : "School Holiday", date:new Date(2021,3,27)} ,
    { title : "School Holiday", date:new Date(2021,3,28)} ,
    { title : "School Holiday", date:new Date(2021,3,29)} ,
    { title : "School Holiday", date:new Date(2021,3,30)} ,
    { title : "School Holiday", date:new Date(2021,4,1)} ,
    { title : "School Holiday", date:new Date(2021,4,2)} ,
    { title : "School Holiday", date:new Date(2021,6,10)} ,
    { title : "School Holiday", date:new Date(2021,6,11)} ,
    { title : "School Holiday", date:new Date(2021,6,12)} ,
    { title : "School Holiday", date:new Date(2021,6,13)} ,
    { title : "School Holiday", date:new Date(2021,6,14)} ,
    { title : "School Holiday", date:new Date(2021,6,15)} ,
    { title : "School Holiday", date:new Date(2021,6,16)} ,
    { title : "School Holiday", date:new Date(2021,6,17)} ,
    { title : "School Holiday", date:new Date(2021,6,18)} ,
    { title : "School Holiday", date:new Date(2021,6,19)} ,
    { title : "School Holiday", date:new Date(2021,6,20)} ,
    { title : "School Holiday", date:new Date(2021,6,21)} ,
    { title : "School Holiday", date:new Date(2021,6,22)} ,
    { title : "School Holiday", date:new Date(2021,6,23)} ,
    { title : "School Holiday", date:new Date(2021,6,24)} ,
    { title : "School Holiday", date:new Date(2021,6,25)} ,
    { title : "School Holiday", date:new Date(2021,9,2)} ,
    { title : "School Holiday", date:new Date(2021,9,3)} ,
    { title : "School Holiday", date:new Date(2021,9,4)} ,
    { title : "School Holiday", date:new Date(2021,9,5)} ,
    { title : "School Holiday", date:new Date(2021,9,6)} ,
    { title : "School Holiday", date:new Date(2021,9,7)} ,
    { title : "School Holiday", date:new Date(2021,9,8)} ,
    { title : "School Holiday", date:new Date(2021,9,9)} ,
    { title : "School Holiday", date:new Date(2021,9,10)} ,    
  ],     
  dayType: [
   {id:10, dayNo:'1', type:'Admin'   , start:'07:45', duration:22}
  ,{id:11 ,dayNo:'1', type:'Per1'    , start:'08:07', duration:52}
  ,{id:12 ,dayNo:'1', type:'Per2'    , start:'08:55', duration:0}
  ,{id:13 ,dayNo:'1', type:'Per3'    , start:'09:43', duration:0}
  ,{id:14 ,dayNo:'1', type:'Pouse 1' , start:'10:31', duration:0}
  ,{id:15 ,dayNo:'1', type:'Per4'    , start:'10:56', duration:0}
  ,{id:16 ,dayNo:'1', type:'Per5'    , start:'11:45', duration:0}
  ,{id:17 ,dayNo:'1', type:'Pouse 2' , start:'12:33', duration:0}
  ,{id:18 ,dayNo:'1', type:'Per6'    , start:'12:53', duration:0}
  ,{id:19 ,dayNo:'1', type:'Per7'    , start:'13:42', duration:0}
  ,{id:10, dayNo:'2', type:'Admin'   , start:'07:45', duration:22}
  ,{id:11 ,dayNo:'2', type:'Per1'    , start:'08:07', duration:52}
  ,{id:12 ,dayNo:'2', type:'Per2'    , start:'08:55', duration:0}
  ,{id:13 ,dayNo:'2', type:'Per3'    , start:'09:43', duration:0}
  ,{id:14 ,dayNo:'2', type:'Pouse 1' , start:'10:31', duration:0}
  ,{id:15 ,dayNo:'2', type:'Per4'    , start:'10:56', duration:0}
  ,{id:16 ,dayNo:'2', type:'Per5'    , start:'11:45', duration:0}
  ,{id:17 ,dayNo:'2', type:'Pouse 2' , start:'12:33', duration:0}
  ,{id:18 ,dayNo:'2', type:'Per6'    , start:'12:53', duration:0}
  ,{id:19 ,dayNo:'2', type:'Per7'    , start:'13:42', duration:0}
  ,{id:10, dayNo:'3', type:'Admin'   , start:'07:45', duration:22}
  ,{id:11 ,dayNo:'3', type:'Per1'    , start:'08:00', duration:52}
  ,{id:12 ,dayNo:'3', type:'Per2'    , start:'08:45', duration:0}
  ,{id:13 ,dayNo:'3', type:'Per3'    , start:'09:30', duration:0}
  ,{id:14 ,dayNo:'3', type:'Pouse 1' , start:'10:15', duration:0}
  ,{id:15 ,dayNo:'3', type:'Per4'    , start:'10:40', duration:0}
  ,{id:16 ,dayNo:'3', type:'Per5'    , start:'11:25', duration:0}
  ,{id:17 ,dayNo:'3', type:'Pouse 2' , start:'12:10', duration:0}
  ,{id:18 ,dayNo:'3', type:'Per6'    , start:'12:30', duration:0}
  ,{id:19 ,dayNo:'3', type:'Per7'    , start:'13:15', duration:0}
  ,{id:10, dayNo:'4', type:'Admin'   , start:'07:45', duration:22}
  ,{id:11 ,dayNo:'4', type:'Per1'    , start:'08:07', duration:52}
  ,{id:12 ,dayNo:'4', type:'Per2'    , start:'08:55', duration:0}
  ,{id:13 ,dayNo:'4', type:'Per3'    , start:'09:43', duration:0}
  ,{id:14 ,dayNo:'4', type:'Pouse 1' , start:'10:31', duration:0}
  ,{id:15 ,dayNo:'4', type:'Per4'    , start:'10:56', duration:0}
  ,{id:16 ,dayNo:'4', type:'Per5'    , start:'11:45', duration:0}
  ,{id:17 ,dayNo:'4', type:'Pouse 2' , start:'12:33', duration:0}
  ,{id:18 ,dayNo:'4', type:'Per6'    , start:'12:53', duration:0}
  ,{id:19 ,dayNo:'4', type:'Per7'    , start:'13:42', duration:0}
  ,{id:10, dayNo:'5', type:'Admin'   , start:'07:45', duration:22}
  ,{id:11 ,dayNo:'5', type:'Per1'    , start:'08:30', duration:52}
  ,{id:12 ,dayNo:'5', type:'Per2'    , start:'09:11', duration:0}
  ,{id:13 ,dayNo:'5', type:'Per3'    , start:'09:52', duration:0}
  ,{id:14 ,dayNo:'5', type:'Pouse 1' , start:'10:33', duration:0}
  ,{id:15 ,dayNo:'5', type:'Per4'    , start:'10:58', duration:0}
  ,{id:16 ,dayNo:'5', type:'Per5'    , start:'11:39', duration:0}
  ,{id:17 ,dayNo:'5', type:'Pouse 2' , start:'12:20', duration:0}
  ,{id:18 ,dayNo:'5', type:'Per6'    , start:'12:38', duration:0}
  ,{id:19 ,dayNo:'5', type:'Per7'    , start:'13:19', duration:0}             
  ],  
  format: function (...args) {  
    return format(...args)
  },
  lastDayOfMonth: function (...args) {  
    return lastDayOfMonth(...args)
  },
  addYears: function (...args) {  
    return addYears(...args)
  },
  add: function (date, duration) {  
    return add(date, duration)
  },  
  isAllowedTime: function (time) {
    return time <= maxTime && time >= minTime
  },
  formatDuration: function(obj) {
    return formatDuration(obj)
  },
  isWeekend: function(obj) {
    return isWeekend(obj)
  },
  startOfYear: function(obj) {
    return startOfYear(obj)
  },
  startOfMonth: function(date) {
    return startOfMonth(date)
  },
  isSameDay: function(...args) {
    return isSameDay(...args)
  },
  gotoMonday: function(date){
    //Monday is 1, Sunday is 7
    //If we are on 6 or 7, we want to advance to next week.
    //Else we want to go back to this week Monday
    // ('gtm:current day is a' ,date.getDay())
    let addOrSubtract = 0
    if (date.getDay() > 5) { 
      addOrSubtract = 1
    } else {
      addOrSubtract = -1
    }
    while (date.getDay() > 1) {
      date.setDate(date.getDate() + addOrSubtract);
    }
    return date
  },
  addOneDay: function(date) {
    date.setDate(date.getDate() + 1);
    return date
  },
  todayNoHours: function() {
    let d = new Date()
    d.setHours(0,0,0,0)
    return d
  },
  isPublicHoliday: function(chkdate) {
    let isSame = false
    zDate.publicHolidays.findIndex(p => {
      if (chkdate.getTime() == p.date.getTime()) {
        isSame = true
      }
    })
    return isSame
  },  
  curDay: function(date) {
    //11 Maart 2021 was Dag 10
    //1 maart was dag 2
    if (compareAsc(date.setHours(0,0,0,0), new Date(2021,2,1).setHours(0,0,0,0) )  == 0 ) {
       return 6
    } else {
      alert('we only work in march')
      return 1
    }
  }
};


//Kan jy my sê watter skooldag is vandag? (11/03/2021) - Dag 10 sir.      

