<template>
<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
                :value="value"
                :label="label"
               :items="searchStockCategory"
                prepend-inner-icon="mdi-wardrobe"
                item-value="catid"
                item-text="name"
               :search-input.sync="searchInput"
                dense outlined rounded shaped
              >
              <template slot="selection" slot-scope="data">
                  {{ data.item.name }}
              </template>
              <template slot="item" slot-scope="data">
                    {{ data.item.name }}  ({{ data.item.catid }} )
              </template>
        </v-autocomplete> <!--{{ searchInput}}-->

</template>

<script>
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { crudTask } from "@/components/crud/crudTask.js"
export default {
   name:"ZStockCat",
   props:{
           value:{}
         , label: {type:String,default:"Stock Category"}
   },
   data: () => ({
     searchInput: null,
     stockCategoryTable: [],
  }),
  computed: {
      searchStockCategory() {
        if (!this.searchInput) {
           return this.stockCategoryTable
        }
        let x = this.stockCategoryTable.filter(
          str => ( str.name.toUpperCase().includes(this.searchInput.toUpperCase())
                   ||
                   str.description.toUpperCase().includes(this.searchInput.toUpperCase())
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
               + "  FROM s_category c"
               + " ORDER BY name"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, this.loadData)
    },
    loadData(response) {
        this.stockCategoryTable = response
        crudTask.save('category', response)
    }
  },
  mounted() {
     console.log('Start' , this.$options.name)
     this.stockCategoryTable = crudTask.load('category')
     if (this.stockCategoryTable.length == 0) this.getData()

  }
}
</script>
