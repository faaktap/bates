import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
//import { getters } from "@/api/store";

export const tableWork = {
    name:'tableStockCat',
    hello: (p1) => {console.log('hello from (JS) ' , p1)},
    getIndex: (itemID,table) => {
        let index = table.findIndex(ele => ele.catid == itemID)
        if (index == -1) {
          errorSnackbar('item not found for deletion', index)
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
        ts.sql = "SELECT * FROM s_category ORDER BY name DESC"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pCallback, errorFetch)
    },
    createNewItem: (record, pAfterwards) => {
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = `insert into s_category values (null, "${record.name}" , "${record.description}")`
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, pAfterwards, errorFetch)
    },
    saveData: (record,pcallback=doneFetch) => {
        let ts = {}
        ts.task = 'PlainSql'
        ts.data = {catid: record.catid
                  ,name : record.name
                  ,description: record.description}
        ts.data.bind = {catid: record.catid
                       ,name : record.name
                       ,description: record.description}
        ts.sql = 'update s_category set name = :name, description = :description where catid = :catid;'
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pcallback, errorFetch)

    },
    deleteData: (record,pcallback=doneFetch) => {
      let ts = {}
      ts.task = 'PlainSql'
      ts.data = {catid: record.catid
                ,name : record.name
                ,description: record.description}
      ts.data.bind = {catid: record.catid
                     ,name : record.name
                     ,description: record.description}
      ts.sql = 'delete from s_category where catid = ' + record.catid
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