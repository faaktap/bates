import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { crudTask } from "@/components/crud/crudTask.js"

export const journalTask = {
    hello: (p1) => {console.log('hello from (JS) ' , p1)}
   ,name: "JSJournalTask"
   ,stockTakeJournal: (record) => { 
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = "insert into s_journal ("
              + "SELECT null, s.stockid, s.userid, s.originalownerid, 2, now(), s.quantity "
              + "  FROM s_stock s"
              + " WHERE s.stockid = " + record.stockid + ')'
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, crudTask.reportError)
    }
}
