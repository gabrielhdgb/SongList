import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { removeFavorite } from '../redux/actions';
import TrackPlayer from 'react-native-track-player';

export default function Favorits() {
  const [pause, setPause] = useState(false);

  const { favorites } = useSelector(state => state.tracksReducer);
  const dispatch = useDispatch();
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

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
      setPause(false);
    }

  }


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
                onPress={() => handleRemoveFavorite(item)}
              >
                <FontAwesome
                  name={"heart"}
                  color={"#ff0000"}
                  size={25}
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

        {
          favorites.length == 0 ?
            <Text style={styles.noFavorites}>Você ainda não possui uma música favoritada :(</Text>
            :
            <FlatList
              data={favorites}
              renderItem={({ item }) => RenderList(item)}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
        }


      </View>
    </>
  )

}

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
  noFavorites: {
    fontSize: 26,
    color: '#FA5858',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '50%'
  }
})