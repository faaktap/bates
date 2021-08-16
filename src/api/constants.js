const PROJECT_ID = "zml48.1"
const MEASUREMENT_ID = "Z-ZML48.1"
const DEFAULT_LAYOUT = "AppLayoutDefault"
const MAX_UPLOAD_SIZE = 90 * 1024 * 1024

/*
  apiPath:    "https://kuiliesonline.co.za/api/candid/candidates.php",
  apiUpload:  "http://localhost:81/api/fileUpload/fileUpload.php",
  apiDKHS:    "http://localhost:81/api/dkhs/dkhs.php",
*/

/*
  apiPath:    "https://kuiliesonline.co.za/api/candid/candidates.php",
  apiUpload:  "https://kuiliesonline.co.za/api/fileUpload/fileUpload.php",
  apiDKHS:    "https://kuiliesonline.co.za/api/dkhs/dkhs.php",
*/


export const zmlConfig = {
  apiPath:    "https://kuiliesonline.co.za/api/candid/candidates.php",
  apiUpload:  "https://kuiliesonline.co.za/api/fileUpload/fileUpload.php",
  apiDKHS:    "https://kuiliesonline.co.za/api/dkhs/dkhs.php",
  localPath:  "https://kuiliesonline.co.za/",
  videoPath: "https://kuiliesonline.co.za/",
  emailPath: "https://kuiliesonline.co.za/api/swiftmailer/genMailer.php",
  maxUploadSize: MAX_UPLOAD_SIZE,
  projectID: PROJECT_ID,
  measurementID: MEASUREMENT_ID,
  defaultLayout: DEFAULT_LAYOUT,
  // eslint-disable-next-line
  cl: function (...args) {      console.log(...args);   },
  randomColor: function() {
    return Math.floor(Math.random()*16777215).toString(16)
  },
}

export const promiseTimeout = function(ms, promise){
  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject('Timed out in '+ ms + 'ms.')
    }, ms)
  })
  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    promise,
    timeout
  ])
}


/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
export const getContrast = function (hexcolor){

	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	// If a three-character hexcode, make six-character
	if (hexcolor.length === 3) {
		hexcolor = hexcolor.split('').map(function (hex) {
			return hex + hex;
		}).join('');
	}

	// Convert to RGB value
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);

	// Get YIQ ratio
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return (yiq >= 128) ? 'black' : 'white';

};

//add it to vue file like this.
//import { zmlConfig } from '@/api/constants.js'

//------------------------------------------
//Anyplace you want to use my zmlConfig.cl.
//------------------------------------------
//import { zmlConfig } from '@/api/constants';
//zmlConfig.cl('mount : ', this.$options.name , 'c=',this.$children.length);
