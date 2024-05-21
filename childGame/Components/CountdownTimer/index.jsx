import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ initialTime, onEnd, start, resetTrigger, extraTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    // Resets time to the initial or modified time
    setTime(initialTime + extraTime);
  }, [initialTime, extraTime, resetTrigger]);

  useEffect(() => {
    let interval;
    if (start && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime - 1 <= 0) {
            clearInterval(interval);
            onEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup the interval on component unmount or if start becomes false
  }, [start, time, onEnd]);

  return (
    <View style={styles.container}>
      {String(time).padStart(2, '0').split('').map((digit, index) => (
        <View key={index} style={styles.digit}>
          <Text style={styles.digitText}>{digit}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#1BAA76"
  },
  digitText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CountdownTimer;
