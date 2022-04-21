SELECT s.stockid, s.typeid, s.userid, s.originalownerid
        , s.devalid, s.placeid  , s.name, s.datereceived
        , ifnull(p1.public_preferredname,'?') ownername
        , ifnull(p2.public_preferredname,'?') user 
        , ifnull(p.name,s.placeid) place
        , ifnull(d.rulename,s.devalid) rulename
        , ifnull( substring_index(t.name,'/',1),s.typeid) itemtype 
        , ifnull(c.name,t.catid) category
        , s.serialno, s.quantity, s.price  
    FROM s_stock s 
    LEFT JOIN dkhs_personel p2 on s.userid = p2.persid 
    LEFT JOIN dkhs_personel p1 on p1.persid = s.originalownerid  
    LEFT JOIN s_devaluation d on s.devalid = d.devalid 
    LEFT JOIN s_itemtype t on  t.typeid = s.typeid 
    LEFT JOIN s_place p on s.placeid = p.placeid 
    LEFT JOIN s_category c on t.catid = c.catid
  ORDER BY s.stockid DESC
  


SELECT s.stockid, s.typeid, s.userid, s.originalownerid
        , s.devalid, s.placeid  , s.name, s.datereceived
        , ifnull(p1.public_preferredname,'?') ownername
        , ifnull(p2.public_preferredname,'?') user 
        , ifnull(p.name,s.placeid) place
        , ifnull(d.rulename,s.devalid) rulename
        , ifnull(t.name,s.typeid) itemtype 
        , ifnull(c.name,t.catid) category
        , s.description, s.serialno, s.quantity, s.price  
    FROM s_stock s 
    LEFT JOIN dkhs_personel p2 on s.userid = p2.persid 
    LEFT JOIN dkhs_personel p1 on p1.persid = s.originalownerid  
    LEFT JOIN s_devaluation d on s.devalid = d.devalid 
    LEFT JOIN s_itemtype t on  t.typeid = s.typeid 
    LEFT JOIN s_place p on s.placeid = p.placeid 
    LEFT JOIN s_category c on t.catid = c.catid
  ORDER BY s.stockid DESC