import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
import { journalTask } from '@/components/crud/journalTask.js';

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
    getData: (key, pCallback, filter) => {
        console.log('getdata:', key, 'filter=',filter)
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = `SELECT s.stockid, s.typeid, s.userid, s.originalownerid, s.devalid, s.placeid\
  , s.name, s.datereceived, s.description, s.serialno, s.quantity, s.price\
  , p1.public_preferredname originalownername, p2.public_preferredname user\
  , p.name place, d.rulename, t.name itemtype, c.name category, p.name place\
  FROM s_stock s, dkhs_personel p1, dkhs_personel p2 , s_place p, s_devaluation d\
      ,s_itemtype t, s_category c\
 WHERE s.originalownerid = p1.persid\
 AND s.userid = p2.persid\
 AND s.price >= 0\
 AND s.placeid = p.placeid\
 AND s.devalid = d.devalid\
 AND t.typeid = s.typeid\
 AND t.catid = c.catid\
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