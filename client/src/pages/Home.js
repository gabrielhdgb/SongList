import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Home() {

  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    async function getTracks() {
      setTrackList([{
        id: '300000',
        url: 'https://cdns-preview-2.dzcdn.net/stream/c-212f966bf06dc704a48891d8750fb1e8-5.mp3',
        title: 'On danse sur ma chanson',
        artist: 'Édith Piaf',
        artwork: 'https://e-cdns-images.dzcdn.net/images/artist/500d8055572496a56f7f10fec34b7984/250x250-000000-80-0-0.jpg'
      },
      {
        id: '259765',
        url: 'https://cdns-preview-2.dzcdn.net/stream/c-2dbfc2952aca4799a758016e69f0954b-5.mp3',
        title: "I'm Gonna See My Baby'",
        artist: 'Johnny Mercer',
        artwork: 'https://e-cdns-images.dzcdn.net/images/artist/d45cd49238e47af3c33ac2eca189645f/250x250-000000-80-0-0.jpg'
      }
      ])
    }
    getTracks();

  }, [])


  async function PlayerSong(item) {
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
      id: item.id,
      url: item.url,
      title: item.title,
      artist: item.artist,
      artwork: item.artwork,
    });

    // Start playing it
    await TrackPlayer.play();
  }


  function RenderList(item, index) {
    return (
      <>
        <View style={styles.boxTrack}>
          <View style={{ width: '30%' }}>
            <Image source={{ uri: item.artwork }} style={styles.imageTrack} resizeMode={'contain'} />
          </View>

          <View style={styles.descriptionTrack}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text>{item.artist}</Text>
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