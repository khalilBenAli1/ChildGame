import React from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
} from '@viro-community/react-viro';

const ARScene = () => {
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: () => (
          <ViroARScene>
            <Viro3DObject
              source={require('../../assets/3d/cottage_obj.obj')}
              resources={[
                require('../../assets/3d/cottage_obj.mtl')
              ]}
              position={[0, 0, -5]}
              scale={[10, 10,10]}
              type="OBJ"
            />
          </ViroARScene>
        ),
      }}
    />
  );
};

export default ARScene;
