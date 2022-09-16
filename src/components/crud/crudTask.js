import { infoSnackbar,errorSnackbar } from '@/api/GlobalActions';
import { getters } from "@/api/store";
export const crudTask = {
    hello: (p1) => {console.log('hello from (JS) ' , p1)}
   ,name: "JSCrudTasks"
   ,reportError: (response) => {
      if (response !== undefined && response.errorcode && response.errorcode != 0) {
        console.log(crudTask.name,'DbErr:',response)
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
            //console.log('we found it and its value is ', value)
            //So we add it to our map
            typeMap.set(value, typeMap.size+1);
          }
        }
      });
      typeMap.forEach((k,value) => { switchTable.push({type:value, cnt:k, switch: false}) } )
      return true
   }
   ,save: (entityTableName, data) => {
     console.log('save crudData : ', entityTableName, data.length)
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
     console.log('load crudData : ', entityTableName)
     let gzp = getters.getState({ object: "gZml" })
    switch (entityTableName) {
     case "itemtype":
       console.log(gzp.itemtype.length)
       return gzp.itemtype
     case "workarea":
       console.log(gzp.workarea.length)
       return gzp.workarea
     case "place":
       console.log(gzp.place.length, gzp.place)
       return gzp.place
     case "owner":
       console.log(gzp.owner.length)
       return gzp.owner
     case "category":
      console.log(gzp.category.length)
       return gzp.category
    }
    console.log('something slipped thrui!!!!')
  }

}
