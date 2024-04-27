<?php

  require_once 'zmlfunctions.php';
  require_once 'zmldbfunctions.php';

  //first see if we have and getdata to process
  //Possibel GET variables (posted via zmlquery.php?what=ever)
  $qvars = ["query","q"
           ,"getcountry","country"
		   ,"ipaddress","ip"
		   ,"newone"];
  

  //make all lowercase, for incase the guy pass uppercase
  $_GET_lower = array_change_key_case($_GET, CASE_LOWER);
  //var_dump($_GET);
  $query = '';
  foreach ($qvars as $q) {
      if (isset($_GET_lower[$q])) {
          $query = $_GET_lower[$q];
		  break;
	  }
  }	  
  if ($query) {
	  //see what our client want
	  processRequestForQuery($query);
      return;
  }	  

  //see which process our json request

  $data = json_decode(file_get_contents('php://input'), true);
  //echo "we decoded json";
  if ($data) {
	 //echo "we process json";
     processJsonRequest($data);
  } else {
    echo "We received no instruction!";
   }
  
  return;



?>
