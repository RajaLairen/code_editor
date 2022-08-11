var {ipcRenderer}=require("electron");


window.addEventListener('keydown',(event)=>{
    if(event.ctrlKey && event.code=="KeyN"&& !event.shiftKey){
        createNewFile();
    }
})

window.addEventListener('keydown',(event)=>{
    if(event.shiftKey && event.ctrlKey &&  event.code=="KeyW"){
        ChooseWorkingDirectory();
    }
});

window.addEventListener('keydown',(event)=>{
    if(event.ctrlKey && event.shiftKey && event.code=="KeyN"){
        createNewFolder();
    }
})

window.addEventListener('keydown',(event)=>{
    
    if(event.ctrlKey && event.code=="KeyR"){
        event.preventDefault();
        runCode();
    }
})

function createNewFolder(){
    ipcRenderer.send("createNewFolder");
}

function ChooseWorkingDirectory(){
    ipcRenderer.send("ChooseWorkingDirectory");
}

window.addEventListener('keydown',(event)=>{
    if(event.ctrlKey && event.code=="F11"){
        fullScreen();
    }
})


function fullScreen(){
    ipcRenderer.send("fullScreen");
}

window.addEventListener('keydown',(event)=>{
    if(event.ctrlKey && event.code=="KeyS"){
        saveFile();
    }
})

window.addEventListener('keydown',(event)=>{
    if(event.ctrlKey && event.code=="KeyO"){
        openfile();
    }
})

ipc.on("ChooseWorkingDirectory",async(event)=>{
    let location=await dialog.showOpenDialog({properties:['openDirectory']});
    workingDirectoryPath=(location.filePaths[0]);
  })
  
  ipc.on("createNewFolder",(event)=>{
  });