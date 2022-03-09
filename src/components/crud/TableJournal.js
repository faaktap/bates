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
        , ifnull(p1.public_preferredname,'owner?') owner\
        , ifnull(p2.user_name,'user?') user\
        , ifnull(s.name,'stock?') stockitem\
        , ifnull(s.placeid, 'place?') placeid\
        , ifnull(p.name, 'unknown') place\
        , ifnull(t.name,'j?') journaltype\
  FROM s_journal j\
  left join dkhs_personel p1 on j.persid = p1.persid \
  left join dkhs_learner p2 on j.userid = p2.userid\
  left join s_stock s on s.stockid = j.stockid\
  left join s_place p on s.placeid = p.placeid\
  left join s_journaltype t on j.journaltypeid = t.journaltypeid\
  ORDER BY j.journalid ASC
  `
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