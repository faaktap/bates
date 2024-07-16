import printJS from "print-js";
import { zmlConfig } from '@/api/constants';

function cl(...args) {
  console.log('zmPrn:',...args)
}

export default printJS;

function zmlHeader() {
//https://thenextweb.com/news/how-to-manipulate-date-and-time-in-javascript
    let dateNow = new Date()
    return `<small style="text-align: right;float: right;">De Kuilen HS<br>${zmlConfig.reportBlurb||'printed'} on ${dateNow.toDateString()}</small>`
    /*
    return `\
     <span style="{text-align: right; font-weight: lighter; font-size: 40%; color: DarkSlateGray">\
     ${zmlConfig.reportBlurb} on ${dateNow.toDateString()}\
     </span>`
     */
}

 // eslint-disable-next-line
function zmlStyle(name) {
    cl('apply style ', name)
    switch (name) {
    case 'footie' :
      return `footer {font-size: 9px;color: #f00;text-align: center;}\
  @page {size: A4;margin: 11mm 17mm 17mm 17mm;}\
  @media print {\
    footer {position: fixed;bottom: 0;}\
    .content-block, p {page-break-inside: avoid;}\
    html, body {width: 210mm;height: 297mm;}\
  }`
  case 'test1' : {
    return ` header, .header-space,
    footer, .footer-space {
        height: 100px;
        font-weight: bold;
        width: 100%;
        padding: 10pt;
        margin: 10pt 0;
    }

    header {
        position: fixed;
        top: 0;
        border-bottom: 1px solid black;
    }

    footer {
        position: fixed;
        bottom: 0;
        border-top: 1px solid black;
    }`
  }
  }
  alert('wrong style')
  return ""
}

function cleanUp(header) {
    let onlyValues =  header.map(ele => ele.value)
    let noActions = onlyValues.filter(ele => ele != 'actions')
    return noActions
}

export function printHeader(title) {
    let dateNow = new Date()
    let blurb = `${zmlConfig.reportBlurb} <br> &nbsp; ${dateNow.toDateString()}`
    return `\
    <table width="100%" style="border-radius: 0;border: 0px; padding-bottom: 10px;">
    <tr>
     <td width="20%" style="border-radius: 0;border: 0px;font-weight: lighter; font-size: 40%; color: DarkSlateGray">
       ${blurb}
     </td>
     <td width="60%" style="text-align: center;border-radius: 0;border: 0px;">
       <strong>High School De Kuilen Hoërskool</strong><br>${ title }
     </td>
     <td width="25%" style="float: right; text-align: right;border: 0px;border-radius: 0;">
       <img width="35" src="https://kuiliesonline.co.za/virtual-school/img/logo.png" />
     </td>
    </tr>
    </table>`
}

export function printJSON1(table, properties, title) {
  printJS({
    printable: table,
    type: "json",
    properties: properties,
    repeatTableHeader: true,
    gridHeaderStyle: "color: lightblue;  border: 1px solid #3971A5;font-weight: bold",
    //gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
    gridStyle: 'border-style: none solid dotted dashed; border-width: 1px ;border-color: lightblue; margin-bottom: 1px; padding-top: 4px;padding-left: 4px',
    header: zmlHeader() + ' ' + title || '..no title',
    style: ".ltrd { direction: ltr; text-align: center; } * { font-size: 101%; }" ,
    showModal: false,
    modalMessage: 'Retrieving Document...',
    documentTitle: 'DKLearnDoc',
    footer: '<h2>test</h2>',
})
}

