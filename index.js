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
  const { username, tweet } = req.body;
  const { avatar } = usuarios.find(usuario => usuario.username === username);
  const novoTweet = {
		username: username,
		avatar: avatar,
	  tweet: tweet
	}
  tweets.push(novoTweet);
  res.send("ok");
});

//Rota que fornece os tweets
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
  console.log('🛰️  Servidor iniciado na porta 5000.')
});