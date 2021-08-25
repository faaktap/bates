<template>
 <div>

   <v-btn @click="sel='cat'"  small class="ma-2"> Voorraad Kategorie </v-btn>
   <v-btn @click="sel='type'" small class="ma-2"> Voorraad Tipes </v-btn>
   <v-btn @click="sel='area'" small class="ma-2"> Area </v-btn>
   <v-btn @click="sel='class'" small class="ma-2"> Klasse? </v-btn>
   <v-btn @click="sel='stock'" small class="ma-2"> Stock </v-btn>
   <v-btn @click="sel='journal'" small class="ma-2"> Journal </v-btn>
    <table-item v-if="sel=='type'" 
                entity="Stock Item Types" />
    <table-stock-category v-if="sel=='cat'"
                          entity="Category" />
    <table-work-area v-if="sel=='area'"
                     entity="Work Area" /> 
    <table-place v-if="sel=='class'"
                     entity="Classroom" /> 
    <table-journal v-if="sel=='journal'"
                     entity="Journal" />  
    <table-stock v-if="sel=='stock'"
                     entity="Stock" /> 
    <h1> PRACTISE </h1>
    <table-filter entity="Bate" /> 
 </div>
</template>

<script>
import TableFilter from '@/components/crud/TableFilter.vue';
import TableWorkArea from '@/components/crud/TableWorkArea.vue';
import TableStockCategory from '@/components/crud/TableStockCategory.vue';
import TableItem from '@/components/crud/TableItem.vue';
import TablePlace from '@/components/crud/TablePlace.vue';
import TableJournal from '@/components/crud/TableJournal.vue';
import TableStock from '@/components/crud/TableStock.vue';
export default {
  name: "Outline",
  components: { TableFilter
               , TableStockCategory
               , TableItem   //Stock Item Types
               , TableWorkArea
               , TablePlace
               , TableJournal
               , TableStock
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