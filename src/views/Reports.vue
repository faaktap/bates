<template>
<v-container fluid>
  <base-title-expand heading="Report">
    <p>Various reports can be accessed here. </p>
    <p>They can be printed or exported to excel. You can decide which columns to print/export</p>
  </base-title-expand>
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
               <z-auto-place v-model="reportValueToCount[item.id]"
                label="Place"
                @objectSelected="objectSelected" />
            </template>
            <template v-else-if="tab == 1">
              <z-auto-pers v-model="reportValueToCount[item.id]"
                  label="Owner"
                  @objectSelected="objectSelected" />
            </template>
            <template v-else>
              <z-auto-item-type v-model="reportValueToCount[item.id]"
                  label="Item Type"
                  @objectSelected="objectSelected" />
            </template>
          </v-card-actions>
          <v-card-title>
            {{ item.answer }}
          </v-card-title>
          <v-card-actions>
            <v-btn small @click="build"> showReport </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  <reports-table v-if="sqlSelect"
     :reportHeader="reportHeader"
     :sqlSelect="sqlSelect"
     />
</v-container>
</template>

<script>
import ZAutoPers from '@/components/fields/ZAutoPers.vue'
import ZAutoPlace from '@/components/fields/ZAutoPlace.vue'
import ZAutoItemType from '@/components/fields/ZAutoItemType.vue'
import ReportsTable from '@/components/ReportsTable.vue'
import BaseTitleExpand from '@/components/base/BaseTitleExpand.vue'
import { zmlFetch } from '@/api/zmlFetch.js'
import { getters } from "@/api/store";
export default {
  name: 'Report',
  components:{
    ZAutoPers,
    ZAutoPlace,
    ZAutoItemType,
    ReportsTable,
    BaseTitleExpand
  },
  data: () => ({
    getZml: getters.getState({ object: "gZml" }),
    show: false,
    tab:null,
    items: [
          {id:0,menu:'Itemlist for Location' ,f:null
               ,sql:"SELECT count(*) items from s_stock s WHERE s.placeid = "
               ,answer:'select a class', obj:{}},
          {id:1,menu:'Itemlist for person',f:null
               ,sql:"SELECT count(*) items from s_stock s WHERE s.originalownerid = "
               ,answer:'select a person', obj:{}},
          {id:2,menu:'Itemlist for a itemtype' ,f:null
               ,sql:"SELECT count(*) items from s_stock s WHERE s.typeid = "
               ,answer:'select an item', obj:{}},
          {id:3,menu:'Eben List' ,f:null
               ,sql:`SELECT count(*) FROM s_stock s`
               ,answer:'Show All', obj:{}},
          {id:4,menu:'Places' ,f:null
               ,sql:`SELECT count(*) FROM s_places s`
               ,answer:'Show All', obj:{}}

        ],
    reportValueToCount:[],
    sqlSelect:null,
    reportHeader:null

  }),
  computed:{
  },
  methods: {
    objectSelected(e) {
      console.log('objSelected = ',e)
      this.items[this.tab].obj = e
    },
    getCount() {
      let ts = {}
      ts.task = 'PlainSql'
      // assign the sql with 'placeid =' to sql, and add the id
      ts.sql = `${this.items[this.tab].sql} ${this.reportValueToCount[this.tab]}`
      zmlFetch(ts, this.showCount)
    },
    showCount(response) {
      console.log('showCount start',this.items[this.tab].obj)
      switch (this.tab) {
        case 0:
          this.items[this.tab].answer = `For location ${this.items[this.tab].obj.name} (${this.items[this.tab].obj.description}) we found ${response[0].items} item(s)`
          break
        case 1:
          this.items[this.tab].answer = `For person ${this.items[this.tab].obj.fullname} we found ${response[0].items} item(s)`
          break
        case 2:
          this.items[this.tab].answer = `For itemtype ${this.items[this.tab].obj.name} we found ${response[0].items} item(s)`
          break
        case 3:
          this.items[this.tab].answer = `Stock Master List :  we found ${response[0].items} item(s)`
          break
        case 4:
          this.items[this.tab].answer = `Places :  we found ${response[0].items} item(s)`
          break
      }
      console.log('tab = ', this.tab, 'count = ', response[0], this.items[this.tab].answer)
    },
    build(u) {
      console.log('build base on this.tab',u)
      switch (this.tab) {
        case 0:
         this.sqlSelect =
    `SELECT ifnull(c.name,t.catid) category\
         , s.name description\
         , ifnull(p1.public_preferredname,'?') Responsible\
         , ifnull(t.name,s.typeid) itemtype\
         , s.serialno\
         , s.quantity\
         , date(s.datereceived) DateChecked\
     FROM s_stock s\
     LEFT JOIN dkhs_personel p1 on p1.persid = s.originalownerid\
     LEFT JOIN s_itemtype t on  t.typeid = s.typeid\
     LEFT JOIN s_place p on s.placeid = p.placeid\
     LEFT JOIN s_category c on t.catid = c.catid\
     WHERE s.price >= 0\
     and s.placeid = ${this.items[this.tab].obj.placeid}\
     ORDER BY s.name`
     //         , ifnull(p.name,s.placeid) place\
         this.reportHeader = this.items[this.tab].menu + ' : ' +this.items[this.tab].obj.name  // this.items[this.tab].answer
         break
        case 1:
         this.sqlSelect =
    `SELECT ifnull(t.name,s.typeid) itemtype\
         , s.name description\
         , ifnull(c.name,t.catid) category\
         , ifnull(p.name,s.placeid) place\
         , s.serialno\
         , s.quantity\
     FROM s_stock s\
     LEFT JOIN dkhs_personel p1 on p1.persid = s.originalownerid\
     LEFT JOIN s_itemtype t on  t.typeid = s.typeid\
     LEFT JOIN s_place p on s.placeid = p.placeid\
     LEFT JOIN s_category c on t.catid = c.catid\
     WHERE s.price >= 0\
     and s.originalownerid = ${this.items[this.tab].obj.persid}\
     ORDER BY s.name`
         this.reportHeader = this.items[this.tab].menu + ' : ' +this.items[this.tab].obj.fullname //this.reportHeader = this.items[this.tab].answer
         break
        case 2:
         this.sqlSelect =
    `SELECT ifnull(c.name,t.catid) category\
         , ifnull(t.name,s.typeid) itemtype\
         , ifnull(p.name,s.placeid) place\
         , s.name description\
         , ifnull(p1.public_preferredname,'?') Responsible\
         , s.serialno\
         , s.quantity\
     FROM s_stock s\
     LEFT JOIN dkhs_personel p1 on p1.persid = s.originalownerid\
     LEFT JOIN s_itemtype t on  t.typeid = s.typeid\
     LEFT JOIN s_place p on s.placeid = p.placeid\
     LEFT JOIN s_category c on t.catid = c.catid\
     WHERE s.price >= 0\
     and s.typeid = ${this.items[this.tab].obj.typeid}\
     ORDER BY s.name`
         this.reportHeader = this.items[this.tab].menu + ' : ' + this.items[this.tab].obj.name //this.reportHeader = this.items[this.tab].answer
         break
        case 3:
         this.sqlSelect = `SELECT s.stockid, s.typeid, s.name description, s.userid, s.originalownerid\
        , s.devalid, s.placeid, date(s.datereceived) DateChecked\
        , ifnull(p1.public_preferredname,'?') Responsible\
        , ifnull(p.name,s.placeid) place\
        , ifnull(d.rulename,s.devalid) rulename\
        , ifnull(t.name,s.typeid) itemtype\
        , ifnull(c.name,t.catid) category\
        , s.serialno, s.quantity, s.price\
    FROM s_stock s
    LEFT JOIN dkhs_personel p1 on p1.persid = s.originalownerid
    LEFT JOIN s_devaluation d on s.devalid = d.devalid
    LEFT JOIN s_itemtype t on  t.typeid = s.typeid
    LEFT JOIN s_place p on s.placeid = p.placeid
    LEFT JOIN s_category c on t.catid = c.catid
  ORDER BY s.stockid DESC`
         this.reportHeader = 'Bate Meester se Lys'
         break
         case 4:
         this.sqlSelect = `SELECT p.menemonic, p.public_preferredname, p.room, s.name placename, s.function, s.description, w.name workarea
FROM s_place s, dkhs_personel p, s_workarea w
where s.ownerid = p.persid and s.workareaid = w.workareaid
ORDER BY p.room, p.surname`
         this.reportHeader = 'Places / People'
         break
      }
    },

  },
  mounted() {
    this.items.forEach( e => e.f = this.getCount)
    if (this.getZml.place.length == 0 || this.getZml.owner.length == 0) {
      //They have been nowhere else = but should not be a problem
    }

  },
  watch:{
    tab() {
      console.log('new tab = ', this.tab)
    },
    reportValueToCount() {
      this.items[this.tab].f()
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