<template>
<v-card color="light-grey accent-4" width="300" :loading="loadStatus">
  <image-uploader :debug="1" 
        :preview="false"
        :className="['fileinput', { 'fileinput--loaded': hasImage }]"
        capture="environment"
        doNotResize="gif"
        :autoRotate="true"
        :quality="0.8"
        maxWidth=200
        outputFormat="verbose"
        @input="setImage"
      > <!--maxWidth=150, in image-uplaoder, will force the size to 150x??? -->
        <v-label for="fileInput" slot="upload-label">
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32" height="32" viewBox="0 0 32 32"
            >
              <path class="path1"
                    d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
              ></path>
            </svg>
          </figure>
          <span class="upload-caption">{{ "Click to select a photo"}}</span>
        </v-label>
   </image-uploader>

</v-card>
</template>

<script>
import { zmlConfig } from '@/api/constants.js';
import { zmlFetch } from '@/api/zmlFetch.js';
import ImageUploader from '@/components/ImageUploader';
export default {
    name: "zmlPictureLoad",
    props: ['partOfFilename','extrapath'],
    components: {ImageUploader},
    data: () => ({
        loadStatus:false,
        hasImage:false,

    }),
    methods:{
      setImage(output) {
        this.hasImage = true;
        this.addFile(output)
      },  
            
      addFile(e) {
        this.loadStatus = true
        /*
        e.info.name
        e.info.newHeight
        e.info.type = "image/jpeg"
        */
        e.done = false
        e.realname = this.partOfFilename + e.info.name + this.makeid(5) + '.' + e.info.name.split('.').pop().toLowerCase()
        this.upload1(e)
      },
      upload1(fileData) {
         fileData.task = 'upload'; 
         fileData.extrapath =  this.extrapath
         fileData.name = fileData.info.name
         fileData.base64 = fileData.dataUrl.split(',')[1];
         fileData.size = fileData.dataUrl.length
         fileData.api = zmlConfig.apiUpload; 
         zmlFetch(fileData,this.doneWithUpload, this.errorWithUpload)
      }, 
      errorWithUpload(error) {
         alert('an error happened on upload of file' + error.error)
         this.loadStatus = false;
      },
      doneWithUpload(response) {
         this.$emit('file-saved',response.filename)
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

<style scoped>
#fileInput {
  display: none;
}
</style>
