import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';
import { getters } from "@/api/store";

export const survey = {
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
    getQuiz: (key, pCallback) => {
        let ts = {}
        ts.task = 'getQuiz'
        ts.data = {quizkey : key}
        ts.api = zmlConfig.apiDKHS
        zmlFetch(ts, pCallback)
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