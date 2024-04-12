import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

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
      <Image source={require("../../assets/imgs/buttonImage.png")} style={styles.image} />
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
  },
  button: {
    padding: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  numberContainer: {
    padding: 9,
    marginHorizontal: 5,
    position:"relative",
    borderRadius:10,
    paddingHorizontal:20,
    backgroundColor: '#DEAE48',
 
  },
  number: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    position: 'absolute',
    top: 4,
    right: 5,
    width:13,
    height:13,
  },
});

export default NumberOfPlayers;
