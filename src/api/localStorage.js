let zml = 'zml'

import {Buffer} from 'buffer';
import { zmlLog } from '@/api/zmlLog.js';

function encode (data) {
//  console.log('encode stringify',JSON.stringify(data))
//  console.log('encode',Buffer.from(JSON.stringify(data)).toString('base64'))
  return Buffer.from(JSON.stringify(data)).toString('base64')
}
function  decode(data) {
//  console.log('decode raw',Buffer.from(data, 'base64').toString('utf-8'))
//  console.log('decodejson 2nd',JSON.parse(Buffer.from(data, 'base64').toString('utf-8')))
  return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
}

export const cookie = {
  cl: (...args) => {
     console.log('cook',...args)
  },
  testLocal() {
    // if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    //   alert("It's a local server!");
    // } else {
    //   alert('it is not local')
    // }
    cookie.cl('domain = ', location.hostname)
    cookie.cl('domain = ', location.host)
    return location.hostname

  },
  set: (name, value) => {
    const domain = cookie.testLocal()
    cookie.cl('set',name, value)
    const encodedvalue = Buffer.from(value.toString()).toString('base64')
    document.cookie = `${name}=${encodedvalue}; domain=${domain};path=/; Secure; max-age=4500`;
  },
  get: (name) => {
    const allCookies = document.cookie;
    cookie.cl('get',name, allCookies)
    cookie.cl('getDomain',cookie.testLocal())
    if (allCookies.indexOf(name) != -1 ) {
      const value =  `; ${allCookies}`.split(`; ${name}=`).pop().split(';').shift()
      cookie.cl('getval',name, value)
      return  Buffer.from(value,'base64').toString('utf-8')
    } else {
      return ''
    }
  }
}
export const ls = {
    // eslint-disable-next-line
    cl: (...args) => {
       // console.log('ls',...args)
    },
    available:  true,
    remove: (name) => {
       localStorage.removeItem(name)
       return
    },
    test: (name) => {
      if (name.length > 3 && name.substr(0,3).toUpperCase() == zml.toUpperCase()) {
         if (localStorage.getItem(name)) {
            return true
         }
      } else {
        if (localStorage.getItem('zml'+name)) {
          return true
        }
    }
      return false
    },
    load: (name) => {
      ls.cl('LSLOADa:', name)
      let payload
      if (name.length > 3 && name.substr(0,3).toUpperCase() == zml.toUpperCase()) {
        ls.cl('LSLOADb: ZML in front', name)
        if (localStorage.getItem(name)) {
          try {
            ls.cl('LSLOADc: SORTED1', name, localStorage.getItem(name))
            //payload = JSON.parse(atob(localStorage.getItem(name)));
            payload = decode(localStorage.getItem(name))
          } catch(e) {
            localStorage.removeItem(name)
          }
          ls.cl('LSLOADc: SORTED2', payload)
          return payload
        }
      } else {
        ls.cl('LSLOADd: test if name with zml added exist?', zml + name)
        if (localStorage.getItem(zml + name)) {
          try {
            ls.cl('LSLOADe: YES! It Exist! SORTED2', zml + name)
            //payload = JSON.parse(atob(localStorage.getItem(zml + name)));
            payload = decode(localStorage.getItem(zml + name))
          } catch(e) {
            localStorage.removeItem(zml + name)
          }
          ls.cl('Now we return payload, but what about next time?',payload)
          return payload
        }
        return false
        // alert('ok, we have a problem - we want to load - but nothing exist? Please inform Werner')
        // ls.cl('LSLOADf: It does not exist :-( Add it', zml + ' ' + name)
        // ls.makeNewZMLReplacement(name)
        // ls.cl('LSLOADg: ZML-Now it SHOULD exist!TryAgainLOAD', zml + name)
        // if (localStorage.getItem(zml + name)) {
        //   try {
        //     ls.cl('LSLOADh: SORTED3', zml + name)
        //     //payload = JSON.parse(atob(localStorage.getItem(zml + name)));
        //     payload = decode(localStorage.getItem(zml + name))
        //   } catch(e) {
        //     localStorage.removeItem(zml + name)
        //   }
        //   ls.cl('LSLOADz: SORTED9', payload)
        //   return payload
        // } else {
        //   alert('Daar is groot fout!')
        // }
      }
      ls.cl('LSLOADi: RETURN FALSE')
      return false
    },
    makeNewZMLReplacement: (name) => {
      // They requested name, and not zml+name.
      // Retrieve name, and save as zml+name encrypted, if success (keep?) delete old one
      ls.cl('LSMakeNewReplacement: ADDZML', zml + ' ' + name)
      let payload = ls.loadOldOne(name)
      ls.cl('loading old one',payload)
      if (payload) {
        //let jPayload = btoa(JSON.stringify(payload))
        let jPayload = encode(payload)
        ls.cl('LSMakeNewReplacement: ADDZM PL', jPayload)
        localStorage.setItem(zml + name, jPayload)
        localStorage.removeItem(name)
        ls.cl('LSMadeNewReplacement : save new one, delete old one',payload, jPayload)
      }
      ls.cl('LSMakeNewReplacement : done with replace')
    },
    loadOldOne: (name) => {
      ls.cl('loadOldOne',name)
      let payload = {}
      if (localStorage.getItem(name)) {
        try {
          payload =  JSON.parse(localStorage.getItem(name));
        } catch(e) {
          localStorage.removeItem(name)
        }
        ls.cl('loadOldOne Done, ', payload)
        return payload
      }
    },
    save: (name, payload) => {
      ls.cl('LSSAVE:', name, payload)
      if (name.length > 3 && name.substr(0,3).toUpperCase() == zml.toUpperCase()) {
        //let jPayload = btoa(JSON.stringify(payload))
        let jPayload = encode(payload)
        localStorage.setItem(name, jPayload)
        ls.cl('LSSAVE:ZMLSET', name, jPayload)
      } else {
        //let jPayload = btoa(JSON.stringify(payload))
        let jPayload = encode(payload)
        localStorage.setItem(zml + name, jPayload)
        // just for incase
        localStorage.removeItem(name)
        ls.cl('LSSAVE:ZMLADDSET', zml + name, jPayload)
      }
    },
    help: () => {
        return `We have remove(item), load(item) and save(item,data)
        we use this to store object to localstorage - 2021/12/07 WS`
    },
}


