const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*async function teste() {
    j = (Math.random() * (3135556 - 1) + 1).toFixed(0);
    await axios.default.get("https://api.deezer.com/track/" + 3135556)
      .then((result) => {
        song.push({
          id: result.data.id,
          url: result.data.preview,
          title: result.data.title,
          artist: result.data.artist.name,
        })
        i++;
      })
*/


app.get("/api/get", (req, res) => {

  var i = 0, j = 1;
  var song = [];
  async function teste() {
   
    try {
      let response = await axios.default.get("https://api.deezer.com/track/" + 3135556);
      song.push(response);
    } catch (e) {
      console.error(e);
    }
  }

  teste();

})

app.listen(3001, () => {
  console.log("running in port 3001")
})