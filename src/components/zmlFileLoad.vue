<template>
<v-card color="light-grey accent-4" width="300">
<v-file-input
            v-model="inputFiles"
             show-size
             label="Fetch a Photo"
             :rules="fileRules"
             prepend-icon="mdi-image"
             append-outer-icon="mdi-file-upload"
             ref="file"
             @click:append-outer="addFile(inputFiles)"
         ></v-file-input> 
<br />
</v-card>
</template>

<script>
import { zmlConfig } from '@/api/constants.js';
import { zmlFetch } from '@/api/zmlFetch.js';
import { infoSnackbar } from '@/api/GlobalActions';
export default {
    name: "zmlFileLoad",
    props: [],
    components: {},
    data: () => ({
        fileRules: [
          value => !value || value.size < 4000000 || 'File size should be quite small!',
        ],    
        files: [],
        inputFiles: null,
        loadStatus:false,

    }),
    methods:{
      addFile(e) {
        if (!e) { infoSnackbar('no file is selected, click the paperclip'); return   }
        if (e.size > zmlConfig.maxUploadSize || e.size == 0)  {
           infoSnackbar('Your file is too big - put on memory stick and leave at reception for Werner, please try again')                
           return
        }
        e.done = false
        e.realname = "testtheName-" + this.makeid(5) + '.' + e.name.split('.').pop().toLowerCase()
        this.files.push(e);
        this.inputFiles = []
        this.uploadTheFilesCheck() 
      },
      uploadTheFilesCheck() {
        this.uploadFiles(this.upload1, this.files[0])
      },
      uploadFiles(nextProc,fdet) {
        this.files.forEach(file => {
          this.loadStatus = true;
          let fr = new FileReader()
          fr.onload = function(response) {
           nextProc(response,fdet)
          };
          fr.onerror = function(response) {
            console.log('res - Some Error!' ,response);
          };
          fr.readAsDataURL(file);
        });
      },
      upload1(fileData,fdet) {
         fileData.task = 'upload'; 
         fileData.extrapath =  "/bib/assets/staff/"
         fileData.name = fdet.name
         fileData.realname = fdet.realname
         fileData.prebase64 = fileData.target.result.split(',')[0];
         fileData.base64 = fileData.target.result.split(',')[1];
         fileData.size = fileData.total
         fileData.api = zmlConfig.apiUpload; 
         zmlFetch(fileData,this.doneWithUpload, this.errorWithUpload)
      }, 
      doneWithUpload(response) {
         this.files.forEach(file => {
            if (response.filename == file.name)  {
              file.done = true
            }
         })
         this.$emit('file-saved',response.filename)
         this.files = [];         
         this.loadStatus = false;
      },
      makeid(idlen) {
         let result           = '';
         const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         const charactersLength = characters.length;
         for ( let i = 0; i < idlen; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
         return result;
      },
    },
}      

</script>