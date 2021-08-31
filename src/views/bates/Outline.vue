<template>
 <div>

<!-- https://stackoverflow.com/questions/44695560/how-can-i-import-a-svg-file-to-a-vue-component/56855843#56855843 -->
<svg class="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1355.94 410.97"
    @click="showWhat">
  <g id="Performance" @click="select($event)">
      <rect x="598.2" width="167.65" height="26" fill="#d50037"></rect>
      <text><tspan x="45.4844" y="34.5469">Finn</tspan></text>
  </g>
  <g ref="werner1" id="werner" @click="select($event)">
    <rect y ="100" x="598.2" width="167.65" height="26" fill="green"></rect>
      <text x="598.2" y="110" > werner </text>
  </g>
</svg>

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
     select: function(event) {
            let targetId = event.currentTarget.id;
            console.log(targetId); // returns 'foo'
            this.startSomething(targetId)
     },
     showWhat(e1,e2) {
            console.log('showwat:',e1,e2)
     },
     startSomething(x){
            alert('start ' + x)
     },
  },
  mounted() {
      console.log('Table Filter Example : ',this.$options.name)
  }
    
}
</script>