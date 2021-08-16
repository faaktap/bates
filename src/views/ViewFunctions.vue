<template>
<div>
<v-container v-if="getZml.login.username=='werner'">
 
 <v-toolbar color="primary">
    <v-toolbar-title> 
      <div class="d-flex flex-no-wrap justify-space-between pr-4 ">
       <div>
         Edit Menu functions : {{ getZml.login.fullname}} / {{ getZml.login.username}}
       </div>
       <div>
        <v-btn   small 
         absolute top right
         title="Click here to load functions"  @click="loadFunctions"> Refresh </v-btn>
       </div>
      </div>
    </v-toolbar-title>
</v-toolbar>
{{ selected }}
  <v-text-field
           v-model="search"
           append-icon="mdi-magnify"
           label="Search"
           single-line
           hide-details
   ></v-text-field>
   <v-data-table
     v-if="getZml.login.username=='werner'"
    :headers="functionHeader"
    :items="getZml.functions"
    :items-per-page="15"
    :search="search"
     class="elevation-1"
     color="blue lighten-3"
     @click:row="editFunc"
  >
      <template v-slot:[`item.icon`]="{ item }">
        <v-icon >
        {{ item.icon }}</v-icon>
      </template>
    <template v-slot:[`footer.page-text`]>
       <v-btn icon @click="insertFunc"> 
           <v-icon >mdi-table-plus</v-icon>
        </v-btn>
    </template>

  </v-data-table>
</v-container>



<v-dialog v-model="showFunctionUpdate" 
          v-if="f" 
          xwidth="auto " 
          :fullscreen="$vuetify.breakpoint.smAndDown" >
  <v-card>
    <v-card-title>  
      <v-card color="light-blue" class="ma-4 pa-4">
       Update Function - {{ f.functionname }} - {{ f.shortname }} - "{{ f.payload }}" - <v-icon> {{ f.icon }} </v-icon>
      </v-card>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap align-content-start justify-space-between class="ma-2">
        <v-flex xs10 md6>
          <v-text-field v-model="f.functionname" 
                        dense
                        label="Function Full Name"  />
        </v-flex>
        <v-flex xs10 md6>
          <v-text-field v-model="f.shortname" 
                        dense
                        label="Shortname" />
        </v-flex>
        <v-flex xs8 md6>
         <v-radio-group v-model="f.functionaccess" 
                        label="Access"  
                        dense
                        row>
           <v-radio v-for="t in ['teacher','student','other','admin']" :key="t"  :label="t"   :value="t"  >
           </v-radio>
         </v-radio-group>          
        </v-flex>
        <v-flex xs3 md3>
               <v-text-field v-model="f.functiontype" 
                             label="Function Type" />
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="f.icon" 
                        label="Icon" 
                        title="Icon to show" /><v-icon small> {{ f.icon }} </v-icon>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="f.sortorder" 
                        label="Sortorder" 
                        title="Where to display" />
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="f.payload" 
                        label="payload" 
                        title="where to fo to?" />
        </v-flex>
        <v-flex xs12 md6>
               <v-textarea v-model="f.tip" 
                             label="Tip to display to user." />
        </v-flex>        
        <v-flex xs12 md6>
          <v-textarea v-model="f.description" label="Description" 
                        title="Long text field - not used at the moment" />
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
     <v-btn @click="saveFunc"> Save </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</div>
</template>

<script>
import { zmlConfig } from '@/api/constants';
import { getters } from "@/api/store";
import { zmlFetch } from '@/api/zmlFetch.js';
import { doStuff } from '@/api/buttons'
export default {
    name:"ViewFunctions",
    components:{},
    data: () => ({
        getZml: getters.getState({ object: "gZml" }),
        search:null,
        selected:null,
        showFunctionUpdate: false,
        f:{},
        functionHeader: [
          {text: 'ID',             value: 'functionid' },
          {text: 'Name',             value: 'functionname' },
          {text: 'ShortName',             value: 'shortname' },
          {text: 'Type',             value: 'functiontype' },
          {text: 'Access',             value: 'functionaccess' },
          {text: 'Tip',             value: 'tip' },
          {text: 'Sort',             value: 'sortorder' },
          {text: 'icon',             value: 'icon' },
        ],     
    }),
    computed:{
    },
    methods:{
      saveFunc() {
        let ts = {}
        ts.data = this.f
        ts.task = 'updateFunction' 
        ts.api = zmlConfig.apiDKHS
        zmlFetch(ts, this.loadFunctions, this.loadError)
      },
      editFunc(value) {
        this.f = value
        this.showFunctionUpdate = !this.showFunctionUpdate
      },
      insertFunc() {
        this.f =  { "functionid": "0"
                  , "sortorder": "99"
                  , "functionname": ""
                  , "shortname": ""
                  , "payload": "/payload"
                  , "functiontype": "local"
                  , "functionaccess": "admin"
                  , "tip": ""
                  , "grade": null
                  , "icon": "mdi-kettle-steam"
                  , "description": null
                  , "create_timestamp": null
                  , "update_timestamp": null
                  }
        this.showFunctionUpdate = !this.showFunctionUpdate
      },
      click(what) {
           if (doStuff(this.$router,what.payload) == 0) {
             alert('we cannot handle ' + what.payload + ' yet')
            }
      },
      loadFunctions() {
           this.showFunctionUpdate = false
           let ts = {};
           ts.task = 'PlainSql';
           ts.sql = 'select * from dkhs_lfunction order by sortorder'
           ts.api = zmlConfig.apiDKHS
           zmlFetch(ts, this.showData, this.loadError)
      },
      loadError(response) {
            alert(response)
      },
      showData(response) {
           this.getZml.functions = response
      }
    },
    activated:function() {
    },
    mounted: function() {
        this.loadFunctions()
    }
}
</script>

