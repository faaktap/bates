import { zmlConfig } from '@/api/constants';
// eslint-disable-next-line
function zmlLog(user, pagename,logobj, callback,errcallback) {
    zmlConfig.cl('incoming task for LOG = ' , pagename)
        let task = {}
        task.data =  {}
        task.data.logdata = logobj || 'nodata'
        task.data.pagename = pagename || 'nopage'
        task.data.user = user || 'none'
        task.task = 'dolog'
        task.status = 'trying'
        task.api =  zmlConfig. apiDKHS
        let apiConfig = {method: 'POST',
                  headers: {'Accept': 'application/json'
                         , 'Content-Type': 'application/json;charset=UTF-8'},
                  body: JSON.stringify(task)}
     
        fetch(task.api ? task.api : zmlConfig.apiPath, apiConfig)
        .then(response => response.json())  
        .then(response => { 
           if (callback) callback(response,task);
           zmlConfig.cl('ZF: after log callback for ',task.task);
        })
        .catch((err)=>{
            zmlConfig.cl('ZF: Errorname : ',task.task , 'Error:' , err, task);
            if (errcallback) errcallback(err);
        });
    }
export {zmlLog};    