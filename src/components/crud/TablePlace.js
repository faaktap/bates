import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
//import { getters } from "@/api/store";

export const tableWork = {
    name:'tablePlaceJS',
    hello: (p1) => {console.log('hello from (JS) ' , p1)},
    getIndex: (itemID,table) => {
        let index = table.findIndex(ele => ele.placeid == itemID)
        if (index == -1) {
          errorSnackbar('Classroom not found for processing', index)
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
        ts.sql = "SELECT placeid, p.workareaid, p.ownerid, p.name, p.description , w.name workarea, s.public_preferredname owner"
               + "  FROM s_place p, s_workarea w, dkhs_personel s"
               + " WHERE p.workareaid = w.workareaid"
               + "   AND p.ownerid = s.persid"
               + " ORDER BY p.name"
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pCallback, errorFetch)
    },
    createNewItem: (record, pAfterwards) => {
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = "insert into s_place values(null, " +record.workareaid+ "," + record.ownerid + ",'" +record.name+ "','" + record.description + "')"
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, pAfterwards, errorFetch)
    },
    saveData: (record,pcallback=doneFetch) => {  
        let ts = {}
        ts.task = 'PlainSql'
        ts.data = {placeid: record.placeid
                  ,workareaid: record.workareaid
                  ,ownerid: record.ownerid
                  ,name : record.name
                  ,description: record.description}
        ts.data.bind = {placeid: record.placeid
            ,workareaid: record.workareaid
            ,ownerid: record.ownerid
            ,name : record.name
            ,description: record.description}
        ts.sql = 'update s_place set name = :name, description = :description, ownerid = :ownerid, workareaid = :workareaid where placeid = :placeid;'
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pcallback, errorFetch)

    },
    deleteData: (record,pcallback=doneFetch) => {  
      let ts = {}
      ts.task = 'PlainSql'
      ts.sql = 'delete from s_place where placeid = ' + record.placeid
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