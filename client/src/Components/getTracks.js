import Axios from 'axios';

export default async function getTracks() {
  const arrTracks = []

  // Método para fazer a requisição da API deezer e organizar data track.
  try {
    arrTracks = await Axios.get("http://api.deezer.com/chart/0/tracks").then((response) => {
      for (var i = 0; i < 10; i++) {
        arrTracks.push({
          id: response.data.data[i].id,
          title: response.data.data[i].title,
          rank: response.data.data[i].rank,
          url: response.data.data[i].preview,
          artist: response.data.data[i].artist.name,
          picture: response.data.data[i].artist.picture_medium
        })
      }
    })
  } catch (err) {
    console.log("Erro: ", err)
  }

  return arrTracks;
}