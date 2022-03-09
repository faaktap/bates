import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
//import { getters } from "@/api/store";

export const tabwSItem = {
    name:'tableItemJS',
    hello: (p1) => {console.log('hello from (JS) ' , p1)},
    getIndex: (itemID,table) => {
        let index = table.findIndex(ele => ele.typeid == itemID)
        if (index == -1) {
          errorSnackbar('item not found for processing', index)
        }
        return index
    },
    delete: (itemID,table) => {
        let index = tabwSItem.getIndex(itemID,table)
        if (index != -1) {
           table.splice(index,1);
        }
    },
    getData: (key, pCallback) => {
        console.log(key)
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = "SELECT i.typeid, i.catid, i.name, i.stocktype, c.name shortdesc, c.description longdesc"
               + "     , concat(i.name, ' (' , ifnull(c.name,'CAT') , ')' ) concatsearch"
               + "  FROM s_itemtype i, s_category c"
               + " WHERE c.catid = i.catid"
               + " ORDER BY i.name"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pCallback, errorFetch)
    },
    createNewItem: (record, pAfterwards) => {
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = "insert into s_itemtype values(null, " +record.catid+ ",'" +record.name+ "','" + record.stocktype + "');'"
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, pAfterwards, errorFetch)
    },
    saveData: (record,pcallback=doneFetch) => {
        let ts = {}
        ts.task = 'PlainSql'
        ts.data = {typeid: record.typeid
                  ,catid: record.catid
                  ,name : record.name
                  ,stocktype: record.stocktype}
        ts.data.bind = {typeid: record.typeid
            ,catid: record.catid
            ,name : record.name
            ,stocktype: record.stocktype}
        ts.sql = 'update s_itemtype set name = :name, stocktype = :stocktype, catid = :catid where typeid = :typeid;'
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pcallback, errorFetch)

    },
    deleteData: (record,pcallback=doneFetch) => {
      let ts = {}
      ts.task = 'PlainSql'
      ts.data = {typeid: record.typeid
                ,catid: record.catid
                ,name : record.name
                ,stocktype: record.stocktype}
      ts.sql = 'delete from s_itemtype where typeid = ' + record.typeid
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