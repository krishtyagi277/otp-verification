const path = require("path");
const express=require("express");
const app = express();

app.use(express.static("public"));


app.get('/',(request,response)=>{
        response.sendFile(path.resolve(__dirname,"pages/index.html"));
})

app.get('/success',(request,response)=>{
          response.sendfile(path.resolve(__dirname,"pages/success.html"));
})




app.listen(4000,()=>{
    console.log("server has started at port number 4000");
})