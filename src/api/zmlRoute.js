
const LASTPATH = "lastpath"

export const lastRoute = () => {
  if (localStorage.getItem(LASTPATH)) {
    try { 
        return JSON.parse(localStorage.getItem(LASTPATH));
     } catch(e) {
       localStorage.removeItem(LASTPATH)
     }
  } else {
      return null
  }
}

//We only save routes when we are not authenticated.
export const saveRoute = (auth,route) => {
   if (!auth) {
      localStorage.setItem('lastpath', route)
   } else {
      localStorage.removeItem('lastpath')
   }
}

