<template>
        <v-autocomplete
               @input="updateValue"
               @blur.stop="passPersonID"
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
import { getters } from "@/api/store";
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
export default {
   name:"ZAutoPlace",
   props:{
           value:{}
         , label: {type:String,default:"Place/Class"}
   },
   data: () => ({
     getZml: getters.getState({ object: "gZml" }),
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
    passPersonID() {
      if (this.lastOneSelected) {
          let index = this.placeTable.findIndex(ele => ele.placeid == this.lastOneSelected)
          if (index > -1) {
            console.log(this.$options.name, 'send owner', this.placeTable[index].ownerid, 'for',this.placeTable[index].name)
            this.$emit('select',this.placeTable[index].ownerid)
          }
      }
    },
    updateValue(e) {
      this.$emit('input', e)
      this.lastOneSelected = e
    },
    getData() {
        if (this.getZml.place.length > 0) {
          this.placeTable = this.getZml.place
        } else {
          let ts = {}
          ts.task = 'PlainSql'
          ts.sql = "SELECT p.placeid, p.name, w.name workarea, p.description,p.ownerid "
               + "     , concat(p.name, ' (',w.name,')') concatsearch"
               + "  FROM s_place p, s_workarea w "
               + " WHERE p.workareaid = w.workareaid "
               + "ORDER BY p.name"
          ts.api = zmlConfig.apiPath
          zmlFetch(ts, this.loadData)
        }
    },
    loadData(response) {
        this.placeTable = response
        this.getZml.place = response
    }
  },
  mounted() {
    console.log('Start' , this.$options.name,this.placeTable.length)
     if (this.placeTable.length < 2) this.getData()
  }
}
</script>
