import { zmlConfig } from '@/api/constants';

/*-----------------------------
zmlFetch - to make my code more readable.
You can pass only first param if there are no callback
self can be used with let self=this, and then you pass all you data here.
will make this function a bit bloated.
See https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api if you lose track.
-----------------------------*/

// eslint-disable-next-line
function zmlFetch(task,callback,errcallback, extraParameter) {
        task.program = 'zmlShop'
        task.status = 'trying'
        let apiConfig = {method: 'POST',
                  headers: {'Accept': 'application/json'
                         , 'Content-Type': 'application/json;charset=UTF-8'},
                  body: JSON.stringify(task)}
        zmlConfig.cl('FETCH-------------- : ', task.task)
        fetch(task.api ? task.api : zmlConfig.apiPath, apiConfig)
        .then(response => {
            if (!response.ok) {
                zmlConfig.cl('FETCH--------------: thow response not ok error ',task.task,response.statusText)
                throw Error(response.statusText)
            }
            return response.json()
        })  
        .then(responseAsJson => { 
           //here we can decompress if return is gzipped, or we can do local callback to save globals?
           zmlConfig.cl('FETCH--------------: after fetch callback for ',task.task)
           if (callback) callback(responseAsJson,task,extraParameter ?? 'none')
        })
        .catch(err => {
            if ( typeof errcallback === 'undefined') {
                //('we have no error callback on this call', err, task.task)
                zmlConfig.cl('FETCH--------------catch with no callback',task.task,err)
            } else {
                zmlConfig.cl('FETCH--------------catch with errcallback',task.task,err)
                errcallback(err)                
            }
            //('ZF: Errorname : ',task.task , 'Error:' , err);
        });
    }

//https://www.codepanion.com/posts/2020-02-02-how-to-use-async-await-promises-with-fetch-in-vue-js-vuex/
// eslint-disable-next-line
/*
async function http(url, 
    method = 'GET',
    data,
) {
    try {
      const response = await fetch(url, {
        method,
        data
      });
    
      return await response.json();
    } catch (error) {
      throw error;
    }
}
*/

export {zmlFetch};    