<template>
 <v-card>
    <v-toolbar
      color="cyan"
      dark
      flat
    >
    <v-toolbar-title>Your Reports</v-toolbar-title>
     <v-spacer></v-spacer>
     <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item.id">
            {{ item.menu }}
          </v-tab>
        </v-tabs>
     </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.id" :href="item.id">
        <v-card flat>
          <v-card-actions>
            <template v-if="tab == 0">
               <z-auto-place v-model="reportPlace"
                  @select="selPlace"
                  @input="reportPlace = $event"
                  label="Location" /> {{ reportPlace }}
            </template>
            <template v-else-if="tab == 1">
              <z-auto-pers v-model="reportOwner"
                  @select="selOwner"
                  label="Owner" /> {{ reportOwner }}
            </template>
            <template v-else>
              <v-text-field v-model="tab" />
            </template>
          </v-card-actions>
          <v-card-text>
            {{ item.id }} :: {{ countSql }}
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ZAutoPers from '@/components/fields/ZAutoPers.vue'
import ZAutoPlace from '@/components/fields/ZAutoPlace.vue'
export default {
  name: 'Report',
  components:{
    ZAutoPers,
    ZAutoPlace
  },
  data: () => ({
    show: false,
    tab:null,
    items: [
          {id:0,menu:'List for a Class' ,sql:"select count(*) from s_stock"},
          {id:1,menu:'List for a person',sql:"select count(*) from s_stock"},
          {id:2,menu:'List for an item' ,sql:"select count(*) from s_stock"}
        ],
    countSql:null,
    reportOwner:null,
    reportPlace:null

  }),
  methods: {
    selOwner(e1,e2) {console.log('place',e1,e2)},
    selPlace(e1,e2) {console.log('own',e1,e2)},
  },
  mounted() {
  },
  watch:{
    reportPlace() {
      this.countSql = this.items[0].sql + ` where locationid = ${this.reportPlace}`
    },
    reportOwner() {
      this.countSql = this.items[1].sql + ` where ownerid = ${this.reportOwner}`
    },
  }
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition-duration: 3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-enter-active {
  transition: all 3s ease;
}

.v-carousel .v-window-item {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>