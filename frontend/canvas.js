let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;//pixel value will get alloted to width
canvas.height = window.innerHeight;

let pencil_color = document.querySelectorAll(".pencil");
let pencilElem = document.querySelector(".pencil-width-container");
let eraserElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let pencolor = "red";
let pencilwidth = pencilElem.value;
let erasercolor = "white";
let eraserwidth = eraserElem.value;
//API
let tool = canvas.getContext("2d");
let mousedown = false;
tool.strokeStyle = pencolor;
tool.lineWidth = pencilwidth;

let undoRedotracker = []; //data
let track = 0; //represent which action to perfom from tracker array 
//mouse down --> start new path ,mouse move --> pathfill 
canvas.addEventListener("mousedown",(e)=>{
    mousedown = true;
    //beginpaths({
    //        x : e.clientX,
    //        y : e.clientY
    //    });
    let data = {
        x : e.clientX,
        y : e.clientY
    }
    socket.emit("beginpaths",data); //data server ko chale jaayega
});
canvas.addEventListener("mousemove",(e)=>{
    if(mousedown){
        let data = {
            x : e.clientX,
            y : e.clientY
        }
        socket.emit("drawline",data);
        //drawline({
        //    x : e.clientX,
        //    y : e.clientY
        //});
    }
    else{
    }
})
canvas.addEventListener("mouseup",(e)=>{
    mousedown = false;
    //jaise hi mouseup karunga kuch graphic meri perfomr hogayi hogi
    let url = canvas.toDataURL();
    undoRedotracker.push(url);
    track = undoRedotracker.length-1;

});
// track =track -1 
undo.addEventListener("click",(e)=>{
    if (track>0) track--;
    let data = {
        trackValue : track,
        undoRedotracker
    }
    socket.emit("undoredo",data);
    //undoRedocanvas(trackObj);
})
//track =track + 1
redo.addEventListener("click",(e)=>{
    if(track < undoRedotracker.length-1) track++;
    //action
    let data = {
        trackValue : track,
        undoRedotracker
    }
    socket.emit("undoredo",data);
    //undoRedocanvas(trackObj);
})
function undoRedocanvas(trackObj){
    track = trackObj.trackValue;
    undoRedotracker = trackObj.undoRedotracker;
    let url = undoRedotracker[track];
    let img = new Image();//new image reference element
    img.src = url;
    img.onload = (e) =>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);//start x=0,y=0 ,end canvas width and height
    }
}
function beginpaths(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
};
function drawline(strokeObj){
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
};
pencil_color.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        let col = colorElem.classList[0];
        pencolor=col;
        tool.strokeStyle=pencolor;
    })
})
pencilElem.addEventListener("change",(e)=>{
    pencilwidth = pencilElem.value;
    tool.lineWidth = pencilwidth;
})
eraserElem.addEventListener("change",(e)=>{
    eraserwidth = eraserElem.value;
    tool.lineWidth = eraserwidth;
})
eraser.addEventListener("click",(e)=>{
    if(eraserflag){
        tool.strokeStyle = erasercolor;
        tool.lineWidth = eraserwidth;
    }
    else{
        tool.strokeStyle = pencolor;
        tool.lineWidth = pencilwidth;
    }
})
download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL()// canvas ke upar jo bhi graphics hai uske sath yeh ek url create kardega
    let a = document.createElement("a");//anchor element
    a.href = url;
    a.download = "board.jpg"
    a.click();
});

//to check server ne data bheja saare connect computer ko ya nhi
socket.on("beginpaths",(data)=>{
    //data from server
    beginpaths(data);
});
socket.on("drawline",(data)=>{
    //data from server
    drawline(data);
});
socket.on("undoredo",(data)=>{
    //data from server
    undoRedocanvas(data);
});


































































//tool.beginPath();
//tool.moveTo(10,10); //start point 
//tool.lineTo(100,100); //end point
//tool.stroke(); //fill color
//tool.strokeStyle = "green";
//tool.lineWidth = "4";
///tool.beginPath();
//tool.moveTo(20,20);
//tool.lineTo(200,300);
//tool.stroke();

