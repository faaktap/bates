<template>
<v-sheet>

 <base-top heading="BLAND" 
          description="SOME BBLAND STUFF">
   <slot>
     <v-layout cols="12" class="row wrap text-center d-flex justify-space-between ma-0 mb-2">
      <v-btn class="ma-2" @click="toggle=1" > Toggle 1 </v-btn>
      <v-btn class="ma-2" @click="toggle=2" > Toggle 2 </v-btn>      
      <v-btn class="ma-2" @click="toggle=3" > Toggle 3 </v-btn>      
   </v-layout>
  </slot>
 </base-top>

 <v-row>
  <v-col cols="4">
   Current route name: "{{ $route.name }}" route params: "{{$route.params }}"
   p1: "{{ p1 }}"
  </v-col>
  <v-col cols="8">
   <v-text-field v-model="selectTask" label="Task" />
   <v-text-field v-model="selectTaskSql" label="Task Sql" />
   <v-text-field v-model="selectTaskApi" label="Task Api" />
   <v-text-field v-model="entity" label="Entity" />
  </v-col>
 </v-row>
 <v-btn @click="testPush"> testPush </v-btn>
 <v-btn @click="testPropsPush"> testPropsPush </v-btn>
 <v-btn @click="runEntryTask"> run Entry Task </v-btn>
</v-sheet>  
</template>



<script>
import { getters } from "@/api/store";
import BaseTop from "@/components/base/BaseTop"
export default {
  name: "Bland",

  components: {BaseTop,
              },
  props:{
      p1:{default:"aaaaaa"}
  },
  data: () => ({
      getZml: getters.getState({ object: "gZml" }),
      toggle:null,
      selectTask:'PlainSql',
      selectTaskSql:'select * from aws_log',
      selectTaskApi:'',
      entity:'Some Entity'
  }),
  methods:{
      testPush() {
        this.$router.push({ name: 'Bland' 
                          , params:{p1:"Some P1 Info", p2:"AnotherParm" }
                          , meta: {layout: "AppLayoutGray" }}
                          );
      },
      testPropsPush() {
        let p = {selectTask:'PlainSql'
                ,selectTaskSql:'SELECT * FROM aws_sql '
                ,selectTaskApi:'https://zmlrekenaars.co.za/zml/api/general/api.php'
                ,entity:'some test'
                ,tableRecord:null
                ,tableHeader:null
                }            
        this.$router.push({ name: 'PropTest' 
                          , params:p
                          , meta: {layout: "somthing" }}
                          );
      },
      runEntryTask() {
        let p = {selectTask:this.selectTask
                ,selectTaskSql:this.selectTaskSql
                ,selectTaskApi:this.selectTaskApi
                ,entity:this.entity
                ,tableRecord:null
                ,tableHeader:null
                }            
        this.$router.push({ name: 'PropTest' 
                          , params:p
                          , meta: {layout: "somthing" }}
                          );
      },      
  },
  mounted() {
      console.log('Start', this.$options.name)
      this.toggle = 1
      
  }
};
</script>