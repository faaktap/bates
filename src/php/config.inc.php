<?php

date_default_timezone_set('Africa/Johannesburg');
setlocale(LC_MONETARY, 'en_ZA');

//------------------------------------------------------------//
// Define constants for database connectivty
//------------------------------------------------------------//

//kuiliesonline.co.za
define('DATABASE_NAME', 'kuilieso_bib');
define('DATABASE_USER', 'kuilieso_db');
define('DATABASE_PASSWORD', 'k@1L13sD@t@bAs3');
define('DATABASE_PORT', '3306');



//local computer
/*
define('DATABASE_NAME', 'kuilieso_bib');
define('DATABASE_USER', 'root');
define('DATABASE_PASSWORD', '');
define('DATABASE_PORT', '3307');
*/

/*
//zmlrekenaars
define('DATABASE_NAME', 'zmlreken_test');
define('DATABASE_USER', 'zmlreken_db');
define('DATABASE_PASSWORD', 'Ek()isN0mm3r!@#');
define('DATABASE_PORT', '3306');
*/


/** MySQL hostname */
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DATABASE_CHARSET', 'utf8mb4');
define('DATABASE_HOST', 'localhost');
defined('DATABASE_DSN') ? NULL : define('DATABASE_DSN','mysql:host='.DATABASE_HOST.';port='.DATABASE_PORT.';dbname='.DATABASE_NAME.';charset='.DB_CHARSET);

//------------------------------------------------------------//
// Define absolute application paths
//------------------------------------------------------------//
//------------------------------------------------------------//
// Use PHP's directory separator for windows/unix compatibility
defined('DS') ? NULL : define('DS', DIRECTORY_SEPARATOR);
//------------------------------------------------------------//
// Define absolute path to server root
defined('SITE_ROOT') ? NULL : define('SITE_ROOT', dirname(dirname(__FILE__)).DS);
//------------------------------------------------------------//

require_once('newStaticPDO.php');
