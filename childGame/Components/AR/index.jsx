import React, { useState } from 'react';
import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
} from '@viro-community/react-viro';

const AR = ({ scale }) => {
  const handleLoadStart = () => {
    console.log("OBJ loading has started");   
  }  
  const handleLoadEnd = () => {
    console.log("OBJ loading has finished");
  }
  const handleError=(event)=> {
    console.log("OBJ loading failed with error: " + event.nativeEvent.error);  
  }
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
     
        <Viro3DObject
          source={require('../../assets/3d/iron/source/Roundhouse April 24 100k.obj')}
          resources={[require('../../assets/3d/iron/source/Roundhouse April 24 100k.mtl'),
                      require('../../assets/3d/iron/source/Roundhouse April 24 100k_normal.jpg'),
                      require('../../assets/3d/iron/source/Roundhouse April 24 100k_occlusion.jpg'),
                      require('../../assets/3d/iron/source/Roundhouse April 24 100k.jpg'),]}
          type="OBJ"
          position={[0, -1, -2]}
          scale={scale}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
   
    </ViroARScene>
  );
};

export default AR;
