<?php
//-----------------------------------------------------------------------------------
//Include files
require_once('database.php');
require_once('config.inc.php');
require_once('newStaticPDO.php');
error_reporting(E_ALL & ~E_WARNING);


//------------------------------------------------------------------------------
function checkSqlInDatabase($task, $data) {
// if we do not understand method....in processJsonReq, then we look in DB if
// there are any tasks defined there.    
//------------------------------------------------------------------------------
    $sql = 'select * from `aws_sql` where lower(task) = :task and sortorder > 0';
    $stmt = DB::prepare($sql);   
    $stmt->bindParam(':task',$task, PDO::PARAM_STR);
    try {
      $stmt->execute();
    } catch (Exception $e){
        $result = ['errorcode' => 199,'result' => 'exception','exception' => "on CheckSql" , 'error' => json_encode($e)];
        logme('CheckSQL',$task,json_encode($result));
	    return $result;
    }        
    if ($stmt->rowCount() == 1) {
        $dbdata = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $result = ['errorcode' => 77,'result' => 'no rows returned','task' => $task , 'error' => $sql];
        logme('CheckSQL',$task,json_encode($result));
	    return $result;        
    }
    //When we get here, we have the sql we need to run
    //But we need to merge the two arrays for incase there is binding to be done
    $newData = array_merge($dbdata[0], $data);
    return plainSql ($newData);
}

//------------------------------------------------------------------------------
function plainSql($data) {
// call task with plainsql and sql with sql statement
//------------------------------------------------------------------------------
  $weDoBind = false;
  if (array_key_exists('data',$data)) {
     $binding = $data['data'];    
     if (array_key_exists('bind',$binding)) {
         $bind = $binding['bind'];
         $weDoBind = true;
     }
  }
  
  $sql = $data['sql'];
  $stmt = DB::prepare($sql);
  
  $debug = 0;
  if ($weDoBind) {
    if ($debug) { 
        $t = $data['task']; 
        echo "\r\n<br>TASK : $t";
    }
    //bindValue is better than bindParam in this case - bindParam need a variable
    if ($debug) echo "\r\n<br>JE " . json_encode($bind);
    if ($debug) echo "\r\n<br>BI " . json_encode($binding);
    foreach ($bind as $key => $value) {
     //if ($debug) echo "\r\n<br>START of LOOP $key, $value and $bind[$key]";
     if (is_numeric($value)) {
         if (isset($value) && $value !== '') {
            $e = $stmt->bindValue(':'.$key  ,  $value, PDO::PARAM_INT);   
            if ($debug) echo "\r\n<br>BIND-AS-INT :$key=$value, bp=$e";
         } else {
            $e = $stmt->bindValue(':'.$key  ,  null, PDO::PARAM_INT);
            if ($debug) echo "\r\n<br>BIND-INT-AS-NULL :$key=$value, bp=$e";
         }
     } else {
         //$e = $stmt->bindValue(':'.$key  ,$bind[$key], PDO::PARAM_STR);   
         if (strpos($key, 'date')) {
             if (isset($value) && $value !== '') {
                $e = $stmt->bindParam(':'.$key  ,$bind[$key]);
                if ($debug) echo "\r\n<br>BIND-AS-DT-PARAM :$key='$dd', bp=$e";
             } else {
                $e = $stmt->bindValue(':'.$key  ,  null, PDO::PARAM_INT); 
                if ($debug) echo "\r\n<br>BIND-AS-DT-NULL :$key='$dd', bp=$e";
             }
         } else  {
             if (isset($value) && $value !== '') {
               $e = $stmt->bindValue(':'.$key  ,$value);   
               if ($debug) echo "\r\n<br>BIND-AS-VALSTR :$key='$value', bp=$e";
             } else {
               $e = $stmt->bindValue(':'.$key  ,  null, PDO::PARAM_INT);     
               if ($debug) echo "\r\n<br>BIND-AS-STR-NULL :$key='$value', bp=$e";
             }
         }
    }
    if ($debug) echo  "\r\n<br>";
    //if ($debug) echo  "sql = $sql";
    //if ($debug) echo  "\r\n<br>";
    }
 }
  try {
    $stmt->execute();
  } catch (Exception $e){
        $result = ['errorcode' => 91,'result' => 'exception','exception' => "on PlainSql" , 'error' => json_encode($e)];
//        logme('PlainSQL','plSql',json_encode($result));
	    return $result;
  }    
  if (strtolower(substr($sql,0,1)) == "s") {   
      //only return data if it is a select, since fetch_assoc does not work on update/insert
     if ($stmt->rowCount() > 0) {
        $dbdata = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $dbdata;
     }
   }
   return ['errorcode' => 0, 'error' => 'no rows returned ' . $sql];
}

