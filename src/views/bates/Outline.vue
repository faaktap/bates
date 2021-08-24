<template>
 <div>

   <v-btn @click="sel='cat'"  small class="ma-2"> Voorraad Kategorie </v-btn>
   <v-btn @click="sel='type'" small class="ma-2"> Voorraad Tipes </v-btn>
   <v-btn @click="sel='area'" small class="ma-2"> Area </v-btn>
   <v-btn @click="sel='class'" small class="ma-2"> Klasse? </v-btn>
    <table-item v-if="sel=='type'" 
                entity="Stock Item Types" />
    <table-stock-category v-if="sel=='cat'"
                          entity="Category" />
    <table-work-area v-if="sel=='area'"
                           entity="Work Area" /> 
<!--
    <h1> PRACTISE </h1>
    <table-filter entity="Bate" /> -->

 </div>
</template>

<script>
//import TableFilter from '@/components/crud/TableFilter.vue';
import TableWorkArea from '@/components/crud/TableWorkArea.vue';
import TableStockCategory from '@/components/crud/TableStockCategory.vue';
import TableItem from '@/components/crud/TableItem.vue';
export default {
  name: "Outline",
  components: { //TableFilter
                TableStockCategory
               ,TableItem   //Stock Item Types
               ,TableWorkArea
              },

  data: () => ({
      sel:'type',
  }),
  methods:{
  },
  mounted() {
      console.log('Table Filter Example : ',this.$options.name)
  }
    
}
</script>