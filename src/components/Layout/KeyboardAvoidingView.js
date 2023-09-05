import React from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const KeyboardAvoidingView = ({ children, style, ...props }) => (
  <RNKeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={[styles.container, style]}
  >
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <ScrollView
        style={styles.container}
        {...props}
      >
        {children}
      </ScrollView>
    </TouchableWithoutFeedback>
  </RNKeyboardAvoidingView>
);

KeyboardAvoidingView.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
};

KeyboardAvoidingView.defaultProps = {
  style: null,
};

export default KeyboardAvoidingView;
