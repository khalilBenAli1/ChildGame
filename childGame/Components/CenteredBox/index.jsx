import React from 'react';
import { View, StyleSheet } from 'react-native';

const CenteredBox = ({ children }) => (
  <View style={styles.outerBorder}> 
    <View style={styles.middleBorder}> 
      <View style={styles.innerContent}>
        {children}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  outerBorder: {
    width: '90%',
    height:"80%",
    borderRadius: 40, 
    backgroundColor: '#774936',
    padding: 2,
    alignSelf: 'center',
    justifyContent:"flex-start",

  },
  middleBorder: {
    height:"98%",
    justifyContent:"center",
    backgroundColor: '#CD9777', 
    borderRadius: 40,
  },
  innerContent: {
    height:"96%",
    backgroundColor: '#FFFFFF', 
    borderRadius: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default CenteredBox;
