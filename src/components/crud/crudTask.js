import { infoSnackbar,errorSnackbar } from '@/api/GlobalActions';
import { getters } from "@/api/store";
export const crudTask = {
    hello: (p1) => {crudTask.cl('hello from (JS) ' , p1)}
   ,name: "JSCrudTasks"
   ,cl: (...args) => { console.log(crudTask.name, ...args)}
   ,reportError: (response) => {
      if (response !== undefined && response.errorcode && response.errorcode != 0) {
        crudTask.cl(crudTask.name,'DbErr:',response)
        if (response.error.indexOf('Duplicate entry') != -1 ) {
          errorSnackbar("ERROR : We use this item in this location - just update it")
        } else if (response.error.indexOf('a foreign key constraint') != -1 ) {
            //ERROR : {"errorInfo":["23000",1451,"Cannot delete or update a parent row: a foreign key constraint fails (`kuilieso_bib`.`s_stock`, CONSTRAINT `stock_type` FOREIGN KEY (`typeid`) REFERENCES `s_itemtype` (`typeid`) ON DELETE NO ACTION ON UPDATE NO ACTION)"]}
            errorSnackbar('Someone is using the information in their inventory, we cannot delete it')
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

      if (switchTable && switchTable.length) switchTable.length = 0

      const typeMap = new Map();
      entityTable.forEach(e => {
        for (const [key, value] of Object.entries(e)) {
          if (key == switchAttribute) {
            //crudTask.cl('we found it and its value is ', value)
            //So we add it to our map
            typeMap.set(value, typeMap.size+1);
          }
        }
      });

      //Move the map to an array, and assign type and value (value will be used to find switch)
      let tmArr = []
      typeMap.forEach((values, keys) => {
        tmArr.push({type:keys, value:tmArr.length})
      });
      //Now we sort the array, to get Admin in the front. (Switches show alphabetically)
      let typeMapArray = tmArr.sort((a,b) => a.type.localeCompare(b.type))
      //Now we load the switchTable to be used in TablePlace.vue
      typeMapArray.forEach((k) => {
        switchTable.push({type:k.type, cnt:k.value, switch: false})
      })
      return true
   }
   ,save: (entityTableName, data) => {
     crudTask.cl('save crudData : ', entityTableName, data.length)
     let gzp = getters.getState({ object: "gZml" })
     switch (entityTableName) {
      case "itemtype":
        return getters.getState({ object: "gZml" }).itemtype = data
      case "workarea":
        return getters.getState({ object: "gZml" }).workarea = data
      case "place":
        if (gzp.place  && data.length > gzp.place.length) {
           gzp.place = data
        }
        return
      case "owner":
        return getters.getState({ object: "gZml" }).owner = data
      case "category":
        return getters.getState({ object: "gZml" }).category = data
     }
   }
   ,load: (entityTableName) => {
     crudTask.cl('load crudData : ', entityTableName)
     let gzp = getters.getState({ object: "gZml" })
    switch (entityTableName) {
     case "itemtype":
       crudTask.cl(gzp.itemtype.length)
       return gzp.itemtype
     case "workarea":
       crudTask.cl(gzp.workarea.length)
       return gzp.workarea
     case "place":
       crudTask.cl(gzp.place.length, gzp.place)
       return gzp.place
     case "owner":
       crudTask.cl(gzp.owner.length)
       return gzp.owner
     case "category":
      crudTask.cl(gzp.category.length)
       return gzp.category
    }
    crudTask.cl('something slipped thrui!!!!')
  }

}
