<template>
<div    v-cloak 
        @drop.prevent="addFile" 
        @dragover.prevent
>
<v-card class="ma-6 pa-6" color="blue">
    <v-card-title>
        {{ titleMessage }}
         <v-file-input
            v-model="inputFiles"
             show-size
             counter
             :accept="addFile" 
             label="File input"
             ref="file"
         ></v-file-input> 
         <v-btn icon 
                 v-if="inputFiles" 
                 @click="addSingleFile(inputFiles)"
                 title="Click here to load the file into the queue"
         >

         <v-icon> mdi-file-check </v-icon>ins
         </v-btn>
    </v-card-title>
    <v-progress-linear
      v-show="busy"
      indeterminate
      color="grey darken-2"
    ></v-progress-linear>
    <v-layout>
  <!--v-flex>
    <div v-if="files.length"> 
        <v-btn @click="initiateUpload" :disabled="busy"> start upload </v-btn>
        Click Start upload, to process these files
    </div>
    </v-flex-->    
    <v-flex>    
    <table border=1 v-for="f in files" :key="f.name" color="blue lighten-1">
        <tr><td width=70%>{{ f.name }}</td><td> {{ f.size | kb }} </td> <td> {{f.ext}} </td></tr>
    </table>
        </v-flex>
        <v-flex>
   
    <v-card v-for="p in progressItems" :key="p.timeStamp"  color="blue lighten-2">
       <small> {{ p.eventPhase }} {{ p.loaded }} {{p.timeStamp}} {{ p.total }} {{ p.type }}</small>
    </v-card>
        </v-flex>
    </v-layout>

</v-card>


</div>
</template>

<script>
/*
<video-uploader @fileUploaded="receiveResponse" 
                titleMessage="select video" 
                extraPath="/Test/werner"
                >
*/
import { zmlConfig } from '@/api/constants.js';
import { zmlFetch } from '@/api/zmlFetch';
import { makeAWait, uploadFiles, addToQueue } from '@/api/fileUploadHelper.js'
import { infoSnackbar } from '@/api/GlobalActions';
  export default {
    name: "VideoUploader",
    props: ['titleMessage','extraPath','triggerUpload'],
    /*
    props: [{ titleMessage: { type: String, default: "Drop your file here" }},
            { extraPath:    { type: String, default: "/Test/werner"}},
           ],
           */
    components: {},
    data: () => ({
        files:[],
        inputFiles:null,
        busy:false,
        progressItems:[],
        progressBar:null,
        totalSize:0,
        sofarSize:0,
    }),
    filters:{
        kb: function(value) {
            return (value / 1024).toFixed(2) + ' KB'
        }
    },
    methods:{
      async addSingleFile(e) {
          //only allowed to upload one file
        this.files = []
        if (!e) {
            infoSnackbar('First select a file')
            return
        }
        if (!this.extraPath){
            infoSnackbar('We need a place to put it!')
            return
        }
        let cheatArray = []
        cheatArray.push(e)
        await makeAWait(1000,addToQueue, cheatArray, this.files)
        this.inputFiles = null
      },
      async addFile(e) {
          //only allowed to upload one file
        this.files = []
        await makeAWait(1000,addToQueue,e.dataTransfer.files, this.files)
      },

      async initiateUpload() {
        if (this.files.length == 0){
            this.$emit('fileUploaded', {fileName:''})
            return
        }
        this.busy = true
        this.totalSize = 0
        this.sofarSize =0

        let fdet = {}
        fdet.testprop = "is this a property?"
        this.totalSize = this.files.reduce( (accum,item) => accum + item.size,0)

        await makeAWait(1000,uploadFiles,this.startUpload, this.files, this.progressProg)
      },
      progressProg(data) {
          if (data.lengthComputable) {    
                this.sofarSize += data.loaded
                this.progressBar = parseInt( ((this.sofarSize / this.totalSize) * 100), 10 );
                data.howFarAreWe = this.progressBar
          }
          this.progressItems.push(data);          
      },
      startUpload(fileData, fdet) {
         let trans = {}
         trans.extrapath =  this.extraPath
         trans.name = fdet.name
         trans.realname = fdet.name
         trans.prebase64 = fileData.target.result.split(',')[0];
         trans.base64 = fileData.target.result.split(',')[1];
         trans.size = fileData.total
         trans.api = zmlConfig.apiUpload; 
         trans.task = 'upload'; 
         zmlFetch(trans,this.doneWithUpload, this.errorWithUpload)
      },
      doneWithUpload(response) {
        if (response.filename == 'undefined') {
           return
        }
        this.$emit('fileUploaded', response)
        //
        //do whatever you want to do after the upload.... and then delete file from list
        //
        for (let i = this.files.length - 1; i >= 0 ; i--) {
            if (response.filename == this.files[i].name)  {
              this.files.splice(i,1);
            }
        }
        if (this.files.length == 0) {
           this.busy = false
           this.progressItems = []
        }
      },
      errorWithUpload(response){
          console.log("UPLOAD ERROR : ", response)
      }
    },
    watch:{
        triggerUpload(n) {
            if (n != false) {
                this.initiateUpload() 
            }
        },
        inputFiles(n) {
            if (n) {
                this.addSingleFile(n)
            }
        }
        
    }
  }
</script>