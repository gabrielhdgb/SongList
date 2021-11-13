import axios from 'axios';

// Definindo as actions types: 
// buscar músicas da api, adicionar aos favoritos e remover dos favoritos
export const GET_TRACK = 'FETCH_TRACK';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';

//Buscar músicas da api
export const getTracks = () => {
  try {
    return async dispatch => {
      await axios.get('http://api.deezer.com/chart/0/tracks').then(tracks => {
        if (tracks.data) {
          dispatch({
            type: GET_TRACK,
            payload: tracks.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      });
    };
  } catch (error) {
    console.log("Erro: ", error)
  }
};

//Adicionar músicas aos favoritos
export const addFavorite = track => dispatch => {
  dispatch({
    type: ADD_FAVORITE_ITEM,
    payload: track,
  });
};

//Remover músicas aos favoritos
export const removeFavorite = track => dispatch => {
  dispatch({
    type: REMOVE_FAVORITE_ITEM,
    payload: track,
  });
};