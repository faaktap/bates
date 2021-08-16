<template>
 <v-container>
  <v-row class="justify-center"  align="center" justify-center>
  
    <v-col v-if="getZml.login.isAuthenticated" 
           class="mx-auto my-12">
     <v-card max-width="500"
           color=#F5F5F5>
      <v-card-title>
       <h2> Kuilies Session Status  </h2>
      </v-card-title>  
      
      <v-card-text class="ma-2">
        <v-card color="gray" class="ma-2 pa-4">
       You are logged in as {{ getZml.login.username }} since {{ getZml.login.lastdate }}.
        </v-card>
       <br>
       Thanks for using the system {{ getZml.login.fullname }}!
       <br>You will be logged out once you click the button below.
       <br>
       <br>To continue your session, press the back button.
       <br>To go to your default place of business, press the continue button.
       <br>To make changes to your profile, click the appropiate button.
      </v-card-text>
      <v-card-actions>
       <v-btn  @click="showProfile = !showProfile" color="info">
        Profile
       </v-btn>          
       <v-btn @click="doBack" color="primary"> Back </v-btn>
       <v-btn color="info" @click="startLearning"> Continue </v-btn>
        <v-spacer />
       <v-btn  @click="logout" color="info">
        Logout
       </v-btn>  
      </v-card-actions>        
     </v-card>
    </v-col>
<!-- ------------------------------------ -->    
     <v-col v-else 
             class="mx-auto my-12 justify-center"> 
     <v-hover v-slot:default="{ hover }">
      <v-card  xmax-width="500"
           color=#F5F5F5
           style="xoverflow: auto;"
          :elevation="hover ? 12 : 2"
          :class="{'on-hover': hover,'overwrite-hover': $vuetify.breakpoint.xsOnly}"
      >
       <v-card-title>
        <h2> Kuilies Login</h2>
       </v-card-title>
       <v-card-text>
        <v-form class="px-3" ref="loginForm" width="400" v-on:submit.prevent="onSubmit">
         <v-text-field  label="User" 
            v-model="loginObj.username" 
            autocomplete="username"
            prepend-icon="mdi-account-circle" 
            :rules="inputRules"
            autofocus 
         />
         <v-text-field 
            label="Password" 
            autocomplete="current-password"
            v-model="loginObj.password" 
            prepend-icon="mdi-lock" 
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'" 
            v-on:keyup.enter="onEnter"
         />
        </v-form>
       </v-card-text>
       <v-card-actions>
        <v-btn @click="registrationMessage()" class="mx-0 mt-3" color="info"> Register </v-btn>
        <v-spacer />
        <v-btn 
            class="mx-0 mt-3"
            :loading="submitting"
            @click.prevent="submit"
            color="info"
            :disabled="submitting"
        >  Login </v-btn>        
       </v-card-actions>   
      </v-card>
  </v-hover>
 </v-col><!-- Else End-->
     </v-row>
     
    <v-row>
      <v-col> 
        <v-card class="ma-5 pa-4" v-show="getZml.login.isAuthenticated == false"> 
          <v-icon color="purple darken-2"> mdi-help-circle-outline </v-icon> If you are a learner, your login would start with your schoolno, and 
          if you are a teacher it would be your teacher login details. Request them from Werner at  082 563 9790
          if you are unsure.</v-card>  
        <v-card class="ma-5 pa-4" v-show="getZml.login.isAuthenticated == true"> 
          <v-icon color="purple darken-2"> mdi-help-circle-outline </v-icon> 
          If you have any questions or problems on this site, feel free to share any ideas
          with us. Drop an email to werner@zmlrekenaars.co.za. If you have content problems, speak to
          your teacher.</v-card>  

      </v-col>
    </v-row>
    <v-container>


