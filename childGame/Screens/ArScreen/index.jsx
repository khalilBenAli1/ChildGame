import React,{ useState ,useRef   } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
} from '@viro-community/react-viro';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';

const ARScene = () => {
  const [scale, setScale] = useState(1);
  const navigation=useNavigation()

  const arSceneRef = useRef();

  const _onPinch = (pinchState, scaleFactor, source) => {
    if (pinchState === 2) { 
      const newScale = scale * scaleFactor;
      setScale(newScale);
    } else if (pinchState === 3) { // Pinch End

      console.log("Pinch ended. Final scale:", scale);
    }
  };

  const takePhoto = async () => {
    try {
      const uri = await captureRef(arSceneRef, {
        format: 'jpg',
        quality: 0.8
      });
      console.log("Image saved to", uri);
    } catch (error) {
      console.error("Error capturing AR scene:", error);
    }
  };

  const goBack = () => {
    navigation.replace("FreeView")
  };
  
  return (
    <View style={{ flex: 1 }}>
    <ViroARSceneNavigator
     ref={arSceneRef}
      initialScene={{
        scene: () => (
          <ViroARScene >
            <Viro3DObject
              source={require('../../assets/3d/test.obj')}
              position={[-3, -3, -2]}
              scale={[scale, scale, scale]}
              onTrackingUpdated={(state, reason) => console.log("Tracking state: ", state, " Reason: ", reason)}
              onLoadStart={() => console.log("Loading OBJ start")}
              onLoadEnd={() => console.log("Loading OBJ end")}
              onError={(error) => console.log("Error loading OBJ:", error)}
              type="OBJ"
              onPinch={_onPinch}
            />
          </ViroARScene>
        ),
      }}
      style={styles.arView}
    />
     <View style={styles.controls}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goBack} style={styles.button}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <MaterialIcons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arView: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25,
  }
});


export default ARScene;
