import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getTracks, addFavorite, removeFavorite } from '../redux/actions';
import TrackPlayer from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Home() {
  const [pause, setPause] = useState(false);

  //constantes e instanciação das actions redux
  const { tracks, favorites } = useSelector(state => state.tracksReducer);
  const dispatch = useDispatch();
  const fetchTracks = () => dispatch(getTracks());
  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));

  useEffect(() => {
    //Buscando todas as músicas
    fetchTracks();
  }, []);

  //Função para adicionar os favoritos passando o item selecionado como parâmetro
  const handleAddFavorite = track => {
    addToFavorites(track);
  };

  //Função para remover os favoritos passando o item selecionado como parâmetro
  const handleRemoveFavorite = track => {
    removeFromFavorites(track);
  };

  //Verificando a existencia da música como favoritada
  const exists = track => {
    if (favorites.filter(item => item.id === track.id).length > 0) {
      return true;
    }
    return false;
  };

  //Função para executar o player de música 
  async function PlayerSong(item, playOrPause) {
    if (playOrPause == 'play') {
      await TrackPlayer.setupPlayer();
      // Adiciona música a fila
      await TrackPlayer.add({
        id: item.id,
        url: item.preview,
        title: item.title,
        artist: item.artist.name,
        artwork: item.artist.picture_medium,
      });
      // Da um start no reprodutor de musica
      await TrackPlayer.play();
      setPause(true);
    } else {
      await TrackPlayer.pause();
    }

  }

  //RenderItem para o flatList
  function RenderList(item, index) {
    return (
      <>
        <View style={styles.boxTrack}>
          <View style={{ width: '30%' }}>
            <Image source={{ uri: item.artist.picture_medium }} style={styles.imageTrack} resizeMode={'contain'} />
          </View>
          <View style={styles.descriptionTrack}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text>{item.artist.name}</Text>
            <Text>Rank {item.rank}</Text>

            <View style={styles.boxButtons}>
              <TouchableOpacity
                style={styles.buttonTrack}
                onPress={() => { PlayerSong(item, 'play') }}
              >
                <FontAwesome5
                  name={'play-circle'}
                  color={"#444"}
                  size={28}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTrack}
                onPress={() => { PlayerSong(item) }}
              >
                <FontAwesome5
                  name={'pause-circle'}
                  color={"#444"}
                  size={28}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFavorit}
                onPress={() => {
                  setPause(!pause), exists(item)
                    ? handleRemoveFavorite(item)
                    : handleAddFavorite(item)
                }
                }>
                <FontAwesome
                  name={exists(item) ? 'heart' : 'heart-o'}
                  color={"#ff0000"}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={tracks.data}
          renderItem={({ item, index }) => RenderList(item, index)}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  )
}

//constante para definir o StyleSheet Component
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ddd',
  },
  boxTrack: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '95%',
    padding: '2%',
    marginVertical: '1%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  imageTrack: {
    width: 100,
    height: 100,
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  descriptionTrack: {
    width: '65%',
    marginLeft: '3%',
  },
  boxButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  buttonTrack: {
    width: '15%',
    paddingVertical: '5%',
    borderRadius: 30,
  },
  buttonFavorit: {
    width: '15%',
    marginLeft: '50%',
    paddingVertical: '5%',
    borderRadius: 30,
  },

})