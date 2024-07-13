import express from "express";
import bodyparser from "body-parser"
import axios from "axios";

var bool;
const app=express();
const port=3000;
const API_URL="https://api.lyrics.ovh/v1";
var artistname;
var songname;

app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/",(req,res) =>{
    bool=false;
    res.render("index.ejs",{bool});
   });

app.post("/submit",async (req,res)=>{
    bool=true;
   artistname=req.body.artist;
   songname=req.body.song;

    try {
        const result = await axios.get(API_URL + `/${artistname}/${songname}`);
        res.render("index.ejs", { content: JSON.stringify(result.data.lyrics),bool});
      } catch (error) {
        res.render("index.ejs",{content:"error: lyrics not found",bool});
      }
});

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
   });