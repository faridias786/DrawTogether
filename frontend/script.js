let tool_container = document.querySelector(".tool-container");
console.log(tool_container);
let option_container = document.querySelector(".option-container");
let optionflag = true;
let pencil_container = document.querySelector(".pencil-tool-container");
let eraser_container = document.querySelector(".eraser-tool");
let pencil = document.querySelector(".pencil1");
let eraser = document.querySelector(".eraser1");
let sticky = document.querySelector(".sticky-1")//image
let upload = document.querySelector(".Upload");
let pencilflag=false;
let eraserflag=false;


//true --> tools show ,false --> hide tools
    //inside option-container i have only one div class and that is child and which can be accessed by 0 element
option_container.addEventListener("click",(e)=>{
    if(optionflag){
        openTool();
        optionflag=false;
    }
    else{
        closeTool();
        optionflag=true;
    }
    
})
function openTool(){
    let iconElem = option_container.children[0];
    iconElem.classList.remove("fa-x");
    iconElem.classList.add("fa-bars");
    tool_container.style.display="flex";
}
function closeTool(){
    let iconElem = option_container.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-x");
    tool_container.style.display="none";
    pencil_container.style.display="none";
    eraser_container.style.display="none";
}
//true -->show pencil ,false -->hide pencil
pencil.addEventListener("click",(e)=>{
    pencilflag=!pencilflag;
    if(pencilflag){
        pencil_container.style.display="block";
    }
    else{
        pencil_container.style.display="none";
    }
})
eraser.addEventListener("click",(e)=>{
    eraserflag=!eraserflag;
    if(eraserflag){
        eraser_container.style.display="flex";
    }
    else{
        eraser_container.style.display="none";
    }
})

upload.addEventListener("click",(e)=>{
    //open file explorer
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    // 0 means select one file 
    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let Url = URL.createObjectURL(file);
        let stickyConst = document.createElement("div");
        stickyConst.setAttribute("class" , "sticky-container");
        stickyConst.innerHTML = `
        <div class="header-container">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-container">
            <img src="${Url}"/>
        </div>
        `;
        document.body.appendChild(stickyConst);
        let minimize = stickyConst.querySelector(".minimize");
        let remove = stickyConst.querySelector(".remove");
        noteAction(minimize,remove,stickyConst);

        //Copied Code
        stickyConst.onmousedown = function(event) {
            dragAndDrop(stickyConst,event);
        };
        stickyConst.ondragstart = function() {
            return false;
    };

    })
})

sticky.addEventListener("click",(e)=>{
    let stickyConst = document.createElement("div");
    stickyConst.setAttribute("class" , "sticky-container");
    stickyConst.innerHTML = `
    <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-container">
        <textarea spellcheck="false"></textarea>
    </div>
    `;
    document.body.appendChild(stickyConst);
    let minimize = stickyConst.querySelector(".minimize");
    let remove = stickyConst.querySelector(".remove");
    noteAction(minimize,remove,stickyConst);

    //Copied Code
    stickyConst.onmousedown = function(event) {
        dragAndDrop(stickyConst,event);
    };
    stickyConst.ondragstart = function() {
        return false;
};

});
function noteAction(minimize, remove, stickyConst){
    remove.addEventListener("click",(e)=>{
        stickyConst.remove();
    })
    //hidden --visible ,visible then hide
    minimize.addEventListener("click",(e)=>{
        let noteCont = stickyConst.querySelector(".note-container");
        // to read the style property of an element --> getComputedStyle
        //and to check whats is the display value of that element we use getPropertyValue
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none"){
            noteCont.style.display="block";
        }
        else{
            noteCont.style.display="none";
        }
    })

};
//Copied Code 
function dragAndDrop(element,event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    element.onmouseup = function(){
        document.removeEventListener('mousemove',onMouseMove);
        element.onmouseup=null;
    }
};