import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';

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
    getData: (key, pCallback) => {
        console.log(key)
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = "SELECT s.stockid, s.typeid, s.userid, s.originalownerid, s.devalid, s.placeid"
               + "     , s.name, s.datereceived, s.description, s.serialno"
               + "     , p1.public_preferredname originalownername, p2.public_preferredname user"
               + "     , p.name place, d.rulename, t.name itemtype, c.name category"
               + "  FROM s_stock s, dkhs_personel p1, dkhs_personel p2 , s_place p, s_devaluation d"
               + "      ,s_itemtype t, s_category c"
               + " WHERE s.originalownerid = p1.persid"
               + " AND s.userid = p2.persid"
               + " AND s.placeid = p.placeid"
               + " AND s.devalid = d.devalid"
               + " AND t.typeid = s.typeid"
               + " AND t.catid = c.catid"
               + " ORDER BY s.name"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pCallback, errorFetch)
    },
    createNewItem: (record, pAfterwards) => {
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = "insert into s_stock values(null, " 
                + record.typeid + "," 
                + record.userid + ","
                + record.originalownerid + ","
                + record.devalid + ","
                + record.placeid + ","
                + "'" + record.name + "',"
                + "'" + record.description + "',"
                + record.quantity + ","
                + "'" + record.serialno + "',"
                + "now()" + ","
                + record.price + ")"
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, pAfterwards, errorFetch)
    },
    saveData: (record,pcallback=doneFetch) => {  
        let ts = {}
        alert('oriowner=', record.originalownerid)
        //ts.task = 'PlainSql'
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
                  
        ts.data.bind = {
             typeid:   record.typeid
            ,userid:   record.userid
            ,originalownerid:    record.originalownerid
            ,devalid:  record.devalid
            ,placeid:  record.placeid
            ,quantity: record.quantity
            ,price:    record.price
            ,name:     record.name
            ,description: record.description
            ,serialno: record.serialno}
            //,datereceived: record.datereceived
            
        ts.sql = 'update s_stock set typeid = :typeid'
               + '     , userid = :userid'
               + '     , originalownerid = :originalownerid'
               + '     , devalid = :devalid'
               + '     , placeid = :placeid'
               + '     , name = :name'
               + '     , description = :description '
               + '     , serialno = :serialno'
               + '     , quantity = :quantity'
               + '     , price = :price'  //Date Received value will never change.
               + ' where stockid = '  + record.stockid
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pcallback, errorFetch)

    },
    deleteData: (record,pcallback=doneFetch) => {  
      let ts = {}
      ts.task = 'PlainSql'
      ts.sql = 'delete from s_stock where stockid = ' + record.stockid
      ts.api = zmlConfig.apiPath
      zmlFetch(ts, pcallback, errorFetch)
  },
}

function doneFetch (response) {
    console.log('doneLoading:', response)
    if ( response.error ) {
        errorSnackbar(response.error)
    } else {
        infoSnackbar('We saved your data, will email it as well')
    }
}

function errorFetch (response) {
    console.log('error:', response)
    errorSnackbar('We had an error saving your data!' + response)
}