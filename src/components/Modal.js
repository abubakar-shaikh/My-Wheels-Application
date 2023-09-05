import React from 'react';
import {
  View, StyleSheet, TouchableWithoutFeedback, Modal as RNModal,
} from 'react-native';
import PropTypes from 'prop-types';
import { getScreenWidth } from 'utils/size';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  innerContainer: {
    width: getScreenWidth() - scale(40),
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    padding: scale(14),
  },
});

const Modal = ({ children, isVisible, onModalClose }) => (
  <RNModal
    transparent
    animationType="fade"
    visible={isVisible}
    onRequestClose={onModalClose}
  >
    <TouchableWithoutFeedback onPress={onModalClose}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  </RNModal>
);

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
