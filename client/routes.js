import React from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './src/pages/Home';
import Favorits from './src/pages/Favorits';


const MainTab = createBottomTabNavigator();
const MainTabScreen = ({ navigation, route }) => {

  return (
    <MainTab.Navigator initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == 'Playlist') {
            iconName = focused ? 'musical-notes' : 'musical-notes';
          } else if (route.name == 'Favorits') {
            iconName = focused ? 'heart' : 'heart';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: '#FA5858',
        inactiveTintColor: 'gray',
      }}
    >
      <>
        <MainTab.Screen
          name='Playlist'
          component={Home}
          initialParams={{ rota: navigation }}
          options={{
            headerShown: false
          }}
        />

        <MainTab.Screen
          name='Favorits'
          component={Favorits}
          initialParams={{ rota: navigation }}
          options={{
            headerShown: false
          }}
        />

      </>

    </MainTab.Navigator>
  )
}

const { width } = Dimensions.get('window');
const height = width * 0.7;

const RootStack = createStackNavigator();
const RootStackScreen = () => {

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'App'}>
      <RootStack.Screen
        name='App'
        component={MainTabScreen}
        options={
          {
            header: false
          }
        }
      />
    </RootStack.Navigator>
  )
};

const Routes = () => {

  return (

    <NavigationContainer >
      <RootStackScreen />
    </NavigationContainer>

  );
};

export default Routes;