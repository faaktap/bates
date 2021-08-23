<template>

<!--                  :rules="reqrule ? rules.required : []"  -->
        <v-autocomplete
               @input="updateValue"
                :value="value"
                :label="label"                        
               :items="searchPersonel"
                item-value="userid"
                item-text="user_fullname"
               :search-input.sync="searchInput"
                dense outlined rounded shaped
              >
              <template slot="selection" slot-scope="data">
                  {{ data.item.user_fullname }}
              </template>
              <template slot="item" slot-scope="data">
                    {{ data.item.user_name }} {{ data.item.user_fullname }}  ({{ data.item.userid }} )
              </template>
        </v-autocomplete> <!--{{ searchInput}}-->

</template>

<script>
import { getters } from "@/api/store"
export default {
   name:"ZAutoPers",
   props:{ 
           value:{}
         , label: {type:String,default:"Personel/Staff"}
   },
   data: () => ({
     getZml: getters.getState({ object: "gZml" }),
     searchInput: null,
     personelTable: [],
  }),
  computed: {
      searchPersonel() {
        if (!this.searchInput) {
           return this.getZml.persMenemonic
        }
        let x = this.getZml.persMenemonic.filter(
          str => str.user_fullname.toUpperCase().includes(this.searchInput.toUpperCase())
        )
        console.log(x.length, x)
        return x
      }
  },  
  methods:{
    updateValue(e) {
      this.$emit('input', e)
    }
  },  
  mounted() {
     this.personelTable = this.getZml.persMenemonic
     if (this.getZml.persMenemonic.length < 2) alert('PERSMM not loaded yet')
     console.log('Start' , this.$options.name)
  }
}
</script>
