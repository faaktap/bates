<template>
 <div>

   <v-btn @click="sel='cat'"  small class="ma-2"
          tip="baie basiese kategorie / hoof struktuur"> Kategorie / Category </v-btn>
   <v-btn @click="sel='type'" small class="ma-2"
          tip="opgedeel in kategoriee - maar hierdie is 'n verfyning"> Voorraad Tipes / Category Breakdown Types </v-btn>
   <v-btn @click="sel='area'" small class="ma-2"
          tip="Om maklik kamers in areas op te kan deel"> Area waarin klasse/plekke is / Work Area </v-btn>
   <v-btn @click="sel='class'" small class="ma-2"
          tip="klasse kan ook die 'garage' wees, met die bussies en grassnyers?"> Klasse / Classrooms </v-btn>
   <v-btn @click="sel='stock'" small class="ma-2"
          tip="Van hier word joernaal inskrywings gedoen vir all verandering of checks"> Voorraad / Stock </v-btn>
   <v-btn @click="sel='journal'" small class="ma-2"> Journal </v-btn>
    
    <table-stock-category v-if="sel=='cat'"
                          entity="Category" />
    <table-item v-if="sel=='type'" 
                entity="Category Breakdown" />
    <table-work-area v-if="sel=='area'"
                     entity="Work Area" /> 
    <table-place v-if="sel=='class'"
                     entity="Classroom" /> 
    <table-journal v-if="sel=='journal'"
                     entity="Journal" />  
    <table-stock v-if="sel=='stock'"
                     entity="Stock" /> 

    <v-window v-if="sel == 'test'" >
      <h1> PRACTISE </h1>
      <table-filter entity="Test Some Stuff" /> 
    </v-window>
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