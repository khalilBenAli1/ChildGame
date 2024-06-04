import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View ,Text} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const VideoPlayer = ({ videoUri }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    console.log("Video URI:", videoUri);
  }, [videoUri]);

  const handlePlaybackStatusUpdate = (status) => {
    setStatus(status);
    console.log("Playback Status:", status);
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
  },
  video: {
    width: "100%",
    height:200,
  },
});

export default VideoPlayer;
