import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
const QRCodeModal = ({ isVisible, scannedData, onClose }) => {
  return (
    <Modal isVisible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>{scannedData}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name='times-circle' size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalText: {
    flex: 1,
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
  },
});

export default QRCodeModal;
