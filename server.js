const express = require('express');
const app = express();
const port=process.env.PORT ||3001;
const path=require("path")
const fs=require("fs")
const util=require("util")
const readFileAsync=util.promisify(fs.readFile)
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
    })
})
app.listen(port, function() {

console.log('http://localhost:3001/')

});