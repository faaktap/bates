import { infoSnackbar,errorSnackbar } from '@/api/GlobalActions';
export const crudTask = {
    hello: (p1) => {console.log('hello from (JS) ' , p1)}
   ,name: "JSCrudTasks"
   ,reportError: (response) => {
      if (response !== undefined && response.errorcode && response.errorcode != 0) {
        console.log(crudTask.name,'DbErr:',response)
        if (response.error.indexOf('Duplicate entry') != -1 ) {
          errorSnackbar("ERROR : We use this item in this location - just update it")
        } else {
          errorSnackbar("ERROR : " +  response.error)
        }
        return true
      }
      return false
    }
    ,reportNoRows: (response) => {
      if ('errorcode' in response && 'error' in response && response.errorcode == 0) {
        if (response.error.indexOf('no rows returned') != -1 ) {
          infoSnackbar("We have no information for this query")
          return true
        }
      }
      return false
    }

   ,showError: (response) => {
      errorSnackbar("ERROR : " +  response)
    }
   ,recalcSwitches: (switchTable, entityTable, switchAttribute) => {
      if (switchTable && switchTable.length) return
      const typeMap = new Map();
      entityTable.forEach(e => {
        for (const [key, value] of Object.entries(e)) {
          if (key == switchAttribute) {
            //console.log('we found it and its value is ', value)
            //So we add it to our map
            typeMap.set(value, typeMap.size+1);
          }
        }

      });
      typeMap.forEach((k,value) => { switchTable.push({type:value, cnt:k}) } )
      return true
   }
   ,someOtherFunc: () => {}
}
