import { Audio } from "expo-av";

const soundMap = {
  victory: require('../assets/sounds/victory.mp3'),
  defait: require('../assets/sounds/defeat.mp3'),
  // Add other sounds as needed
};

export const playSound = async (soundName) => {
  try {
    const sound = soundMap[soundName];
    if (!sound) {
      throw new Error(`Sound "${soundName}" is not defined in the sound map.`);
    }

    const { sound: audioInstance } = await Audio.Sound.createAsync(sound);
    await audioInstance.playAsync();

    audioInstance.setOnPlaybackStatusUpdate(async playbackStatus => {
      if (playbackStatus.didJustFinish) {
        await audioInstance.unloadAsync();
      }
    });
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};