const {exec}=require('child_process');



var {ipcRenderer}=require('electron');
const { STATUS_CODES } = require('http');
const { stdout, stderr, openStdin } = require('process');
const { start } = require('repl');


var activePanel="";
var outputCode="";
var hasError=false;
var errorFile=""
var contentFile;



ipcRenderer.on("ActivePanel",(event,content)=>{
    activePanel=content;
})


ipcRenderer.on("RunReply",(event,content)=>{
    saveFile();
    exec("java "+content+"",(error,stdout,stderr)=>{
        if(error){
            hasError=true;
            errorFile=error;
            return;
        }
        if(stderr){
            hasError=true;
            return;
        }

        outputCode=stdout;
    })
    
    setTimeout(outPut,3000)
})



function outPut(){
    var outputs=document.querySelectorAll(".code");
        outputs.forEach((output)=>{
            if(output.getAttribute('name')==activePanel){
                if(!hasError){
                    output.children[1].style.color="rgb(9, 145, 9)";
                    output.children[1].innerHTML=outputCode;
                }
                else{
                    output.children[1].style.color="red";
                    output.children[1].innerHTML=errorFile;
                    hasError=false;
                }
                outputCode="";
        }
    })
}


function runCode(){
    ipcRenderer.send("RunBatFile");
    //ipcRenderer.send("run");
    exec("cd",(error,stdout,stderr)=>{
        if(error){
            return;
        }
        if(stderr){
            return;
        }
        stdout=stdout.replace(/\s+/g,'');
        stdout=stdout+"\\Bat\\temp.bat";
        console.log(stdout);
        exec("start "+stdout);
    })
}