// eslint-disable-next-line
function makeAWait(milisecs,nextProc,parm1, parm2 ,parm3) {
 let openWin = new Promise((resolve) => {
   let wagbietjie = setTimeout(() => {
     clearTimeout(wagbietjie);
     resolve( nextProc(parm1,parm2, parm3 )) ;
     if (parm3 ) {console.log('sdfsdfsdfsdfsdfsdfsdfsdasda',parm3); parm3=false}
   }, milisecs)
 })
 console.log(openWin)
}


function addToQueue(receivedFiles,fileList) {
  let problemFiles = 0
  receivedFiles.forEach(file => {
    if (file.size > 92*1024*1024)  {
      file.ignore = true
      problemFiles += 1
    } else {
      file.ignore = false
    }
    //check if in list already
    fileList.forEach(already => {
      if (file.name == already.name)  {
        problemFiles += 1
        file.ignore = true
      }
    })
    file.done = false

    if (!file.type && file.size%4096 == 0) {
      // The file is a folder
      file.ignore = true
    }

    if (file.ignore == false) {
       file.ext = file.name.split('.').pop().toLowerCase()
       file.realname = file.name
       fileList.push(file);
    }
  })
  return problemFiles
}

function uploadFiles(fileUploader,files,updateProgress) {
  files.forEach(file => {
   let fr = new FileReader()
   fr.onload = function(response) {
     makeAWait(2000,fileUploader,response, file)
   };
   fr.onerror = function(response,file) {
     console.log('res - Some Error!' ,file,response);
   };
   fr.onprogress = updateProgress;
   fr.readAsDataURL(file);

  });
}


export {makeAWait, addToQueue, uploadFiles } 