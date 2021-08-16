<template>
<v-row>
  <!--v-btn @click="testDeStruct"> testDeStruct </v-btn-->
 <v-col cols="12" col-md="6" >
   <!--v-btn @click="xxxx" class="test"> test </v-btn-->
  <v-card color="white" elevation="6" class="mx-6 pa-4" ref="includeInEmail">
   <v-form v-if="mySchema &&  Object.keys(mySchema).length > 1"
            ref="form">

    <v-form-base 
        autocomplete="off"
        id="myform"
        :model="myModel"
        :schema="mySchema"
        :col=12
        @input="log"
        @click="test"
        @blur="test"
    >
    <template #slot-top-myform>
      <v-col cols="12">
       <v-card class="slot ma-4 pa-4 xs-12" cols="12" color="green accent-3" align-content="center" align-content-lg="center">
           
           <v-card-title width="100%" class="text-center" color="blue">
               <v-img src="/img/logo.png" max-width=120 max-height=120 aspect-ratio="1"> </v-img>
               <v-spacer />
               <v-card class="text-right word-break ma-1 pa-3" color="green darken-3 yellow--text">
            <h2 class="test"> Gr 10 - {{ year }}</h2>
            <h3 >Subject choices <br> Vakkeuses</h3>
               </v-card>
           </v-card-title>
           <v-card-actions color="red">
               <v-spacer />
              * Required
           </v-card-actions>
        </v-card>
          </v-col>
      </template>
      <template #slot-bottom-myform>
          <v-col cols="12">
          <v-card class="slot">
              <v-card-actions>
          <v-btn
            color="success"
            class="mr-4"
            @click="validate"
          >
            Save
          </v-btn>
          <v-spacer />
          
          <v-btn
            color="success"
            class="mr-4"
            @click="reset"
            tip="This will reset all the form values!"
          >
            Reset
          </v-btn>
          </v-card-actions>
        </v-card>
       </v-col>
      </template>
      <template #slot-top-type-myform-group0>
          <div :v-html="langrelaas" /> 
      </template>
      <template #slot-top-key-myform-set1>
          <v-row class="slot caption"> 
            <v-col cols="12" md="6" class="mt-2">
                <v-card  color="green accent-5" class="pa-4" elevation="5">
             <h2>BELANGRIKE INLIGTING EN INSTRUKSIES</h2>
              <ol>
               <li>	‘n Leerder MOET een vak per groep kies.</li>
               <li>	IGO, IT en KUNS vereis ‘n aanlegtoets.</li>
               <li>	Leerders wat Fisiese Wetenskap kies, MOET ook Wiskunde kies.</li>
               <li>	Daar is beperkte spasie in die RTT en VERBRUIKERSTUDIE klasse.</li>
               <li>	Jy kan nie dieselfde vak twee keer kies nie.</li>
               <li>	Leerders wat ‘n 8ste vak kies, MOET ‘n gemiddeld van 80% in die finale gr.9 eksamen behaal.
                    Jy moet apart skriftelik aansoek doen.</li>
              </ol>
                </v-card>
            </v-col><v-col cols="12" md="6" class="mt-2">
                <v-card  color="green accent-5" class="pa-4"  elevation="5">
              <h2>IMPORTANT INFORMATION AND INSTRUCTIONS</h2>
              <ul>
               <li>	A learner MUST choose one subject per group.</li>
               <li>	EGD, IT and ART requires an aptitude test.</li>
               <li>	Learners who choose Physical Science MUST also choose Mathematics.</li>
               <li>	Limited space available in CAT and CONSUMER STUDIES classes.</li>
               <li>	You can not choose the same subject twice.</li>
               <li>	Learners choosing an 8th subject MUST attain an average of 80% in the final gr.9 examination. You must apply separately in writing.</li>
              </ul>
                </v-card>
            </v-col>
          </v-row> 
      </template>      
      </v-form-base>  
  </v-form>
  
 </v-card>
    </v-col>
    <v-col cols="12">
      <h4 class="text-center">End of Grade 10 Subject Selection {{ year }} </h4><br>
<!--  
  <v-btn @click="saveFile"> save schema File as test.json </v-btn>
  {{ valid }} {{ myModel }} 
