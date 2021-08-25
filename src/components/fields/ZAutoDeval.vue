<template>
<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
                :value="value"
                :label="label"                        
               :items="searchDeval"
                prepend-inner-icon="mdi-diamond"
                item-value="devalid"
                item-text="name"
               :search-input.sync="searchInput"
                dense outlined rounded shaped
              >
              <template slot="selection" slot-scope="data">
                  {{ data.item.rulename }}
              </template>
              <template slot="item" slot-scope="data">
                    {{ data.item.rulename }} 
              </template>
        </v-autocomplete>

</template>

<script>
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
export default {
   name:"ZDeval",
   props:{ 
           value:{}
         , label: {type:String,default:"Devaluation"}
   },
   data: () => ({
     searchInput: null,
     DevalTable: [],
  }),
  computed: {
      searchDeval() {
        if (!this.searchInput) {
           return this.DevalTable
        }
        // Wisdom ZML
        //filter does not work on null values, so we need a "inline if" to check for a null value
        //       
        let x = this.DevalTable.filter( 
          str => str.rulename.toUpperCase().includes(this.searchInput.toUpperCase())
        )
        return x
      }
  },  
  methods:{
    updateValue(e) {
      this.$emit('input', e)
    },
    getData() {
      let ts = {}
      ts.task = 'PlainSql'
      ts.sql = "SELECT *"
             + "  FROM s_devaluation"
             + " ORDER BY rulename"
      ts.api = zmlConfig.apiPath
      zmlFetch(ts, this.loadData)
    },
    loadData(response) {
      this.DevalTable = response
    }
  },  
  mounted() {
      if (this.DevalTable.length < 2) this.getData()
      console.log('Start' , this.$options.name)
  }
}
</script>
