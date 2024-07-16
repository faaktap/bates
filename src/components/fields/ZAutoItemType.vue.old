<template>
<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
               @blur="passItemText"
                :value="value"
                :label="label"
               :items="searchItemType"
                prepend-inner-icon="mdi-sitemap"
               :search-input.sync="searchInput"
                item-value="typeid"
                item-text="concatsearch"
                dense outlined rounded shaped
                append-icon="mdi-close"
                append-outer-icon="mdi-magnify"
                @click:append-outer="emitChoosy"
                @click:append="clearValue"
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
import { crudTask } from "@/components/crud/crudTask.js"
export default {
   name:"ZAutoItemType",
   props:{
           value:{}
         , label: {type:String,default:"Item Type"}
   },
   data: () => ({
     searchInput: null,
     itemTypeTable: [],
     lastOneSelected:''
  }),
  computed: {
    searchItemType() {
        if (!this.searchInput) {
           return this.itemTypeTable
        }
        // Wisdom ZML
        //filter does not work on null values, so we need a "inline if" to check for a null value
        //
        let x = this.itemTypeTable.filter(
          str => ( str.concatsearch.toUpperCase().includes(this.searchInput.toUpperCase()) )
        )
        return x
      }
  },
  methods:{
    emitChoosy(e) {
      console.log(e)
      this.$emit('moreHelp')
    },
    clearValue(e) {
      console.log('on clear buttin:', e)
      // Do not change the value here - just emit blank otherwise handler.apply is not a function
      // this.updateValue = ''
      this.$emit('input', '')
      let index = this.itemTypeTable.findIndex(ele => ele.typeid == e)
      if (index > -1) {
        console.log(this.$options.name, 'send object')
        this.$emit('objectSelected',this.itemTypeTable[index])
      }
    },
    passItemText() {
      if (this.lastOneSelected) {
          let index = this.itemTypeTable.findIndex(ele => ele.typeid == this.lastOneSelected)
          if (index > -1) {
            this.$emit('select',this.itemTypeTable[index].name)
          }
      }
    },
    updateValue(e) {
      console.log('updateValue emit = ', e)
      this.$emit('input', e)

      let index = this.itemTypeTable.findIndex(ele => ele.typeid == e)
      if (index > -1) {
        console.log(this.$options.name, 'send object')
        this.$emit('objectSelected',this.itemTypeTable[index])
      }

      this.lastOneSelected = e
      this.passItemText(e)
    },
    getData() {
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = `SELECT i.typeid, i.name, i.stocktype, c.name category, c.description longdesc\
                       , concat(i.name, ' (' , ifnull(c.name,'CAT') , ')' ) concatsearch\
                   FROM s_itemtype i, s_category c\
                  WHERE i.catid = c.catid\
               ORDER BY concatsearch ASC`
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, this.loadData)
    },
    loadData(response) {
        this.itemTypeTable = response
        crudTask.save('itemtype', response)
    }
  },
  mounted() {
     console.log('Start' , this.$options.name, this.itemTypeTable.length)
     this.itemTypeTable = crudTask.load('itemtype')
     if (this.itemTypeTable.length == 0) this.getData()
  }
}
</script>
