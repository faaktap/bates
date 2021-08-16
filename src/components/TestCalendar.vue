<template>
  <v-row>
    <v-col>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >      
    <v-toolbar
       flat
       :loading="loading"
    >
      {{ calValue }}
        <v-btn
        icon
        class="ma-2"
        @click="addEvent"
        >
        add
        </v-btn>
        <v-btn icon @click="checkChange"> R </v-btn>
        <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
        >
        <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>

          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>

        <v-spacer />
        <v-btn icon
               class="ma-2"
              @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
    </v-toolbar>
    </v-sheet>
      <v-sheet height="400">
        <v-calendar
          v-if="events.length>0"
          ref="calendar"
          v-model="calValue"
          :now="calToday"
          :value="calToday"
          :events="events"
          event-color="secondary"
          color="primary"
          type="week"
          intervalMinutes="60"
          first-interval="7" 
          interval-height="35"
          
          @change="updateRange"
          @click:event="showEvent"
        > 
         <template v-slot:day-body="{ date, week }">
            <div
               class="v-current-time"
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY }"
            ></div>
         </template>

        </v-calendar>


<!---  SELECTED EVENT --->
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
        {{ selectedOpen}}
          <v-card
            color="blue-grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-if="selectedEvent" v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-if="selectedEvent" v-html="selectedEvent.details"></span>
              <v-text-field v-model="personeelMenemonic" label="Educator Menemonic" />
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="loadRooster"
              > load </v-btn>

              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>



        
      </v-sheet>
      <!--v-model(calValue) = {{ calValue }} <br>
      calToday = {{ calToday }} <br>{{ events }}

      -->
      
    </v-col>
    <v-col cols=12>
<ul>
<li class="red lighten-1">red</li>
<li class="pink">pink</li>
<li class="purple">purple</li>
<li class="deep-purple">deep-purple</li>
<li class="blue">blue</li>
<li class="indigo">indigo</li>
<li class="light-blue">light-blue</li>
<li class="teal">teal</li>
<li class="cyan">cyan</li>
<li class="green">green</li>
<li class="light-green">light-green</li>
<li class="lime">lime</li>
<li class="yellow">yellow</li>
<li class="amber">amber</li>
<li class="orange">orange</li>
<li class="deep-orange">deep-orange</li>
<li class="brown">brown</li>
<li class="grey">grey</li>
<li class="blue-grey">blue-grey</li>
<li class="black">black</li>
<li class="white">white</li>
<li class="transparent">transparent</li>
</ul>        
    </v-col>
    {{getZml.subjects }}
    <hr>
    {{ events }}
  </v-row>
</template>

