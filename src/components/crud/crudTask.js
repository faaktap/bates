import { errorSnackbar } from '@/api/GlobalActions';
export const crudTask = {
    hello: (p1) => {console.log('hello from (JS) ' , p1)}
   ,name: "JSCrudTasks"
   ,reportError: (response) => {
      if (response !== undefined && response.errorcode && response.errorcode != 0) {
        console.log(crudTask.name,'DbErr:',response)
        if (response.error.includes('SQLSTATE[23000]')) {
          errorSnackbar("ERROR : We use this item somewhere - first unlink it")
        } else {
          errorSnackbar("ERROR : " +  response.error)
        }
        return true
      }      
      return false
    }
   ,showError: (response) => {
      errorSnackbar("ERROR : " +  response) 
    } 
   ,someOtherFunc: () => {} 
}
 