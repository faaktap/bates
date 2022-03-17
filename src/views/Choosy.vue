<template>

  <v-card>
    <v-card-title> Click on a button on left, and then on an item on the right </v-card-title>
    <v-card-text> The buttons on the left is to categorize the items, if you feel an item is missing or in the wrong place,
      you can move it or add it yourself. See the <strong>"categorize and refine" button</strong> in the toolbar at the top. </v-card-text>
<v-row>
 <v-col cols="6">
   <v-card  class="ma-2 pa-2"> Main Categories.</v-card>
    <v-simple-table>
    <tr v-for="c in cat" :key="c.id">
      <td> <v-btn small class="ma-2" @click="show(c)">{{ c }}</v-btn></td>
    </tr>
    </v-simple-table>
</v-col>
<v-col cols="6">
    <v-card class="ma-2 pa-2">Items in {{ selectedCategory || 'Main Categories.'}}</v-card>
    <ul v-for="i in catItems" :key="i.typeid">
      <li><v-btn @click="takeBack(i)" text> {{ i.name }} </v-btn> </li>
    </ul>
</v-col>
</v-row>
  </v-card>

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
     showHelp:true,
     itemTypeTable: [],
     cat:[],
     catItems:[],
     selectedCategory:''
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
    takeBack(obj){
      this.$emit('input', obj.typeid)
      this.$emit('objectSelected',obj)
    },
    show(c) {
      this.selectedCategory = c
      //Old way of doing it....
      // const filterArray = (array, fields, value) => {fields = Array.isArray(fields) ? fields : [fields]};
      // this.catItems = filterArray(this.itemTypeTable, 'category', c)
      this.catItems = this.itemTypeTable.filter(e => e.category == c)

    },
    getData() {
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql =
        `SELECT i.typeid, i.name, i.stocktype, c.name category, c.description longdesc \
              , concat(i.name, ' (' , ifnull(c.name,'CAT') , ')' ) concatsearch \
           FROM s_itemtype i, s_category c \
          WHERE i.catid = c.catid \
       ORDER BY concatsearch ASC`
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, this.loadData)
    },
    loadData(response) {
      this.itemTypeTable = response
      crudTask.save('itemtype', response)
      //Two methods to only get unique
      // console.log([...new Set(this.itemTypeTable.map(it => it.category))])
      this.popCat()
    },
    popCat() {
      const distinctBy = (prop, arr) => [...new Set(arr.map(o => o[prop]))]
      this.cat = distinctBy('category', this.itemTypeTable)
    }
  },
  mounted() {
     console.log('Start' , this.$options.name, this.itemTypeTable.length)
     this.itemTypeTable = crudTask.load('itemtype')
     if (this.itemTypeTable.length == 0) {
       this.getData()
     } else {
       this.popCat()
     }
  }
}
</script>
