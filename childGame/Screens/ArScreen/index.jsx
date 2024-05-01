import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { ViroARSceneNavigator, ViroConstants } from '@viro-community/react-viro';
import AR from '../../Components/AR';

const ArScreen = () => {
  const [scale, setScale] = useState([0.1, 0.1, 0.1]);


  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <AR scale={scale} />,
        }}
        style={styles.arView}
      />
      <Slider
        value={scale[0]}
        onValueChange={(value) => setScale([value, value, value])}
        minimumValue={0.01}
        maximumValue={0.5}
        step={0.01}
        style={styles.slider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  arView: {
    flex: 4
  },
  slider: {
    flex: 1
  }
});

export default ArScreen;
