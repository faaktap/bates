import { zmlConfig } from '@/api/constants';
//import { getters } from "@/api/store";
//import { zmlFetch } from '@/api/zmlFetch';
//import { zDate } from '@/api/zDate.js'

//import { zData } from "@/api/zGetBackgroundData.js"

export const zData = {
    someGlobals :  'hallo',
    l: (...args) => {
       console.log(...args)
    },
    sendEmail(emailInfo) {
        let email = emailInfo
        email.method = "advemail"
        if (!email.subject) email.subject  = "A Subject"
        if (!email.email_to) email.email_to = "faaktap@gmail.com"
        if (!email.htmlmessage) email.htmlmessage = '<h1> Hallo World </h1>'
        if (!email.email_cc) email.email_cc = ''
        if (!email.email_replyto) email.email_replyto = ''
        if (!email.test) email.test = "no"
        if (!email.email_from) email.email_from = "admin@kuiliesonline.co.za"
        if (!email.trusted_user) email.trusted_user = "info@kuiliesonlin.co.za"
        let apiConfig = { method: 'POST'
                        , headers: { 'Accept': 'application/json'
                                   , api: zmlConfig.apiDKHS
                                   , 'Content-Type': 'application/json;charset=UTF-8'}
                        , body: JSON.stringify(email)
                        }
        fetch(zmlConfig.emailPath, apiConfig);
    },
    initialData:  (whatever) => {
        if (whatever !== undefined) console.log(whatever)
        return whatever;
    },
    calendarData: (whatever) => {
        return whatever
    },
    functionData: (whatever) => {
        return whatever
    },
    randomChuckNorris: async () => {
        let response = await fetch('https://api.chucknorris.io/jokes/random')
        let data = await response.json()
        return data
    }

}
