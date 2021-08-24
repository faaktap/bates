import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
import { getters } from "@/api/store";

export const tableWork = {
    hello: (p1) => {console.log('hello from (JS) ' , p1)},
    getIndex: (itemID,table) => {
        let index = table.findIndex(ele => ele.id == itemID)
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
    saveData: (id,key,modeldata,pcallback=doneFetch,pErrorcallback=errorFetch) => {  
        let ts = {}
        ts.task = 'saveQuiz'
        ts.data = {surveyid : id
                  ,ownerid : getters.getState({ object: "gZml" }).login.ownerid
                  ,quizkey : key
                  ,quizdata : modeldata}
        ts.api = zmlConfig.apiDKHS
        zmlFetch(ts, pcallback, pErrorcallback)
        return "done"
    },
    lookupName: (key, pCallback) => {
        let ts = {}
        ts.task = 'getStudents'
        ts.data = key
        ts.api = zmlConfig.apiDKHS
        zmlFetch(ts, pCallback)        
    }
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