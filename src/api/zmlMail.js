import { zmlConfig } from '@/api/constants';

function zmlMail(task,callback,errcallback) {
        task.program = 'zmlRekenaars';
        task.status = 'trying';
        let apiConfig = {method: 'POST',
                  headers: {'Accept': 'application/json'
                         , 'Content-Type': 'application/json;charset=UTF-8'},
                  body: JSON.stringify(task)};
     
        fetch("https://kuiliesonline.co.za/api/massmail/genMailer.php", apiConfig)
        .then(response => response.json())  
        .then(response => { 
           if (callback) callback(response,task);
           zmlConfig.cl('ZF: after fetch callback for ',task.task);
        })
        .catch((err)=>{
            zmlConfig.cl('ZF: Errorname : ',task.task , 'Error:' , err, task);
            if (errcallback) errcallback(err);
        });
    }

// eslint-disable-next-line
function zmlMailTest(task) {   
     return 1;
 }
export {zmlMail};    