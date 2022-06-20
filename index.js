import express from "express";
import cors from "cors";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());

const usuarios = [];
const tweets = [];

//Rota que cria o usuário
app.post("/sign-up", (req,res) => {
  const usuario = req.body;
  usuarios.push(usuario);
  res.send("ok");
});

//Rota que cria um tweets
app.post("/tweets", (req,res) => {
  tweets.push(req.body);
  res.send("ok");
});

//Rota que fornece os tweets
app.get("/tweets", (_,res) => {
  let ultimosTweets = []
  let tweetsRecentes = [];
  if (tweets.length < 10) {
    ultimosTweets = tweets;
  }
  else{
    ultimosTweets = tweets.slice(-10); 
  }

  if (ultimosTweets.length > 0) {
    for (let i = 0; i < ultimosTweets.length; i++) {
      const item = ultimosTweets[i];
      const { username, tweet } = item;
      const { avatar } = usuarios.find(usuario => usuario.username === username);
      tweetsRecentes.push(
        {
          username: username,
          avatar: avatar,
          tweet: tweet
        }
      );
    }
  }
  else{
    tweetsRecentes = ultimosTweets
  }
  res.send(tweetsRecentes);
});
  
app.listen(5000, () => {
  console.log('🛰️  Servidor iniciado na porta 5000.')
});