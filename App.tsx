import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Main from './src/screens/Main';
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Main />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
      maxHeight: Dimensions.get("window").height
  },
});

export default App;
