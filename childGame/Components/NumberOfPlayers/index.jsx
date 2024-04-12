import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NumberOfPlayers = ({ initialCount = 0, onCountChange }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(newCount);
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{count}</Text>
      </View>
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  button: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  numberContainer: {
    padding: 10,
    marginHorizontal: 10,
  },
  number: {
    fontSize: 18,
    color: 'black',
  }
});

export default NumberOfPlayers;
