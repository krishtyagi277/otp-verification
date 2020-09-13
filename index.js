const path = require("path");
const express=require("express");

const app = express();


app.use(express.urlencoded())
app.use(express.static("public"));


app.get('/',(request,response)=>{
        response.sendFile(path.resolve(__dirname,"pages/index.html"));
})

app.get('/success',(request,response)=>{
          response.sendFile(path.resolve(__dirname,"pages/success.html"));
})


 app.post("/generateotp",(request,response)=>{
     let otp="1234";
     const data=request.body.phoneNumber;
     
     let otpObj={
         phNumber:data,
         otp
     }
     
     response.json(otpObj);
 })



app.listen(4000,()=>{
    console.log("server has started at port number 4000");
})