export function printJSON(table, header, title) {
    let properties = cleanUp(header)
    cl('ZPjs',table)
    cl('ZPjs',header)
    cl('ZPjs','this is props:',properties)
    cl('ZPjs',title)
    printJS({
        printable: table,
        type: "json",
        properties: properties,
        repeatTableHeader: true,
        gridHeaderStyle: "color: lightblue;  border: 1px solid #3971A5;font-weight: bold",
        gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
        //gridStyle: 'border-style: none solid dotted dashed; border-width: 1px ;border-color: lightblue; margin-bottom: 1px; padding-top: 2px',
        header: zmlHeader() + ' ' + title || '..no title',
        style: ".ltrd { direction: ltr; text-align: center; } * { font-size: 101%; }" ,
        showModal: false,
        modalMessage: 'Retrieving Document...',
        documentTitle: 'DKLearnDoc',
        footer: '<h2>test</h2>',
    })
    //gridStyle: "border: 1px solid #3971A5;  text-align: center;",
    /* + `.foot {display: -webkit-box;
        display: -ms-flexbox;        display: flex;        -webkit-box-pack: justify;        -ms-flex-pack: justify;
        justify-content: space-between;        width: 100%;        position: absolute;        top: 27.7cm !important;
        padding-right: 2cm !important;}`
    */
}

export function printJSONBig(table, header, title) {
  let properties = cleanUp(header)
  printJS({
      printable: table,
      type: "json",
      properties: properties,
      repeatTableHeader: true,
      gridHeaderStyle: "color: black;  border: 1px solid #3971A5;font-weight: bold",
      gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
      header: zmlHeader() + ' ' + title || '..no title',
      style: ".ltrd { direction: ltr; text-align: right; } * { font-size: 115%; }",
      showModal: false,
      modalMessage: 'Retrieving Document...',
      documentTitle: 'DKLearnDoc'
  })
  //gridStyle: "border: 1px solid #3971A5;  text-align: center;",
}

export function printPage( htmlRef, small ) {
  //Here we pick up all the styles and send it to printJS - does not work so well
  // let stylesHtml = '';
  // for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
  //   stylesHtml += node.outerHTML;
  // }

   let style =
`@page { margin-top: 10px }\
 @media print {\
  .print  {display:block}\
  body {overflow: auto;height: auto;font:Garamond;}\
  h1 { color: #1c3a1b }\
  heading { color: #1c3a1b }\
  p.bodyText {font-size:8pt}\
  th, td {border-radius:2px; padding: 2px;margin: 2px; border: 1px solid #e6e4ed;}\
  table: {width:95%;}\
  aside {display: none;}\
  main {display: block;}\
}`
    if (small) {
     style = `@page { margin-top: 45px;}\
      @media print {\
      .print  {display:block}\
      .noprint {display:none}\
      body {overflow: auto;height: auto;width: 100%;}\
      h1 { color: #1c3a1b }\
      heading { color: #1c3a1b; height: 150px}\
      p.bodyText {font-size:12pt}\
      th, td {font-size: 14pt; border-radius: 1px; padding: 1px; margin: 1px; border: 1px solid #e6e4ed;}\
      table: {width:95%;}\
      aside {display: none;}\
      main {display: block;}\
      .red {background-color: rgb(182, 164, 201); font-style: italic;}\
      .blue {background-color: gainsboro; font-style: oblique;}\
     }`
    }

    printJS({
       printable: htmlRef,
       type: "html",
       style: style,
       scanStyles: false,
       onPrintDialogClose: () => cl("The print dialog was closed"),
       onError: e => cl(e)
      });
    //   header: 'zmlHeader()',
    //   headerStyle: `align: center;font:Garamond`,
    //   maxWidth: 800,

 }

export function printImages(imageList, header, imageStyle='width:50%;margin-bottom:20px;') {
 /* basic option - cannot get images side by side
 printJS({
  printable: imageList,
  type: 'image',
  header: header,
  imageStyle: imageStyle,
  showModal: true, // Optional
  modalMessage: 'Printing Images...', // Optional
 })
 */
 cl('notised',imageStyle)

 let style =
 `@page { margin-top: 10px }\
  @media print {\
   .print  {display:block}\
   body {overflow: auto;height: auto;font:Garamond;}\
   h1 { color: #1c3a1b }\
   heading { color: #1c3a1b }\
   p.bodyText {font-size:8pt}\
   th, td {border-radius:2px; padding: 2px;margin: 2px; border: 1px solid #e6e4ed;}\
   table: {width:95%;}\
   aside {display: none;}\
   main {display: block;}\
 }`
  let htmlRef = `<html><div style="display: flex;flex-direction: row;">`
  imageList.forEach(e => htmlRef += `<img src="${e}" style="display:inline-block;vertical-align:top;"> </img>`)
  htmlRef += '</div>'
  printJS({
    printable: htmlRef,
    type: "html",
    style: style,
    onError: e => cl(e)
   });


 alert('make an htmlref with images and captions...')

/*printable: images,
    type: 'image',
    header: 'PrintJS Images Test', // Optional
    showModal: true, // Optional
    modalMessage: 'Printing Images...', // Optional
    style: 'img { max-width: 400px;}' // Optional
    */
}


