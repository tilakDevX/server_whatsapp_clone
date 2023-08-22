const express = require("express")

const app  = express();


app.get("/", (req, res)=>{
    res.send("Homepage")
})

app.listen(8000, ()=>{
    console.log("Server started at 8000 port");
})