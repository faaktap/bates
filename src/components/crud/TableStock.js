import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
import { journalTask } from '@/components/crud/journalTask.js';
import { getters } from "@/api/store";

export const tableWork = {
    name:'tableStockJS',
    hello: (p1) => {console.log('hello from (JS) ' , p1, tableWork.name)},
    getIndex: (itemID,table) => {
        let index = table.findIndex(ele => ele.stockid == itemID)
        if (index == -1) {
          errorSnackbar('item not found for processing', index)
        }
        return index
    },
    delete: (itemID,table) => {
        let index = tableWork.getIndex(itemID,table)
        if (index != -1) {
           table.splice(index,1);
        }
    },
    getDevalList(){
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = `SELECT typeid FROM s_itemtype WHERE stocktype != 'FREE'`
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, tableWork.loadDevalList)
    },
    loadDevalList (response) {
        response.forEach(element => {
            getters.getState({ object: "gZml" }).devalList.push(element.typeid)
        });
        // alert('deval list loaded', getters.getState({ object: "gZml" }).devalList.length,getters.getState({ object: "gZml" }).devalList)
    },
    getData: (key, pCallback, filter) => {
        console.log('getdata:', key, 'filter=',filter)
        //check first if we have the FREE vs STOCK table
        console.log('getdata: check the devallist')
        console.log(getters.getState({ object: "gZml" }).devalList)
        if (!getters.getState({ object: "gZml" }).devalList.length) {
            tableWork.getDevalList()
        }
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = `SELECT s.stockid, s.typeid, s.userid, s.originalownerid\
        , s.devalid, s.placeid  , s.name, s.datereceived\
        , ifnull(p1.public_preferredname,'?') ownername\
        , ifnull(p2.public_preferredname,'?') user \
        , ifnull(p.name,s.placeid) place\
        , ifnull(d.rulename,s.devalid) rulename\
        , ifnull(t.name,s.typeid) itemtype \
        , ifnull(c.name,t.catid) category\
        , s.description, s.serialno, s.quantity, s.price  \
    FROM s_stock s \
    LEFT JOIN dkhs_personel p2 on s.userid = p2.persid \
    LEFT JOIN dkhs_personel p1 on p1.persid = s.originalownerid  \
    LEFT JOIN s_devaluation d on s.devalid = d.devalid \
    LEFT JOIN s_itemtype t on  t.typeid = s.typeid \
    LEFT JOIN s_place p on s.placeid = p.placeid \
    LEFT JOIN s_category c on t.catid = c.catid\
    WHERE s.price >= 0 \
      ${filter}\
      ORDER BY s.name`
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pCallback, errorFetch)
    },
    createNewItem: (record, pAfterwards) => {
       let ts = {}
       ts.task = 'insertStock'
       if (!record.placeid || !record.typeid) {
           alert('we need a place id and a typeid')
       }
       console.log('Adding' , record)
       ts.data = {stockid: record.stockid
                 ,typeid:  record.typeid
                 ,userid:  record.userid
                 ,originalownerid:    record.originalownerid
                 ,devalid:    record.devalid
                 ,placeid: record.placeid
                 ,name: record.name
                 ,description: record.description
                 ,quantity: record.quantity
                 ,serialno: record.serialno
                 ,price:    record.price}
       console.log(record,ts.api)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, pAfterwards, errorFetch)
       //journalTask.stockTakeJournal(record,1) (We insert in bates zmldbfunction.php on new id)
    },
    saveData: (record,pcallback=doneFetch) => {
        let ts = {}
        ts.task = 'updateStock'
        ts.data = {stockid: record.stockid
                  ,typeid:  record.typeid
                  ,userid:  record.userid
                  ,originalownerid:    record.originalownerid
                  ,devalid:    record.devalid
                  ,placeid: record.placeid
                  ,name: record.name
                  ,description: record.description
                  ,quantity: record.quantity
                  ,serialno: record.serialno
                  ,price:    record.price}
                  //,datereceived: record.datereceived
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pcallback, errorFetch)
        journalTask.stockTakeJournal(record,3)

    },
    deleteData: (record,pcallback=doneFetch) => {
      let ts = {}
      ts.task = 'PlainSql'
      ts.sql = 'update s_stock set price = -1 where stockid = ' + record.stockid
      ts.api = zmlConfig.apiPath
      zmlFetch(ts, pcallback, errorFetch)
      journalTask.stockTakeJournal(record,6)
    },
    loadPlaceID(roomname, pCallback) {
        zmlFetch({task:'plainSql',
                 sql:`SELECT ownerid, placeid from s_place where name like '${roomname}'`
                 } ,pCallback
        )
    }
    ,somefunc() {
  }
}

function doneFetch (response) {
    console.log('doneLoading:', response)
    if ( response.error ) {
        if (response.error.findIndex('Duplicate entry') != -1 ) {
          errorSnackbar('That item was created already, please change it')
        } else {
          errorSnackbar(response.error)
        }
    } else {
        infoSnackbar('We saved your data, will email it as well')
    }
}

function errorFetch (response) {
    console.log('error:', response)
    errorSnackbar('We had a TS error !' + response)
}