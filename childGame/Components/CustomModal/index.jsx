import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CenteredBox from '../CenteredBox';

const CustomModal = ({ isVisible, onClose, children,height="60%" }) => {
    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <CenteredBox height={height}>{children}</CenteredBox>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({

  });
  
  export default CustomModal;
  