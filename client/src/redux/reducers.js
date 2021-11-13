import {GET_TRACK, ADD_FAVORITE_ITEM, REMOVE_FAVORITE_ITEM} from './actions';

//Constante para reservar todas as músicas e músicas favoritadas
const initialState = {
  tracks: [],
  favorites: [],
};

//Definindo situação de execução de cada action
function tracksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRACK:
      return {...state, tracks: action.payload};
    case ADD_FAVORITE_ITEM:
      return {...state, favorites: [...state.favorites, action.payload]};
    case REMOVE_FAVORITE_ITEM:
      return {
        ...state,
        favorites: state.favorites.filter(
          tracks => tracks.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default tracksReducer;