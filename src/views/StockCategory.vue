<template>
 <v-container fluid>
  <base-title-expand heading="Stock Categories and Breakdown">

    <p>Categories is used to bundle groups of items together. Then we also have a "breakdown", to group
        specific stuff together. ie. Not everyone give the same name to the same item. However, if you
        pick a breakdown item from the list, we get a "uniform name group" for that item.
        Then we can do a count of all "DESKS" in school for instance.
        <br>
        If you select "cleaning", "dustbin", you are welcome to add "Plastic" or "Metal" as a futher breakdown.
    </p>

  </base-title-expand>

    <v-toolbar  dense  row  wrap>
    <v-spacer></v-spacer>
    <v-btn-toggle dense v-model="toggleDisplay">
        <v-btn class="mr-2">
            <v-icon right >mdi-stocking </v-icon>
           Basic Category
        </v-btn>
        <v-btn class="mr-2">
            <v-icon right >mdi-lightbulb-cfl-spiral </v-icon>
         Item Category / Breakdown
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
{{ toggleDisplay }}
<v-container v-if="toggleDisplay == 0" fluid>
    <table-stock-category entity="Category" />
</v-container>
<v-container v-if="toggleDisplay == 1" fluid>
    <table-item entity="Category Breakdown" />
</v-container>
 </v-container>
</template>

<script>
import TableStockCategory from '@/components/crud/TableStockCategory.vue';
import TableItem from '@/components/crud/TableItem.vue';
import BaseTitleExpand from '@/components/base/BaseTitleExpand.vue';
export default {
  name: "StockCategory",
  components: {
                TableStockCategory
              , TableItem
              , BaseTitleExpand
              },

  data: () => ({
      toggleDisplay:null
  }),
  methods:{
  },
  mounted() {
      console.log('CAT : ',this.$options.name)
  }

}
</script>