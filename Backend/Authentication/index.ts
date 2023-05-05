import express,{Request,Response} from "express";
import connection from "./config/db";
import Grouter from "./Oauth/googleOauth";
const app=express()
app.get("/",(req:Request,res:Response):void=>{
    res.send("hello")
})
app.use("/",Grouter)
app.listen(4500,async ()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log("can't connect")
        console.log(err)
    }
})