
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useDisableBackButton = () => {
  useEffect(() => {
    // Function to handle the back press
    const onBackPress = () => true;

    // Add event listener for the hardware back press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    // Remove event listener on cleanup
    return () => backHandler.remove();
  }, []);
};

export default useDisableBackButton;