// We need a way to check if localstorage must be cleaned out for a fresh start.
// This could be because version was changed, or data in localstorage is old.
// So we call staleCheck.checkStaleData(), and it will decide if a reload is needed.
import { zmlConfig } from '@/api/constants'
export const staleCheck = {
    // eslint-disable-next-line
    cl: (...args) => {
      console.log('SC',...args, window)
    },
    curVersion: ls.load('zmlVersion'),
    checkCurrentVersion: () => {
      staleCheck.cl(staleCheck.curVersion, '!=' , zmlConfig.projectID,'?')
      if (staleCheck.curVersion != zmlConfig.projectID) {
        return false
      } else {
        return true
      }
    },
    resetLocalStorageData: () => {
      staleCheck.cl('Asked to reset local Storage')
      //If the guy was logged in, keep him logged in.
      if (ls.test('zmllogin')) {
        let tmpSaveLogin = ls.load('zmllogin')
        localStorage.clear()
        ls.save('zmllogin',tmpSaveLogin)
      } else {
        localStorage.clear()
      }
      ls.save('zmlVersion', zmlConfig.projectID)
      staleCheck.resetDataDateCounter()
      staleCheck.cl('Reload on new Version')
      //alert('ddddddddddddddddddddddddddddddddddddddddddddddddddddd --- RELOAD --- ddddddddddddddddddddddddddddddddd')
      zmlLog('', 'RELOAD', `StaleCheck:${zmlConfig.projectID}`)
      location.reload();
    },
    resetDataDateCounter: () => {
      let today = new Date()
      let nowDateTimeStamp = new Intl.DateTimeFormat('default', { day: '2-digit', year: 'numeric', month: '2-digit'}).format(today)
      ls.save('localDataTimeStamp', nowDateTimeStamp)
      staleCheck.cl('resetDataDateCounter to ', nowDateTimeStamp)
    },
    checkIsDataStale: () => {
      staleCheck.cl('checkStaleData')
      let localDataTimeStamp = ls.load('localDataTimeStamp')
      let nowDateTimeStamp = new Intl.DateTimeFormat('default', { day: '2-digit', year: 'numeric', month: '2-digit'} ).format(new Date())
      staleCheck.cl('checkStaleData',localDataTimeStamp, '!=', nowDateTimeStamp,'?')
      if (!localDataTimeStamp || !staleCheck.checkCurrentVersion() || localDataTimeStamp != nowDateTimeStamp) {
         staleCheck.resetLocalStorageData()
         return true
      }
      return false
    },
    reloadCheck: () => {
      if (!staleCheck.checkCurrentVersion() || !staleCheck.checkStaleData()) {
        staleCheck.resetLocalStorageData()
      }
    }

}