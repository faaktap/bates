import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { crudTask } from "@/components/crud/crudTask.js"

// Journal Actions
// 1 Acquire
// 2 Stocktake
// 3 Movement
// 4 Write off
// 5 Missing
// 6 Deleted
// 7 Update

export const journalTask = {
    hello: (p1) => {console.log('hello from (JS) ' , p1)}
   ,name: "JSJournalTask"
   ,stockTakeJournal: (record, journalType = 7) => {
     if (record.stockid) {
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = `insert into s_journal ( \
                 SELECT null, s.stockid, s.userid, s.originalownerid, ${journalType}, now(), s.quantity \
                   FROM s_stock s\
                   WHERE s.stockid = ${record.stockid} )`
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, crudTask.reportError)
     } else {
         alert('we have no stockid!!! in record')
     }
    }
}