//------------------------------------------------------------------------------
function oneValueSql($data) {
// sometimes we just need onevalue - this is not defined in json yet
//------------------------------------------------------------------------------
   $stmt = DB::prepare($data);
   try {
      $stmt->execute();
   } catch (Exception $e){
        $result = ['errorcode' => 91,'result' => 'exception','exception' => "on PlainSql" , 'error' => json_encode($e)];
        logme('PlainSQL','ovSql',json_encode($result));
	    return $result;
   }    
   if ($stmt->rowCount() > 0) {
       $dbdata = $stmt->fetchAll( PDO::FETCH_COLUMN );
       return $dbdata[0];
   }
   return 'nodata';
}

//------------------------------------------------------------------------------
function noValueSql($data) {
// sometime we are not interesting in a value to return    
//------------------------------------------------------------------------------
   $stmt = DB::prepare($data);
   try {
      $stmt->execute();
   } catch (Exception $e){
        $result = ['errorcode' => 91,'result' => 'exception','exception' => "on PlainSql" , 'error' => json_encode($e)];
        logme('PlainSQL','nvSql',json_encode($result));
	    return $result;
   }    
   return '';
}

//------------------------------------------------------------------------------
function updateStock($data) {
// call task with plainsql and sql with sql statement
//------------------------------------------------------------------------------
  $stock = $data['data'];
  if ( $stock['stockid'] == 0 ) {
      return ['result' => 'Error', 'errorcode' => 12, 'error' => 'Stockid is null'];
  }    
  $sql = 'update s_stock '
         . '   set typeid = :typeid '
         . '     , userid = :userid '
         . '     , originalownerid = :originalownerid '
         . '     , devalid = :devalid '
         . '     , placeid = :placeid '
         . '     , name = :name '
         . '     , description = :description  '
         . '     , serialno = :serialno '
         . '     , quantity = :quantity '
         . '     , price = :price '
         . ' where stockid = '  . $stock['stockid'];
   $stmt = DB::prepare($sql);
    $stmt->bindParam(':typeid'          ,$stock['typeid']    , PDO::PARAM_INT);  
    $stmt->bindParam(':userid'          ,$stock['userid']    , PDO::PARAM_INT);
    $stmt->bindParam(':originalownerid' ,$stock['originalownerid']  , PDO::PARAM_INT);
    $stmt->bindParam(':devalid'         ,$stock['devalid']   , PDO::PARAM_INT);  
    $stmt->bindParam(':placeid'         ,$stock['placeid']   , PDO::PARAM_INT);  
    $stmt->bindParam(':name'            ,$stock['name']      , PDO::PARAM_STR);  
    $stmt->bindParam(':description'     ,$stock['description']  , PDO::PARAM_STR);  
    $stmt->bindParam(':quantity'        ,$stock['quantity']  , PDO::PARAM_INT);    
    $stmt->bindParam(':serialno'        ,$stock['serialno']  , PDO::PARAM_STR);  
    $stmt->bindParam(':price'           ,$stock['price']     , PDO::PARAM_STR);
    try {
         $stmt->execute();
    } catch (Exception $e){
         $err = ['errorcode' => 13,'result' => 'exception','exception' => 'on update s_stock ' , 'error' => json_encode($e), 'sql' => $sql];
         return $err;
    }
    return ['result' => 'OK', 'errorcode' => 0, 'error' => '', 'sql' =>  $sql];
}