-->
    </v-col>
 
</v-row>
</template>

<script>

import vFormBase from "@/components/vfbase/vFormBase"
//import BaseBreakpointDisplay from "@/components/base/BaseBreakpointDisplay"
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
import { zmlMail } from '@/api/zmlMail';
import { survey } from './survey.js'
import { util } from '@/api/util.js'
// eslint-disable-next-line
const langrelaas = "<h2>IMPORTANT INFORMATION AND INSTRUCTIONS</h2><ul>"+
"<li>	A learner MUST choose one subject per group.</li>"+
"<li>	EGD, IT and ART requires an aptitude test.</li>"+
"<li>	Learners who choose Physical Science MUST also choose Mathematics.</li>"+
"<li>	Limited space available in CAT and CONSUMER STUDIES classes.</li>"+
"<li>	You can not choose the same subject twice.</li>"+
"<li>	Learners choosing an 8th subject MUST attain an average of 80% in the final gr.9 examination. You must apply separately in writing.</li></ul>"
"<h2>BELANGRIKE INLIGTING EN INSTRUKSIES</h2><ol>"+
"<li>	‘n Leerder MOET een vak per groep kies.</li>"+
"<li>	IGO, IT en KUNS vereis ‘n aanlegtoets.</li>"+
"<li>	Leerders wat Fisiese Wetenskap kies, MOET ook Wiskunde kies.</li>"+
"<li>	Daar is beperkte spasie in die RTT en VERBRUIKERSTUDIE klasse.</li>"+
"<li>	Jy kan nie dieselfde vak twee keer kies nie.</li>"+
"<li>	Leerders wat ‘n 8ste vak kies, MOET ‘n gemiddeld van 80% in die finale gr.9 eksamen behaal."+
" Jy moet apart skriftelik aansoek doen.</li></ol>"


// Helper & Partial Functions & Rules
const minLen = l => v => (v && v.length >= l) || `min. ${l} Characters`
const maxLen = l => v => (v && v.length <= l) || `max. ${l} Characters`
const required = ( msg ) => v => !!v || msg
const requiredArray = ( msg ) => v => (Array.isArray(v) && v.length>1) || msg                
const rules = {
  requiredEmail: required('E-mail is required'),
  requiredSel: required('Selection is required'),
  requiredSelMult: requiredArray('2 Selections are required'),
  max12: maxLen(12),
  min6: minLen(6),
  validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
}
                                               
