const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

//instanciando dependencias
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Requisitando informações api deezer (principais musicas)
app.get("/api/get", (req, res) => {
  axios.default.get("http://api.deezer.com/chart/0/tracks").then((response) => {
    const arraySongs = [];
    for (var i = 0; i < 10; i++) {
      arraySongs.push({
        id: response.data.data[i].id,
        title: response.data.data[i].title,
        rank: response.data.data[i].rank,
        track: response.data.data[i].preview,
        artist: response.data.data[i].artist.name,
        picture: response.data.data[i].artist.picture_medium
      })
    }
    res.send(arraySongs);
  })
})

//servidor na porta 3001 -> localhost:3001
app.listen(3001, () => {
  console.log("running in port 3001")
})