<script>
//import { format         ,lastDayOfMonth        , addYears } from 'date-fns'
import { getters } from "@/api/store"
import { zDate } from '@/api/zDate.js'
import { zData } from '@/api/zGetBackgroundData.js'
import { zmlConfig } from '@/api/constants.js';
import { zmlFetch } from '@/api/zmlFetch.js';
export default {
    data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      loading:false,
      today: null,
      calToday: null,
      calValue: '',
      calReady: false,
      events:[{ start: "1900-01-01", name: "" }],
      selectedEvent: null,
      selectedElement: null,
      selectedOpen: null,
      personeelMenemonic: ''
    }),
    methods:{
      checkChange() {this.$refs.calendar.checkChange()},
      updateRange(whatweget) {
         console.info('Range Check', whatweget)
         
      },
      addEvent() {
        let s = new Date();
        let e = new Date();
        s.setHours(s.getHours() - 1);
        this.events.push({
            name: "quickOne",
            end: e,            
            start: s,
            color: 'green',
            timed: true,
          })
      },
      async loadCalendar() {
        this.getZml.calendar.forEach(ele => {
          if (ele.start) {
             const evt= {name: ele.name
                  , start: ele.start
                  , end: ele.start
                  , color: ele.color
                  , type: ele.type
                  , timed: ele.timed
                    }
             this.events.push(evt)
          } else {
            console.error('One of our event does not have a startdate!',ele);
          }
        })
        return "done"
      },
      loadRooster(){
        this.selectedOpen = false
        if (!this.personeelMenemonic) this.personeelMenemonic = 'WIE'
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = 'select * from rooster where user_name = "' + this.personeelMenemonic + '"';
        ts.api = zmlConfig.apiDKHS
        this.loading = true;
        zmlFetch(ts, this.afterRoosterSelect);   
      },
      getPeriodStartTime(hm,element, dateLooking) {
         let perStart = zDate.dayType.find(dt =>  dt.type == 'Per'+element.periodno && dt.dayNo == dateLooking.getDay() )  
         hm.h = parseInt(perStart.start.substr(0,2))
         hm.m = parseInt(perStart.start.substr(3,2))
      },
      subjectColor(subjectShortName) {
        let colorObj = this.getZml.subjects.find(dt =>  dt.shortname == subjectShortName.substr(0,dt.shortname.length) )  
        if (colorObj && colorObj.color) {
           return colorObj.color
        } else {
          return "amber"
        }
      },
      afterRoosterSelect(response) {
        //We could use this.calValue as current selected day - but not needed if we show one week of periods.
        //Get this week's first "day", monday is 1.
        let template = zDate.todayNoHours()
        template = zDate.gotoMonday(template)
        //Go back one more day (to Sunday)
        template.setDate(template.getDate() - 1);
        for (let t=0; t < 5; t++) {
           template = zDate.addOneDay(template)
           //Look for template's date and link to a dayno.
           const sday = this.getZml.calendar.find(cal => 
              cal.start == zDate.format(template,'yyyy-MM-dd') && cal.name.substr(0,3) == 'day'                
           )
           response.forEach(ele => {
             let n = ''
             switch (sday.name.substr(0,4)) {
               case 'day1': n = ele.day1; break
               case 'day2': n = ele.day2; break
               case 'day3': n = ele.day3; break
               case 'day4': n = ele.day4; break
               case 'day5': n = ele.day5; break
               case 'day6': n = ele.day6; break
               case 'day7': n = ele.day7; break
               case 'day8': n = ele.day8; break
               case 'day9': n = ele.day9; break
               case 'day10':n = ele.day10; break
             }
             if (n) {
               let hm = {}
               this.getPeriodStartTime(hm,ele,template)
               let lines = n.split(/\n/);
               const per = lines[0]
               const grade = lines[1]
               const evt = {
                       name: per + ' ' + ele.periodno + ' ' + grade.substr(0,4)
                     , start: template.setHours(hm.h, hm.m, 0, 0) 
                     , end:   template.setHours(hm.h, hm.m + 45, 0, 0) 
                     , color: this.subjectColor( n.substr(0,3) )
                     , timed: true
                     , details: n
                 }
               this.events.push( evt )
             }
           })
        }
        //Brilliant funcking timeout stukkie!!
        setTimeout(() => {
           this.loading = false;
           this.$refs.calendar.checkChange()
        }, 200)

      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }
        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      setToday () {
        this.calValue = ''
      },
      getCurrentTime () {
        return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
      },
      scrollToTime () {
        const time = this.getCurrentTime()
        const first = Math.max(0, time - (time % 30) - 30)

        this.cal.scrollToTime(first)
      },
      updateTime () {
        setInterval(() => this.cal.updateTimes(), 60 * 1000)
      },
      activateCalendar() {
          //if (this.$refs.calendar !== undefined) {
          if (this.calReady == false) {  
            console.info('Calendar is Ready!!: ' , this.$refs.calendar)
            this.$refs.calendar.checkChange()
            this.calReady = true
            this.scrollToTime()
            this.updateTime()
          } else {
           console.error('Calendar still not Ready!!: ' , this.calReady, this.$refs.calendar)
         }

       },
       rinseRepeat() {
         this.activateCalendar()
         if (!this.calReady) {
          setTimeout(() => { this.rinseRepeat() }, 4000)
         }
      }       
    },
    computed: {
      cal () {
        return this.calReady ? this.$refs.calendar : null
      },
      nowY () {
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
    },    
    mounted () {
      zData.initialData('Load Subject Data')
      this.events = []
      this.today = new Date()
      this.today.setHours(0,0,0,0)
      this.calToday = zDate.format(this.today,'yyyy-MM-dd') 
      zData.calendarData('Load Holiday and Birthday Data')
      .then(this.loadCalendar)
      .then(this.activateCalendar)
      
      this.rinseRepeat()
      }
  }
</script>