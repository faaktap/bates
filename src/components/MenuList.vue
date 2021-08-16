<template>
<div>
 <template v-if="displayType == 1">
    <v-row v-if="list.length > 0">
      <!--v-col cols="12">
        {{ list }}
      </v-col-->
      <v-col
        v-for="item in list"
       :key="item.functionid"
        cols="4"
      >
      <template v-if="!$vuetify.breakpoint.smAndDown">
        <v-card height="200" :color="item.functionaccess | cc" >
            <v-card-title>
                {{ item.functionname }}
            </v-card-title>
         <v-card-actions>
          <zml-button-tool 
             bottom 
            :btnFace="item.shortname" 
            color="primary" 
            :toolTip="item.tip"
            :icon="item.icon"
          @clicked="click(item)" /> 
         </v-card-actions>
            <v-card-text v-if="!$vuetify.breakpoint.smAndDown">
               {{ item.tip }}
            </v-card-text>
        </v-card>
      </template>
      <template v-else>      
          <zml-button-tool 
             bottom 
            :btnFace="item.shortname" 
            color="primary" 
            :toolTip="item.tip"
            :icon="item.icon"
          @clicked="click(item)" /> 
      </template>
      </v-col>
    </v-row>
 </template>
 <template v-else>   
  <v-row v-if="list.length > 0">
    <v-col cols="12" class="d-flex flex-wrap justify-space-between pa-2"> <!-- justify-start -->
      <v-btn v-for="btn in list" 
               :color="btn.functionaccess | cc"
               :key="btn.functionid"
               class="ma-2"
               :small="$vuetify.breakpoint.mobile == true"
               :title="btn.functionname"
               :tip="btn.tip"
               @click="click(btn)"
               @mouseover="theTip=btn.description"
               @mouseleave="theTip=''"
                dark>
   
            <v-icon :small="$vuetify.breakpoint.smAndDown == true" class="ma-1">
             {{ btn.icon }}
            </v-icon>
            <template v-if="$vuetify.breakpoint.smAndUp">
              {{ btn.shortname }} 
            </template>
      </v-btn>            
    </v-col>
    <v-col cols="12">
      <fade-transition  mode="out-in" :duration="1200">
           <v-card v-if="$vuetify.breakpoint.smAndUp && theTip" class="ma-2 pa-4">
             <v-card-title>More..</v-card-title>
             <v-card-text>{{ theTip }}</v-card-text>
           </v-card>
      </fade-transition>

    </v-col>
   </v-row>
 </template>
</div>

</template>

<script>
import { infoSnackbar } from '@/api/GlobalActions';
import zmlButtonTool from '@/components/zmlButtonTool'
import { doStuff } from '@/api/buttons'
import { getters } from "@/api/store";
import FadeTransition from "@/components/transition/FadeTransition.vue";

export default {
    name:"MenuList",
    components:{zmlButtonTool, FadeTransition},
    props:['list', 'displayType','access'],
    data: () => ({
        getZml: getters.getState({ object: "gZml" }),
        theTip:''
    }),
    filters:{
        cc: function (value) {
           switch (value) {
               case 'teacher' : return "light-blue darken-3"
               case 'student' : return "green darken-2"
               case 'admin' : return "red darken-1"
               default : return "blue darken-1"
           }
        }
    },
    methods:{
       cardColor(type) {
           switch (type) {
               case 'teacher' : return "light-green lighten-3"
               case 'student' : return "green lighten-2"
               case 'admin' : return "green accent-3"
               default : return "orange lighten-4"
           }
       },        
       click(what) {
            if (doStuff(this.$router,what.payload) == 0) {
                if (what.payload.substr(0,4).toLowerCase() == 'http') {
                    window.open(what.payload,'_' + 'ko_external')
                } else {
                    infoSnackbar('Sorry, we do not handle ' + what.payload + ' yet!' )
                }
            }
        },

    },   
}
</script>