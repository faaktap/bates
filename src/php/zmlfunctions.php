<?php


function imgPath($imgtype,$imagefile) {
	$Main = "/wp-test/wp-content/themes/twentyseventeen-child/assets/";
	switch (strtolower($imgtype)) {
		case "award":
		case "Award":
		case "trophy":
		case "Trophy":
		   $path = $Main . "images/";
		default:
           $path = $Main . "images/";
		
	}
	return $path . $imagefile;
	
}


//-----------------------------------------------------------------------------------
//this function first see if we can quickly serve our request with no extra coding
//-----------------------------------------------------------------------------------
function processRequestForQuery($query) {
	switch (strtolower($query)) {
		case "hello":
		   echo "Hello Yourself";
		   break;
		case "getcountry":
		   getCountry();
		   break;
		case "ipaddress":
		case "ip":
		   echo getRealIpAddr();
		   break;  
		case "img-judge":
		   echo '/assets/images/gallery/judges/';
		   break;    
		case "img-medals":
		   echo '/assets/images/judges/';
		   break;    
		case "img":
		   echo '/assets/images/general/';
		   break;
		case "filename":
		   echo convertToFilename($_GET_lower['filename']);
		   break; 		   
   		case "log":
     	   doLog(["method" => "processRequest","test" => "test"]);
		   break;    		   

	default:
        echo "ZMLError:processReq:We do not understand: " . $query . " yet..";		   
	}
}

//-----------------------------------------------------------------------------------
//Sometimes we want to convert a weird accent winename or wineryname to a plain jane filename. 
//-----------------------------------------------------------------------------------
function convertToFilename($accentname) {
  setlocale(LC_ALL, 'en_US.utf8');
  $filename = iconv('utf-8', 'us-ascii//TRANSLIT', $accentname);
  return ($filename);
}

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
function getRealIpAddr()  
{  
    if (!empty($_SERVER['HTTP_CLIENT_IP']))  
    {  
        $ip=$_SERVER['HTTP_CLIENT_IP'];  
    }  
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
    //to check ip is pass from proxy  
    {  
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];  
    }  
    else  
    {  
        $ip=$_SERVER['REMOTE_ADDR'];  
    }  
    return $ip;  
}  

