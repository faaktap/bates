<template>
<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
                :value="value"
                :label="label"                        
               :items="searchWorkArea"
                prepend-inner-icon="mdi-image-area"
                item-value="workareaid"
                item-text="name"
               :search-input.sync="searchInput"
                dense outlined rounded shaped
              >
              <template slot="selection" slot-scope="data">
                  {{ data.item.name }}
              </template>
              <template slot="item" slot-scope="data">
                    {{ data.item.name }}  
              </template>
        </v-autocomplete> <!--{{ searchInput}}-->

</template>

<script>
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
export default {
   name:"ZWorkArea",
   props:{ 
           value:{}
         , label: {type:String,default:"Work Area"}
   },
   data: () => ({
     searchInput: null,
     WorkAreaTable: [],
  }),
  computed: {
      searchWorkArea() {
        if (!this.searchInput) {
           return this.WorkAreaTable
        }
        // Wisdom ZML
        //filter does not work on null values, so we need a "inline if" to check for a null value
        //       
        let x = this.WorkAreaTable.filter( 
          str => ( str.name ? str.name.toUpperCase().includes(this.searchInput.toUpperCase()) : false
                   || 
                   str.description ? str.description.toUpperCase().includes(this.searchInput.toUpperCase()) : false
        )
        )
        console.log(x.length, x)
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
               + "  FROM s_workarea"
               + " ORDER BY name"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, this.loadData)
    },
    loadData(response) {
        this.WorkAreaTable = response
    }
  },  
  mounted() {
     if (this.WorkAreaTable.length < 2) this.getData()
     console.log('Start' , this.$options.name)
  }
}
</script>
