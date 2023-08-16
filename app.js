//to access express 
const express = require("express");
const socket = require("socket.io");

const app = express();//initialize and server ready //express variable ke andar express() fucntion tha toh usko mene app ko assign kardiya
app.use(express.static("frontend"));
let port = 3000;
//node app.js server start ,listen matlab ab woh server jo bhi frontend se request aayegi usko accept karega
let server = app.listen(port,()=>{
    console.log("listening to port" + port);
})

//kitna request aaya frontend se to connect to the server 
let io = socket(server);

io.on("connection",(socket)=>{
    console.log("Made socket connection");
    //ab jo data hum canvas se bhej rahe hai server ko woh receive hua ya nhi yeh check karne ka method
    socket.on("beginpaths",(data)=>{
        //now transfer the received data to all connected computer
        io.sockets.emit("beginpaths" , data);
    });
    socket.on("drawline",(data)=>{
        io.sockets.emit("drawline",data);
    });
    socket.on("undoredo",(data)=>{
        io.sockets.emit("undoredo",data);
    });
    
});
