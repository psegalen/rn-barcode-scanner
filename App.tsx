import React, {useState} from 'react';
import type {FC} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useCameraPermission} from 'react-native-vision-camera';
import Scanner from './Scanner';

const App: FC = () => {
  const [scanning, setScanning] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const {hasPermission, requestPermission} = useCameraPermission();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const tryOpenScanner = async (): Promise<void> => {
    if (hasPermission) {
      setScanning(true);
    } else {
      const result = await requestPermission();
      if (result) {
        setScanning(true);
      } else {
        Alert.alert('Permission is mandatory to start scanning!');
      }
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{marginBottom: 16}}>Hello World!</Text>
        <Button title="Start scanning!" onPress={tryOpenScanner} />
      </View>
      {scanning ? <Scanner onClose={() => setScanning(false)} /> : undefined}
    </SafeAreaView>
  );
};

export default App;