<!-- PROFILE --------------------->      
    <v-dialog v-model="showProfile" :scrollable="false" 
              persistent width="50%" dark
              :fullscreen="$vuetify.breakpoint.smAndDown"
              >
      <v-row>
        <v-col cols="12">
      <v-card>
        <v-card-title> Registration Complete  {{ getZml.login.type }}</v-card-title>
        <v-card-subtitle> Please make note of your password, or change it</v-card-subtitle>
        <v-card-text>

         <v-text-field 
               v-model="getZml.login.username" 
               :disabled="getZml.login.userid > 0"
               label="Username" />
         <v-text-field 
            v-model="getZml.login.password" 
            label="Password" 
            prepend-icon="mdi-lock" 
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'" 
            required />
         <v-text-field v-model="getZml.login.fullname" label="Fullname" required />
         <v-text-field v-model="getZml.login.phone" label="Phone"  />
         <v-text-field v-model="getZml.login.email" label="Email"  />

         <template v-if="getZml.login.grade || getZml.login.userid==1">
           <v-card class="ma-4 pa-2">
           Grade:{{ getZml.login.grade }}, Type:{{getZml.login.type}}
           </v-card>
         </template>

        </v-card-text>
        <v-card-actions>
          <v-btn color="info" @click="startLearning"> Continue </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="saveDetails"> Save </v-btn>
        </v-card-actions>
      </v-card>
        </v-col>
      </v-row>
    </v-dialog>
    </v-container>
  </v-container>
</template>


<script>
// eslint-disable-next-line
import { infoSnackbar,errorSnackbar } from '@/api/GlobalActions';
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { zmlLog } from '@/api/zmlLog.js';
//import router from '@/router';
import { getters } from "@/api/store";
import { zData } from "@/api/zGetBackgroundData.js"

