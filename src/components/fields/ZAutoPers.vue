<template>
<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
               @blur.stop="passSomething"
                :value="value"
                :label="label"
               :items="searchPersonel"
                prepend-inner-icon="mdi-human"
                item-value="persid"
                item-text="concatsearch"
               :search-input.sync="searchInput"
                dense outlined rounded shaped
              >
              <template slot="selection" slot-scope="data">
                  {{ data.item.concatsearch }}
              </template>
              <template slot="item" slot-scope="data">
                    {{ data.item.fullname }} {{ data.item.menemonic}}
              </template>
        </v-autocomplete>
</template>

<script>
import { getters } from "@/api/store";
import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
export default {
   name:"ZAutoPers",
   props:{
     value:{}
    ,label: {type:String,default:"Personel/Staff"}
   },
   data: () => ({
     getZml: getters.getState({ object: "gZml" }),
     searchInput: null,
     personelTable: [],
     lastOneSelected:null,
  }),
  computed: {
      searchPersonel() {
        if (!this.searchInput) {
           return this.personelTable
        }
        let x = this.personelTable.filter(
          str => str.concatsearch.toUpperCase().includes(this.searchInput.toUpperCase())
        )
        console.log(x.length, x)
        return x
      }
  },
  methods:{
    passSomething() {
      if (this.lastOneSelected) {
          let index = this.personelTable.findIndex(ele => ele.typeid == this.lastOneSelected)
          if (index > -1) {
            //we cannot send room, since we have no key number
            //this.$emit('select',this.personelTable[index].room)
          }
      }
    },
    updateValue(e) {
      this.$emit('input', e)
      this.lastOneSelected = e
    },
    getData() {
        if (this.getZml.owner.length > 0) {
          this.personelTable = this.getZml.owner
        } else {
          let ts = {}
          ts.task = 'PlainSql'
          ts.sql = "SELECT persid, concat(surname,', ',name) fullname, public_preferredname ,menemonic"
                 + "     , concat(surname,', ',name, ' (',ifnull(menemonic,'NON'),')') concatsearch, room"
                 + "  FROM dkhs_personel "
                 + " ORDER BY surname"
          ts.api = zmlConfig.apiPath
          zmlFetch(ts, this.loadData)
        }
    },
    loadData(response) {
        this.personelTable = response
        this.getZml.owner = response
    }
  },
  mounted() {
    if (this.personelTable.length < 2) this.getData()
     console.log('Start' , this.$options.name, 'lastone?',this.lastOneSelected)
  }
}
</script>
