<template>
<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
                :value="value"
                :label="label"                        
               :items="itemList"
                prepend-inner-icon="mdi-coffin"
                color="blue"
                item-value="placeid"
                item-text="concatsearch"
               :search-input="searchInput"
                dense outlined rounded shaped
              >
        </v-autocomplete> <!--{{ searchInput}}-->

</template>

<script>
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
export default {
   name:"ZAutoPlace",
   props:{ 
           value:{}
         , label: {type:String,default:"Place/Class"}
   },
   data: () => ({
     searchInput: null,
     placeTable: [],
  }),
  computed: {
      itemList() {
        if (!this.searchInput) {
           return this.placeTable
        }
        let si = this.searchInput.toUpperCase()

        let x = this.placeTable.filter(function(str) {
          return ( str.concatsearch.toUpperCase().indexOf(si) > -1);
        })
      
        return x
      }
  },  
  methods:{
    updateValue(e) {
      console.log('emitting ---- ', e)
      this.$emit('input', e)
    },
    getData() {
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = "SELECT p.placeid, p.name, w.name workarea, p.description "
               + "     , concat(p.name, ' (',w.name,')') concatsearch"
               + "  FROM s_place p, s_workarea w "
               + " WHERE p.workareaid = w.workareaid "
               + "ORDER BY p.name"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, this.loadData)
    },
    loadData(response) {
        this.placeTable = response
        console.log('Loaded places: ' ,response)
    }
  },  
  mounted() {
     if (this.placeTable.length < 2) this.getData()
     console.log('Start' , this.$options.name)
  }
}
</script>
