<template>
<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
                :value="value"
                :label="label"                        
               :items="searchItemType"
                prepend-inner-icon="mdi-sitemap"
                item-value="typeid"
                item-text="concatsearch"
               :search-input.sync="searchInput"
                dense outlined rounded shaped
              >
              <template slot="selection" slot-scope="data">
                  {{ data.item.name }}
              </template>
              <template slot="item" slot-scope="data">
                    {{ data.item.concatsearch }} 
              </template>
        </v-autocomplete> 

</template>

<script>
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
export default {
   name:"ZAutoItemType",
   props:{ 
           value:{}
         , label: {type:String,default:"Item Type"}
   },
   data: () => ({
     searchInput: null,
     ItemTypeTable: [],
  }),
  computed: {
      searchItemType() {
        if (!this.searchInput) {
           return this.ItemTypeTable
        }
        // Wisdom ZML
        //filter does not work on null values, so we need a "inline if" to check for a null value
        //       
        let x = this.ItemTypeTable.filter( 
          str => ( str.concatsearch.toUpperCase().includes(this.searchInput.toUpperCase()) )     
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
        ts.sql = "SELECT i.typeid, i.name, i.stocktype, c.name category"
               + "     , concat(i.name, ' (' , ifnull(c.name,'CAT') , ')' ) concatsearch"
               + "  FROM s_itemtype i, s_category c "
               + " WHERE i.catid = c.catid "
               + "ORDER BY i.name"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, this.loadData)
    },
    loadData(response) {
        this.ItemTypeTable = response
    }
  },  
  mounted() {
     if (this.ItemTypeTable.length < 2) this.getData()
     console.log('Start' , this.$options.name)
  }
}
</script>
