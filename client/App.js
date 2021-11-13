import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {



  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#FA5858'} />
        <Routes />
      </Provider>

    </>
  );
}
