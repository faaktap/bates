import { zmlConfig } from '@/api/constants';
import { zmlFetch } from '@/api/zmlFetch';
import { infoSnackbar, errorSnackbar } from '@/api/GlobalActions';

export const tableWork = {
    name:'tableJournalJS',
    hello: (p1) => {console.log('hello from (JS) ' , p1)},
    getIndex: (itemID,table) => {
        let index = table.findIndex(ele => ele.journalid == itemID)
        if (index == -1) {
          errorSnackbar('item not found for processing', index)
        }
        return index
    },
    delete: (itemID,table) => {
        let index = tableWork.getIndex(itemID,table)
        if (index != -1) {
           table.splice(index,1);
        }
    },
    getData: (key, pCallback) => {
        console.log(key)
        let ts = {}
        ts.task = 'PlainSql'
        ts.sql = `SELECT j.journalid, j.stockid, j.userid, j.persid, j.journaltypeid, j.datecreated, j.quantity\
                     ,p1.public_preferredname owner, p2.public_preferredname user \
                    ,s.name stockitem, s.placeid, p.name place, t.name journaltype \
                FROM s_journal j, dkhs_personel p1, dkhs_personel p2 , s_stock s, s_place p, s_journaltype t \
               WHERE j.persid = p1.persid\
                 AND j.userid = p2.persid\
                 AND s.placeid = p.placeid\
                 AND s.stockid = j.stockid\
                 AND j.journaltypeid = t.journaltypeid\
               ORDER BY j.journalid ASC`
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pCallback, errorFetch)
    },
    createNewItem: (record, pAfterwards) => {
       let ts = {}
       ts.task = 'PlainSql'
       ts.sql = "insert into s_journal values(null, "
                + record.stockid + ","
                + record.userid + ","
                + record.persid + ","
                + record.journaltypeid + ","
                + "now()" + ","
                + record.quantity + ")'"
       console.log(ts.sql)
       ts.api = zmlConfig.apiPath
       zmlFetch(ts, pAfterwards, errorFetch)
    },
    saveData: (record,pcallback=doneFetch) => {
        let ts = {}
        ts.task = 'PlainSql'
        ts.data = {journalid: record.journalid
                  ,stockid:   record.stockid
                  ,userid:    record.userid
                  ,persid:    record.persid
                  ,journaltypeid: record.journaltypeid
                  ,datecreated: record.datecreated
                  ,quantity:    record.quantity}
        ts.data.bind = {journalid: record.journalid
            ,stockid:   record.stockid
            ,userid:    record.userid
            ,persid:    record.persid
            ,journaltypeid: record.journaltypeid
            ,datecreated: record.datecreated
            ,quantity:    record.quantity}
        ts.sql = 'update s_itemtype set stockid = :stockid, userid = :userid'
               + '      ,persid = :persid, journaltypeid = :journaltypeid'
               + '      ,datecreated = :datecreated, quantity = :quantity'
               + ' where journalid = :journalid'
        ts.api = zmlConfig.apiPath
        zmlFetch(ts, pcallback, errorFetch)

    },
    deleteData: (record,pcallback=doneFetch) => {
      let ts = {}
      ts.task = 'PlainSql'
      ts.data = {journalid: record.journalid
        ,stockid:   record.stockid
        ,userid:    record.userid
        ,persid:    record.persid
        ,journaltypeid: record.journaltypeid
        ,datecreated: record.datecreated
        ,quantity:    record.quantity}
      ts.sql = 'delete from s_journal where journalid = ' + record.journalid
      ts.api = zmlConfig.apiPath
      zmlFetch(ts, pcallback, errorFetch)
  },
}

function doneFetch (response) {
    console.log('doneLoading:', response)
    if ( response.error ) {
        errorSnackbar(response.error)
    } else {
        infoSnackbar('We saved your data, will email it as well')
    }
}

function errorFetch (response) {
    console.log('error:', response)
    errorSnackbar('We had an error saving your data!' + response)
}