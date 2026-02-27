import dotenv from "dotenv";

dotenv.config();
import express from "express"
import { chats } from "./data/data.js";
const app = express();

app.get('/',(req,res)=>{
    res.send("Api is running");
})
app.get('/api/chat',(req,res)=>{
    res.json(chats);
})
app.get('/api/chat/:id',(req,res)=>{
        const id = req.params.id;
        const singleChat = chats.find(c=> c._id===id);
        res.send(singleChat);
        console.log(id);
})
app.listen(process.env.PORT,console.log("Server running"));