//------------------------------------------------------------------------------
function insertStock($data) {
//------------------------------------------------------------------------------
  $stock = $data['data'];
  if ( $stock['stockid'] != 0 ) {
      return ['result' => 'Error', 'errorcode' => 14, 'error' => 'Stockid is not null'];
  }    
//insert into s_stock values (null,10,190,162,3,1,"MultiBench","",30,"",now(),0)  
  $sql = "insert into s_stock values(null " 
                . " , " . $stock['typeid'] 
                . " , " . $stock['userid'] 
                . " , " . $stock['originalownerid'] 
                . " , " . $stock['devalid'] 
                . " , " . $stock['placeid'] 
                . " , :name "
                . " , :description "
                . " , " .$stock['quantity'] 
                . " , :serialno "
                . " ,now() "
                . " ,:price )";
   $stmt = DB::prepare($sql);
    //$stmt->bindParam(':typeid'          ,$stock['typeid']    , PDO::PARAM_INT);  
    //$stmt->bindParam(':userid'          ,$stock['userid']    , PDO::PARAM_INT);
    //$stmt->bindParam(':originalownerid' ,$stock['originalownerid']  , PDO::PARAM_INT);
    //$stmt->bindParam(':devalid'         ,$stock['devalid']   , PDO::PARAM_INT);  
    //$stmt->bindParam(':placeid'         ,$stock['placeid']   , PDO::PARAM_INT);  
    $stmt->bindParam(':name'            ,$stock['name']      , PDO::PARAM_STR);  
    $stmt->bindParam(':description'     ,$stock['description']  , PDO::PARAM_STR);  
    //$stmt->bindParam(':quantity'        ,$stock['quantity']  , PDO::PARAM_INT);    
    $stmt->bindParam(':serialno'        ,$stock['serialno']  , PDO::PARAM_STR);  
    $stmt->bindParam(':price'           ,$stock['price']     , PDO::PARAM_STR);
    try {
         $stmt->execute();
    } catch (Exception $e){
         $err = ['errorcode' => 16,'result' => 'exception','exception' => 'on insert s_stock ' , 'error' => json_encode($e), 'sql' => $sql];
         return $err;
    }
    $id = DB::lastInsertId();
    $jResult = journalTransactionAcquire($stock,$id);
    return $jResult;
}

//--------------------------------------------------------------------------------
function journalTransactionAcquire($data,$id){
//--------------------------------------------------------------------------------
   $sql = "insert into s_journal values(null, $id ," 
          . $data['userid'] . ","
          . $data['originalownerid'] . ","
          . 1 . ","
          . "now()" . ","
          . $data['quantity'] . ")";   
   $stmt = DB::prepare($sql);       
   try {
         $stmt->execute();
   } catch (Exception $e){
         $err = ['errorcode' => 24,'result' => 'exception','exception' => 'on insert s_stock ' , 'error' => json_encode($e), 'sql' => $sql];
         return $err;
   }
   return ['result' => 'OK', 'errorcode' => 0, 'sql' => $sql];
                
}
//--------------------------------------------------------------------------------
function logme($user,$pagename,$logdata) {
//--------------------------------------------------------------------------------
  $sql  = "INSERT INTO s_log VALUES (NULL , NOW() , :ip , 'LEARN1' , :user, :pagename, :logdata)";
  $stmt = DB::prepare($sql);   
  if (strlen($logdata) > 254) $logdata = substr($logdata,1,254);
  $ip = $_SERVER["REMOTE_ADDR"];
  $stmt->bindParam(':ip'       , $ip       , PDO::PARAM_STR);  
  $stmt->bindParam(':user'     , $user     , PDO::PARAM_STR);
  $stmt->bindParam(':pagename' , $pagename , PDO::PARAM_STR);
  $stmt->bindParam(':logdata'  , $logdata  , PDO::PARAM_STR);
  try {
     $stmt->execute();
  } catch (Exception $e){
     $result = ['errorcode' => 191,'result' => 'exception','exception' => 'on update dkhs ' , 'error' => json_encode($e), 'sql' => $sql];
     echo json_encode($result);
     LogData($result);
	 return $result;
  }
  return ['errorcode' => 0, 'result' => 'Log was updated'];
}