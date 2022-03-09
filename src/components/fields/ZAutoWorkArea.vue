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
import { crudTask } from "@/components/crud/crudTask.js"
export default {
   name:"ZWorkArea",
   props:{
           value:{}
         , label: {type:String,default:"Work Area"}
   },
   data: () => ({
     searchInput: null,
     workAreaTable: [],
  }),
  computed: {
      searchWorkArea() {
        if (!this.searchInput) {
           return this.workAreaTable
        }
        // Wisdom ZML
        //filter does not work on null values, so we need a "inline if" to check for a null value
        //
        let x = this.workAreaTable.filter(
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
     this.workAreaTable = response
     crudTask.save('workarea', response)
    }
  },
  mounted() {
     console.log('Start' , this.$options.name)
     this.workAreaTable = crudTask.load('workarea')
     if (this.workAreaTable.length == 0) this.getData()
  }
}
</script>
