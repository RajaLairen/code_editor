var {ipcRenderer}  = require('electron');
const ipc=ipcRenderer;
const fs=require("fs");


let localFilePath="";
let fileContent="";

var minimize=document.getElementById("Minimize");
var maximize=document.getElementById("Maximize")
var quit=document.getElementById("Quit");
 
minimize.addEventListener('click',()=>{
    ipc.send("minimize");
});

maximize.addEventListener('click',()=>{
    ipc.send("maximize");
});

quit.addEventListener('click',()=>{
    ipc.send("closeApp");
});

ipc.on("filePathcontent",(event,location)=>{
    console.log("Click");
    location=location.replaceAll("\\",">");
    document.getElementById("DirectoryPath").innerHTML=location;
})



function saveFile(){
    var fileDetails=getFileContent();
    
    
    //fs.writeFileSync(localFilePath,"abc",'utf-8')
    ipc.send("saveFile",fileDetails._codeContent,fileDetails._activePanel);
}

ipc.on("openfileActivePanel",(event,filePath,activePanel)=>{
    changingFileName(filePath,activePanel);
})

//Changing file name when save
ipc.on('asynReply',(event,args)=>{
   let activePanel=getFileContent()._activePanel;
   changingFileName(args,activePanel);
})

function changingFileName(filePath,activePanel){
    

    let FilePath=filePath.toString()

    let FileNameArray=FilePath.split("\\");
    let fileNam=FileNameArray[FileNameArray.length-1];

    const codeTitle=document.querySelectorAll(".fileNameSpan");

    codeTitle.forEach((codePanel)=>{
       let attribute=codePanel.getAttribute('name');
       if(activePanel==attribute){
           codePanel.innerHTML=fileNam;
       }
    })
}

function openfile(){
    ipc.send("openFile",getLastActivePanelName());
}


ipcRenderer.on('file',(event,filePath,content)=>{
    localFilePath=filePath;
    fileContent=content;
})