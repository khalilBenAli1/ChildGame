import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Video } from "expo-av";

const VideoPlayer = ({ videoUri }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});



  const handlePlaybackStatusUpdate = (status) => {
    setStatus(status);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={typeof videoUri === "string" ? { uri: videoUri } : videoUri}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={(error) => {
          console.log("Video Error:", error);
        }}
        shouldPlay
      />
      {!status.isLoaded && <Text>Loading video...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"black",
    borderRadius:10
  },
  video: {
    width: 300,
    height: 500,
  },
});

export default VideoPlayer;
