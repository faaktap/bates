<template>
<div>
<v-dialog v-model="contactDialog" 
         @keydown.esc="contactDialog = !contactDialog"
         style="transform: scale(0.875);transform-origin: left;"
         overlay-color="red"
         :fullscreen="$vuetify.breakpoint.mobile">
 <v-form v-model="valid">
  <v-card class="white text--black pa-4"> 
   <v-row>
     <v-col cols="12">
      <legend>wserwerwerwerwerwer</legend>
     </v-col>
     <v-col cols="8" md="4">
      <v-text-field v-model="name" label="Name" :rules="nameRules" required />
     </v-col>
     <v-col cols="8" md="4">
      <v-text-field  v-model="email"  :rules="emailRules"  label="E-mail" required />
     </v-col>
     <v-col cols="8" md="4">
      <v-text-field v-model="phone" label="Phone" />
     </v-col>
     <v-col cols="8">
        <v-textarea  v-model="message" label="Message" />
     </v-col>
     <v-card-actions>
        <v-btn color=primary @click="sendMail"> Submit your Email </v-btn>
        <v-btn color=primary @click="contactDialog = false"> Cancel the Email </v-btn>
     </v-card-actions>
   </v-row>
  </v-card>
 </v-form>
</v-dialog>
</div>
</template>

<script>
import { zmlMail } from '@/api/zmlMail';
import { zmlConfig } from '@/api/constants';
import { getters } from "@/api/store";
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
export default {
  name: "ContactForm",
  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      valid: false,
      contactDialog: false,
      name:'',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      phone: '',
      radioGroup: '',
      message: '',
    }),   
    methods:{
        open() {
          this.contactDialog = true;
        },
        sendMail() {
          if (this.valid == false) {
            //alert('Some fields are not filled in properly!');
            errorSnackbar('Some fields are not filled in properly!');
          } else {
            let heading = "<h2> Email Enquiry from KovsieWas Website</h2>";
            heading += "<div><table><tr><td>Phone:<td>" + this.phone;
            heading += "<tr><td>Name:<td>" + this.name;
            heading += "<tr><td>Email:<td>" + this.email;
            heading += "<tr><td>Enquiry:<td>" + this.radioGroup;
            heading += "<tr><td>Message:<td>";
            let signature = '<table border=0><tr><td style="border-bottom: 1px solid blue;border-top: 1px solid blue;font-weight:bold;text-align:left;font-size:20pt;color:blue">Zi-Mari Smit<p style="font-weight:bold;text-align:left;font-size:10pt;color:blue">072 826 0575<td style="border-bottom: 1px solid blue;border-top: 1px solid blue;"><br><Font STYLE="font-size:26pt; color:red; line-height:1.69cm;font-weight:bold">S</font><FONT STYLE="font-weight:bold;text-align:left;font-size:20pt;color:red">ipress</font><font style="font-family:Arial Black,Sans-Serif;font-size=10pt;color:red"><a href=https://sipress.co.za>Wassery </a></font></td></table>';
            let ts = {method: "zmlsendmail"
                     ,htmlmessage: heading + this.message + "</table></div><br><br>" + signature
                     ,email_to: [this.email,'wrnrsmit@gmail.com','admin@zmlrekenaars.com']
                     ,subject:"Navraag aan ZmlRekenaars / Enquiry to ZmlComputers"
                     ,email_from: "werner@zmlrekenaars.co.za"
                     ,attachments: []
                    };
            zmlMail(ts,this.emailSend);
         }
        },
        emailSend(response) {
          if (response.errorcode == 0) {
             this.contactDialog = false;  
             this.message = '';
             this.email = '';
             this.phone = '';
             infoSnackbar('Thanks, your email was sent!');
          } else {
             errorSnackbar('Problem, your email was NOT sent!');
             alert(response);
             zmlConfig.cl(response);
          }

        }
    },
    mounted: function () { 
      zmlConfig.cl('CFmount : ', this.$options.name , 'c=',this.$children.length);
    },
    watch: {
     getZml: {
      deep: true,
      handler() {
        this.contactDialog = this.getZml.atester
      }
     },
     contactDialog() {
       this.getZml.atester = this.contactDialog
     }
    }
}
</script>