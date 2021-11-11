import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Axios from 'axios'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import getTracks from '../Components/getTracks';

export default function Home() {

  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    //função síncrona para chamar método de pegar as músicas e organizar data track. 
    async function setTracks() {
      setTrackList(await getTracks());
    }
    setTracks();
  }, [])


  async function PlayerSong(item) {
    await TrackPlayer.setupPlayer();

    // Adiciona música a fila
    await TrackPlayer.add({
      id: item.id,
      url: item.url,
      title: item.title,
      artist: item.artist,
      artwork: item.artwork,
    });

    // Da um start no reprodutor de musica
    await TrackPlayer.play();
  }


  function RenderList(item, index) {
    return (
      <>
        <View style={styles.boxTrack}>
          <View style={{ width: '30%' }}>
            <Image source={{ uri: item.picture }} style={styles.imageTrack} resizeMode={'contain'} />
          </View>

          <View style={styles.descriptionTrack}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text>{item.artist}</Text>
            <Text>Rank {item.rank}</Text>
            <TouchableOpacity style={styles.buttonTrack} onPress={() => { PlayerSong(item) }}>
              <FontAwesome5
                name={"play"}
                color={"#fff"}
                size={12}
              />
              <Text style={styles.textPlay}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFavorit} onPress={() => { console.log('oi') }}>
              <FontAwesome
                name={"heart-o"}
                color={"#ff0000"}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={trackList}
          renderItem={({ item }) => RenderList(item)}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
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
  buttonTrack: {
    width: '35%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FA5858',
    paddingLeft: '15%',
    paddingVertical: '5%',
    borderRadius: 30,
  },
  textPlay: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: '10%'
  },
  buttonFavorit: {
    width: '15%',
    position: 'absolute',
    bottom: 0,
    right: 15,
    alignItems: 'center',
    paddingLeft: '15%',
    paddingVertical: '5%',
  },
})