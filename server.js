const express = require('express');
const app = express();
const port=process.env.PORT ||3001;
const path=require("path")
const fs=require("fs")
const util=require("util")
const readFileAsync=util.promisify(fs.readFile)
const writeFileAsync=util.promisify(fs.writeFile)
const getnotes=()=>readFileAsync("./db/db.json","utf8").then(data=>[].concat(JSON.parse(data)))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})
app.get("/api/notes",(req,res)=>{
    getnotes().then(notes=>{
        res.json(notes)
    }).catch(err=>res.json(err))
})
app.post("/api/notes",(req,res)=>{
    getnotes().then(notes=>{
        const newNote={
            title:req.body.title,
            text:req.body.text,
            id:Math.floor(Math.random()*1000)
        }
        const notearray=[...notes,newNote]
        writeFileAsync("./db/db.json",JSON.stringify(notearray)).then(()=>{
            res.json({msg:"okay"})
        })
    }).catch(err=>res.json(err))
})
app.listen(port, function() {

console.log('http://localhost:3001/')

});