export default {
     name: "login"
    ,props: []
    ,components: {}
    ,computed: {
      testMe() {
        return ('hallo');
      }
    }    
    ,data() {
      return {
        hover: false,
        loginObj: {username:'', password: ''},
        getZml: getters.getState({ object:"gZml" }),
        inputRules: [
           v => v.length >= 3 || 'Minimum lenth is 3 characters'
        ],
        submitting: false,
        loginIcon: 'mdi-human-greeting',
        loading: null,
        showPassword: false,
        showProfile: false,          
      }
  }
  ,methods: {
    getData() {
      zData.initialData('Load Important Data')
      zData.calendarData('Load Holiday and Birthday Data') 
      zData.functionData('Load functions') 
    },
    doBack() {
      this.getData();
      zmlLog(this.getZml.login.username , "Login", this.getZml.login.userid + ',' + this.getZml.login.lastdate)      
      if (this.getZml.login.password == 'password' || this.getZml.login.password.length < 3) {
        errorSnackbar("Your password's to easy! Click on the eye to view and change it")
        return
      }
      this.$router.go(-1)
    },
    startLearning() {
      this.getData();
      this.loadLearn()
    },
    loadLearn() {
      
      
      switch (this.getZml.login.type) {
        case 'student' :
        {
           //we have a grade value of 09E2 in login.grade, and we want to split it.
           //slice(startIndex[, endIndex])
           this.getZml.gradeLastChosen = 'G' + this.getZml.login.grade
           this.getZml.login.class  = this.getZml.login.grade.slice(3,4)
           this.getZml.login.gclass = this.getZml.login.grade.slice(2,4)
           //alert(this.getZml.login.grade)
           this.getZml.login.grade  = this.getZml.login.grade.slice(0,2).padStart(2,'0')
           //alert(this.getZml.login.grade)
           this.$router.push({ name: 'Home' , meta: {layout: "AppLayoutDefault" }})
           break;
        }
        case 'teacher':
        {
          this.$router.push({ name: 'RealHome' , meta: {layout: "AppLayoutDefault" }});  
          break;
        }
        case 'admin' :
        {
          this.$router.push({ name: 'RealHome' , meta: {layout: "AppLayoutDefault" }});  
          break;
        }
        default:
        {
          this.$router.push({ name: 'Grade' ,meta: {layout: "AppLayoutGray" }});  
          break;
        }
      }
    },

    onEnter: function() {
       if (this.getZml.login.isAuthenticated) {
         this.logout();
       } else {
         this.submit();
       }
    },
    registrationMessage() {
        infoSnackbar("Sorry! No registration from Login Form. You are already registered.")
    },
    logout() {
          const bye = 'Thanks for using the system ' + this.getZml.login.fullname + '!'
          infoSnackbar(bye);         
          this.getZml.login.class = ''
          this.getZml.login.gclass = ''
          this.getZml.login.grade = ''
          this.getZml.login.lang = ''
          this.getZml.login.fullname = ''
          this.getZml.login.password = ''
          this.getZml.login.studentid = ''
          this.getZml.login.type = ''
          this.getZml.login.username = ''
          this.getZml.login.isAuthenticated = false;
          localStorage.removeItem('login')
          this.$router.push({ name: 'Home'}); // ,meta: {layout: "AppLayoutGray" }});
    },
    submit() {
          if (this.$refs.loginForm.validate() && this.submitting == false) {
              this.getZml.login.isAuthenticated = 0;
              this.submitting = true;
              /* Do so php and mysql here... */
              const login = {
                  task: 'login',
                  api: zmlConfig.apiDKHS,
                  username: this.loginObj.username,
                  password: this.loginObj.password};
              zmlFetch(login, this.doneWithLogin, this.loginFail);
          } else {
              this.loginIcon = 'mdi-emoticon-wink-outline';
              infoSnackbar("Please enter better values!");
          }
    },
    loginFail(error) {
        this.submitting = false;                 
        infoSnackbar('LoginFailed: We could not make contact with our server. (' + error + ')')
    },
    doneWithLogin(response) {
        console.log('doneWithLogin',response)
        this.submitting = false;
        if (response.error == '') {
            this.getZml.login = response;
            this.getZml.login.isAuthenticated = true;
            this.getZml.login.grade = response.grade;
            this.getZml.login.fullname = response.fullname;
            this.getZml.login.email = response.email;
            this.getZml.login.phone = response.phone;
            this.getZml.login.password = response.password;
            this.getZml.login.studentid = response.studentid;
            this.getZml.login.type = response.type;
            this.getZml.login.username = response.username;
            this.getZml.login.userid = response.userid ? response.userid : 0;
            this.getZml.login.logins = response.logins;
            this.getZml.login.lastdate = response.lastdate;
            if (this.getZml.login.grade.indexOf('A') == -1) {
              this.getZml.login.lang = 'E'
            } else {
              this.getZml.login.lang = 'A'
            }
            console.log('welcome',response.username, this.getZml.login.lang, this.getZml.login.grade,'idx=',this.getZml.login.grade.indexOf('A'))
            this.dropAnEmail()
            if (response.added == 1  || response.password == 'password') {
              infoSnackbar('Welcome ' + this.getZml.login.fullname + ', please update your details');
              this.showProfile = 1; 
            } else {
              infoSnackbar('Welcome ' + response.fullname  + '(' + response.username + ')' )
              let loginDetails = JSON.stringify(this.getZml.login)
              localStorage.setItem('login', loginDetails)
              this.startLearning()
            }
          } else {
            errorSnackbar('Auth Failed:' + response.error)
          }
    },
    saveDetails() {
        //we need to send the stuff for an update
        const login = {
            task: 'loginupdate',
            api: zmlConfig.apiDKHS,
            data: this.getZml.login}
        zmlFetch(login,this.doneWithUpdate, this.failUpdate)
      },
    doneWithUpdate(response) {
        if (response.errorcode == 0 ) {
           infoSnackbar('Your details has been updated ' + this.getZml.login.fullname)
        } else {
           errorSnackbar('We have a problem to update your details ' + response.error)
        }
      },
    failUpdate(response) {
      errorSnackbar('We have a problem to update your details ' + response.errorcode)
    },
    dropAnEmail() {
      this.getZml.login.password = 'secret'
      let email = 
              { subject  : "Learn1 : User has logged on " + this.getZml.login.fullname
               ,email_to :"faaktap@gmail.com"
               ,htmlmessage : '<h2> LEARN1 - logged on ' + zmlConfig.projectID + '</h2>'
                       + '<br>Username : '  + this.getZml.login.username 
                       + '<br>Fullname : '  + this.getZml.login.fullname 
                       + '<br>Language : '  + this.getZml.login.lang
                       + '<br>Logins : '    + this.getZml.login.logins
                       + '<br>Phone : '     + this.getZml.login.phone
                       + '<br>Studentid : ' + this.getZml.login.studentid
                       + '<br>Type : '      + this.getZml.login.type  
                       + '<br>Username : '  + this.getZml.login.username 
                       + '<br>Grade : '     + this.getZml.login.grade
                       + '<br>GClass : '    + this.getZml.login.gclass
                       + '<br>JSON'         + JSON.stringify( this.getZml.login )
               ,email_from : "admin@kuiliesonline.co.za"};
      zData.sendEmail(email)
    },
  },
  created: function() {  
  },
  mounted: function () {
    //Check localstorage...
    if (localStorage.getItem('login')) {
      try { 
        this.getZml.login = JSON.parse(localStorage.getItem('login'));
      } catch(e) {
        localStorage.removeItem('login')
      }
    }
  }
}
</script>