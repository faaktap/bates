import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
//import { getters } from "@/api/store";

export const tableWork = {
    name:'tableStockCat',
    hello: (p1) => {console.log('hello from (JS) ' , p1)},
    getIndex: (itemID,table) => {
        let index = table.findIndex(ele => ele.workareaid == itemID)
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
        ts.sql = `SELECT * FROM s_workarea ORDER BY name`
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pCallback, errorFetch)
    },
    createNewItem: (record, pAfterwards) => {
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = "insert into s_workarea values(null, " + record.ownerid + ",'" +record.name+ "','" + record.description + "');'"
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, pAfterwards, errorFetch)
    },
    saveData: (record,pcallback=doneFetch) => {
        let ts = {}
        ts.task = 'PlainSql'
        ts.data = {workareaid: record.workareaid
                  ,ownerid: record.ownerid
                  ,name : record.name
                  ,description: record.description}
        ts.data.bind = {workareaid: record.workareaid
            ,ownerid: record.ownerid
            ,name : record.name
            ,description: record.description}
        ts.sql = 'update s_workarea set name = :name, description = :description, ownerid = :ownerid where workareaid = :workareaid;'
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pcallback, errorFetch)

    },
    deleteData: (record,pcallback=doneFetch) => {
      let ts = {}
      ts.task = 'PlainSql'
      ts.sql = 'delete from s_workarea where workareaid = ' + record.workareaid
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