export default {
  name: "vfbasetest",

  components: {
              vFormBase
              },

  data: () => ({
    valid: false,
    year: 2021,
    resultStr: '',
    tmpSchoolNo :'',
    myModel: {
      email:null,
      schoolno:null,      
      surname:null,
      name:null,
      grade:null,
      subject1:null,
      subject2:null,
      subject3:null,
      subject5:null,
      subject6:null,
      subject7:null,
    },     
    /*
      schema:{ type:'text', hint:'myHint', prependIcon:'print'... } 
      maps to <v-text-fields hint="myHint" prepend-icon="print" > 
      -> https://vuetifyjs.com/en/components/text-fields/   
    */
   mySchema: { 
       top: { type:'wrap'
            , label:'top'
            , col : { "cols": 12,  "lg":12, "xs": 12 }
            , ripple:false
            , color:"white"
            , class:'title pa-2 rounded elevation-4 col-md-12', 
        schema:{
           schoolno: { type: 'number'
              , label: 'Admission number / Toelatingsnommer *'
              , prependInnerIcon:"mdi-alpha-n-circle"
              , solo:true
              , rules: [ required('Please enter student admission number') ]
              , col: { cols: 12, md: 6 } 
              , class:'title pa-2 rounded col-md-6' 
              , tooltip: "Admission number / Toelatingsnommer"
              },                   
           email: { type: 'email'
              , label: 'Parent/Guardian Email'
              , rules: [rules.requiredEmail, rules.validEmail]
              , prependInnerIcon:"mdi-email"
              , solo:true
              , col: { cols: 12, md: 6 } 
              , class:'xtitle pa-2 rounded col-md-6'
              , ripple:{ center:true, class: 'item blue--text' }
              , tooltip: "Please enter a parent or guardian email address."
              , hint:'email'
              },
           surname: { type: 'text'
              , label: 'Surname / Van *'
              , prependInnerIcon:"mdi-account-question"
              , solo:true
              , rules: [ required('Please enter student surname') ]
              , col: { cols: 12, md: 6 } 
              , class:'title pa-2 rounded col-md-6'
              , tooltip: "Surname / Van"
              , hint: 'lname'
              },
           name: { type: 'text'
              , label: 'Name / Naam *'
              , prependInnerIcon:"mdi-account-question-outline"
              , solo:true
              , rules: [ required('Please enter student name') ]
              , col: { cols : 12, md: 6 } 
              , class:'title pa-2 rounded col-md-6'
              , tooltip: 'Name / Naam' 
              , hint: 'fname'
              },         
           grade: { type:"select"
              , label: "Grade / Graad *"
              , items: ['9A1','9A2','9E1','9E2','9E3','9E4','9E5','9E6','9E7']
              , prependInnerIcon:"mdi-alpha-g-box"
              , solo:true
              , rules: [ required('Please enter student\'s current grade.') ]
              , col: { cols: 12 } 
              , tooltip:"Grade / Graad"
              },              
        }
       },
       set1: { type : 'wrap'
            , label : 'set1'
            , col : { cols: 12 }
            , ripple:false
            , tile: false
            , class:'title pa-2 rounded elevation-4 col-md-12', 
     schema:{

    subject1: { type: 'radio'
             , label: 'Subject Group 1 / Vak Groep 1'
             , options: ['Afrikaans Huistaal'
                        ,'Afrikaans Eerste Addisionele Taal']
             , col:{ cols: 12, md: 6 }        
             , class:"gray lighten-3 rounded elevation-4 ma-1 pa-3"     
             , row:false 
             , rules: [ required('Please select one subject from each group!') ]
             , tooltip: "A learner MUST choose one subject per group."
             },
    subject2: { type: 'radio'
             , label: 'Subject Group 2 / Vak Groep 2'
             , options: ['English Home Language'
                        ,'English First Additional Language']
             , color:"green"
             , col:{ cols : 12, md: 6 } 
             , class:"gray lighten-3 rounded elevation-4 ma-1 pa-3"
             , row:false 
             , rules: [ required('Kies asseblief een vak van elke groep') ]
             , tooltip: "‘n Leerder MOET een vak per groep kies."
             },             
     }},
       set2: { type:'wrap'
            , label:'set2'
            , col:{ cols : 12, sm:12 }
            , ripple:false
            , class:'title pa-2 rounded elevation-4 col-md-12 ma-1', 
     schema:{
    subject3: { type: 'radio'
             , label: 'Subject Group 3 / Vak Groep 3'
             , options: ['Mathematics / Wiskunde'
                        ,'Mathematical Literacy /Wiskunde geletterdheid']
             , col:{ cols : 12 } 
             , row:false 
             , class:"gray lighten-3 rounded elevation-4 ma-1 pa-3"     
             , rules: [rules.requiredSel]
             , tooltip:"Leerders wat Fisiese Wetenskap kies, MOET ook Wiskunde kies"
             },
    subject5: { type: 'radio'
             , label: 'Subject Group 4 / Vak Groep 4'
             , options: ['Life Sciences / Lewenswetenskappe'
                        ,'Geography / Geografie'
                        ,'Business studies / Besigheidstudies'
                        ,'Consumer Studies / Verbruikerstudies'
                        ,'Engineering Graphics and Design /Ingenieursgrafika & Ontwerp'
                        ,'Music / Musiek'
                        ]
             , col:{ cols : 12, xs:12 } 
             , row:false 
             , class:"gray lighten-3 rounded elevation-4 ma-1 pa-3"
             , rules: [ required('Kies asseblief een vak van elke groep') ]
             , tooltip:"Onthou: Jy kan nie dieselfde vak twee keer kies nie."
             },
    subject6: { type: 'radio'
             , label: 'Subject Group 5 / Vak Groep 5'
             , options: ['Life Sciences / Lewenswetenskappe'
                        ,'Physical Sciences / Fisiese wetenskappe'
                        ,'Business studies / Besigheidstudies'
                        ,'Computer Applications Technology / Rekenaartoepassingstegnologie'
                        ,'Tourism / Toerisme'
                        ,'History / Geskiedenis'
                        ,'Music / Musiek'
                        ]        
             , col:{ cols : 12, xs: 12 }
             , row:false 
             , class:"gray lighten-3 rounded elevation-4 ma-1 pa-3 grey--text text--darken-2"
             , rules: [ required('Please select one subject from each group') ]
             , tooltip:"EGD, IT and ART requires an aptitude test."
             },               
    subject7: { type: 'radio'
             , label: 'Subject Group 6 / Vak Groep 6'
             , options : ['History / Geskiedenis'
                         ,'Accounting / Rekeningkunde'
                         ,'Consumer Studies / Verbruikerstudies'
                         ,'Visual Arts / Visuele Kunste'
                         ,'Tourism / Toerisme'
                         ,'IT'
                         ,'Music / Musiek'
                         ,'Geography / Geografie'
                         ]
             , col : { cols : 12, xs: 12 } 
             , row:false 
             , class:"gray lighten-3 rounded elevation-4 ma-1 pa-3"
             , rules: [ required('Kies asseblief een vak van elke groep') ]
             , tooltip:"Important: You can not choose the same subject twice."
             },         
     }                            
    }},
    
  }),
  computed:{
      studFullName() {
          return this.myModel.name + ' ' + this.myModel.surname
      }
  },
  methods:{
      // eslint-disable-next-line
      log(a) {
          //console.info('LOG A = ', a.value)
      },
      test(a) {
        // eslint-disable-next-line
        let { on, id, index, key, value, obj } = a
        /*
        console.log('TEST A = ',a)
        console.log('key = ', a.key)
        console.log('value = ', a.data.key)
        console.log('on,id,index...', on, id, index, key, value, obj)
        */
        if (key == 'schoolno' && value) {
          //Here we ask the database if we have a prev dataset, and we load the latest if it is found
          this.tmpSchoolNo = value
          survey.getQuiz(this.tmpSchoolNo,this.loadModel)
        }
        if (key == 'subject6' || key == 'subject7') this.check()
        if (key == 'subject3' || key == 'subject6') {
              //'Mathematics / Wiskunde'
              console.log("===================", key, value, this.myModel.subject3, this.myModel.subject5)
        }
      },
      loadModel(response) {
        console.log('loadmodel:', response)
        if (!response.errorcode && response[0].quizdata) {
           infoSnackbar('We received previously entered data - set:' + response.length)
           this.myModel = JSON.parse( response[0].quizdata )
        } else {
           //alert('we received no data - calling getSurname.....')
           //no message needed - we have not saved data previously
           //Now do a lookup for name, surname and maybe email...
           this.loadSurname()  
        }
      },
      loadSurname() {
        if (this.tmpSchoolNo) {
            survey.lookupName(this.tmpSchoolNo,this.loadSurnameDone)
        } else {
            errorSnackbar("Invalid admission number")
        }
      },
      loadSurnameDone(response) {
         if (response.error) {
           errorSnackbar(response.error)
         } else {
           let stud = response.filter(a => a.schoolno == this.tmpSchoolNo)
           if (stud.length) {
             console.log('answer = ' , stud[0].schoolno , stud)
             this.myModel.schoolno = stud[0].schoolno
             this.myModel.surname = stud[0].surname
             this.myModel.name = stud[0].firstname
             let grade = util.getNum( stud[0].grade )
             this.myModel.grade = grade + stud[0].gclass
             if (grade != 9) {
               errorSnackbar('Our records show this student is in grade ' + grade + stud[0].gclass + '!')
             } else {
               infoSnackbar('Found ' + this.myModel.schoolno + ', ' + this.myModel.surname + ' ' + grade + stud[0].gclass)
             }
           } else {
             errorSnackbar("Something went wrong")
           }
         }
      },
      /*
      testDeStruct() {
          console.log ('back1 : ', util.zDate() )
          console.log ('back2 : ', util.zDate( [2021, 9, 13] ) )

      },*/
      check() {
        //this.valid = this.$refs.form.validate()
      },
      validate () {
        this.valid = this.$refs.form.validate()
        if (util.hasDuplicates([this.myModel.subject5,this.myModel.subject6,this.myModel.subject7])) {
          this.valid = false
          errorSnackbar('Subjects are not unique!')  
          return
        }
        if (this.myModel.subject3 !== 'Mathematics / Wiskunde' 
            && this.myModel.subject6 == 'Physical Sciences / Fisiese wetenskappe') {
            this.valid = false
            errorSnackbar('(Mathematics / Wiskunde) is needed if you select (Physical Sciences / Fisiese wetenskappe)')  
            return
        }  
        if (this.valid) {
          this.payload()
        } else {
          errorSnackbar('Not all the fields are filled in!')  
        }
      },
      payload() {
        this.myModel.dateEntered = new Date()
        survey.saveData(2 ,this.myModel.schoolno, this.myModel, this.doneSave, this.doneSave)
        this.emailresult(this.myModel)
      },
      doneSave(response) {
         if (response.result == 'OK') {
             infoSnackbar('the save is done - now sending email')
         } else {
             errorSnackbar('the save did not happen ' + response.error)
         }
      },
      reset () {
        this.$refs.form.reset()
        window.scrollTo(0,0);
      },    
      saveFile() {
       const data = JSON.stringify(this.mySchema)
       const blob = new Blob([data], {type: 'text/plain'})
       const e = document.createEvent('MouseEvents'),
       a = document.createElement('a');
       a.download = "test.json";
       a.href = window.URL.createObjectURL(blob);
       a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
       e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
       a.dispatchEvent(e);
     },
     emailresult(Answer) {
            let heading = "<h3> Subject Selection (" + this.year + ") for " + this.studFullName + '</h3>'
            heading += '<div>'
            heading += '<table width=90% style="border: 1px solid green;">'
            heading += "<tr><td>Admission Number / Toelatings Nommer<td>" + Answer.schoolno 
            heading += "<tr><td>Surname, Name / Van, Voornaam<td>" + Answer.surname + ", " + Answer.name
            heading += "<tr><td>Current Grade / Huidige Graad<td>" + Answer.grade 
            heading += "<tr><td>Group/Groep 1<td>" + Answer.subject1
            heading += "<tr><td>Group/Groep 2<td>" + Answer.subject2
            heading += "<tr><td>Group/Groep 3<td>" + Answer.subject3
            heading += "<tr><td>Group/Groep 4<td>" + Answer.subject5
            heading += "<tr><td>Group/Groep 5<td>" + Answer.subject6
            heading += "<tr><td>Group/Groep 6<td>" + Answer.subject7
            
            let ts = {method: "zmlsendmail"
                     ,htmlmessage: heading +  "</table></div><br><br><hr>" + JSON.stringify(Answer) 
                     ,email_to: [Answer.email,'wrnrsmit@gmail.com']
                     ,subject:"Grade 10 Subject Selection " + this.year + " / Graad 10 Vakkeuses " + this.year
                     ,email_from: "newsletters@kuiliesonline.co.za"
                     ,attachments: []
                     ,addsignature:''
                     ,pdffile: "defaultFile"
                    };
            //alert(ts.htmlmessage)
            infoSnackbar('Sending email to ' + Answer.email)
            zmlMail(ts,this.emailGood, this.emailBad);
            return        
     },
     emailGood(response) {
       console.log('emailgood:', response) 
       if (response.errorcode)  {
         this.resultStr = 'The form was submitted, but email NOT send. ' + response.error
       } else {
         this.resultStr = 'Well done - the email was sent to ' + this.myModel.email
       }
       infoSnackbar(this.resultStr)
       console.log(this.resultStr) 
       this.reset()
     },
     emailBad(response) {
       console.log('emailbad', response)
       this.resultStr = 'The form was submitted, but email NOT send to ' + this.myModel.email
       errorSnackbar(this.resultStr)
     },
  },
  mounted: function() {
    let d = new Date();
    this.year = d.getFullYear() + 1;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

.wordbreak {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
}

.test:hover {
  transform: scaleX(1.5);
}

</style>