export function printID(id, header) {
  printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      header: header
  })
}

 /*
 https://printjs.crabbly.com
 Configuration
Print.js will accept an object as argument, where you can configure some options:

Argument    Default Value   Description
printable   null            Document source: pdf or image url, html element id or json data object.
type        'pdf'           Printable type. Availble print options are: pdf, html, image, json and raw-html.
header      null            Optional header to be used with HTML, Image or JSON printing. It will be placed on the top of the page. This property will accept text or raw HTML.
headerStyle 'font-weight: 300;' Optional header style to be applied to the header text.
maxWidth    800             Max document width in pixels. Change this as you need. Used when printing HTML, Images or JSON.
css         null            This allow us to pass one or more css files URLs that should be applied to the html being printed. Value can be a string with a single URL or an array with multiple URLs.
style       null            This allow us to pass a string with custom style that should be applied to the html being printed.
scanStyles  true            When set to false, the library will not process styles applied to the html being printed. Useful when using the css parameter.
targetStyle null            By default, the library process some styles only, when printing HTML elements. This option allows you to pass an array of styles that you want to be processed. Ex.: ['padding-top', 'border-bottom']
targetStyles null           Same as `targetStyle`, however, this will process any a range of styles. Ex.: ['border', 'padding'], will include 'border-bottom', 'border-top', 'border-left', 'border-right', 'padding-top', etc.
                            You can also pass ['*'] to process all styles.
ignoreElements  [ ]         Accepts an array of html ids that should be ignored when printing a parent html element.
properties      null        Used when printing JSON. These are the object property names.
gridHeaderStyle 'font-weight: bold;'    Optional style for the grid header when printing JSON data.
gridStyle   'border: 1px solid lightgray; margin-bottom: -1px;'     Optional style for the grid rows when printing JSON data.
repeatTableHeader   true    Used when printing JSON data. When set to false, the data table header will show in first page only.
showModal   null    Enable this option to show user feedback when retrieving or processing large PDF files.
modalMessage    'Retrieving Document...'    Message displayed to users when showModal is set to true.
onLoadingStart  null    Function to be executed when PDF is being loaded
onLoadingEnd    null    Function to be executed after PDF has loaded
documentTitle   'Document'  When printing html, image or json, this will be shown as the document title.
fallbackPrintable   null    When printing pdf, if the browser is not compatible (check browser compatibility table), the library will open the pdf in a new tab. This allow you to pass a different pdf document to be opened instead of the original passed in `printable`. This may be useful if you inject javascript in your alternate pdf file.
onPdfOpen   null    When printing pdf, if the browser is not compatible (check browser compatibility table), the library will open the pdf in a new tab. A callback function can be passed here, which will be executed when this happens. It may be useful in some situations where you want to handle your print flow, update user interface, etc.
onPrintDialogClose  null    Callback function executed once the browser print dialog is closed.
onError error => throw error    Callback function to be executed when an error occurs.
base64  false   Used when printing PDF documents passed as base64 data.
honorMarginPadding (deprecated )    true    This is used to keep or remove padding and margin from elements that are being printed. Sometimes these styling settings are great on screen but it looks pretty bad when printing. You can remove it by setting this to false.
honorColor (deprecated )    false   To print text in color, set this property to true. By default all text will be printed in black.
font (deprecated ) 'TimesNewRoman' Typeface used when printing HTML or JSON.
font_size (deprecated ) '12pt' Font size used when printing HTML or JSON.
imageStyle (deprecated ) 'width:100%;' Used when printing images. Accepts a string with custom styles to be applied to each image.

 */