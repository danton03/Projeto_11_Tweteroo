import express from "express";

const app = express();
const tweets = [];

app.get("/tweets", (_,res) => {
  if (tweets.length < 10) {
    res.send(tweets);
  }
  else{
    const ultimosTweets = tweets.slice(-10); 
    res.send(ultimosTweets);
  }
});

app.listen(5000, () => {
  console.log('🛰️  Servidor iniciado!\nAcesse: http://localhost:5000')
});