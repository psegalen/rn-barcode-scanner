import React, {FC, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

interface ScannerProps {
  onClose: () => void;
}

const Scanner: FC<ScannerProps> = ({onClose}) => {
  const [detected, setDetected] = useState<string[]>([]);
  const device = useCameraDevice('back');

  const registerCodes = (codes: Code[]): void => {
    const theseCodes = codes.map(c => `${c.type} - ${c.value}`);
    const newDetected = [...detected];
    let changes = 0;
    theseCodes.forEach(c => {
      if (!detected.includes(c)) {
        newDetected.push(c);
        changes += 1;
      }
    });
    if (changes > 0) {
      setDetected(newDetected);
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: registerCodes,
  });

  return (
    <View
      style={{
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {device ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      ) : (
        <Text>Could not open camera</Text>
      )}
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          width: '100%',
          padding: 16,
        }}>
        {detected.map(d => (
          <Text
            key={d}
            style={{
              color: '#fff',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 8,
              marginTop: 8,
            }}>
            {d}
          </Text>
        ))}
      </View>
      <View
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}>
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  );
};

export default Scanner;
