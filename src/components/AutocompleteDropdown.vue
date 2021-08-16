<template>
  <div class="dropdown">
    <v-text-field v-model="searchText" :label="adlabel">

    </v-text-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
    }
  },
  props:{
    value: null,
    adlabel: {default: "wat is label",type:String},
    options: {
      type: Array,
      required: true      
    }
  },
  computed: {
    matches () {
      return Object.entries(this.options).filter((option) => {
        var optionText = option[0].toUpperCase()
        return optionText.match(this.searchText.toUpperCase())
      })
    }
  },  
}
</script>