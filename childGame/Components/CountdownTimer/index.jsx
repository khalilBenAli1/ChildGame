import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ initialTime, onEnd, resetTrigger }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime, resetTrigger]);

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime - 1 <= 0) {
            clearInterval(interval);
            onEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, onEnd]);

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
