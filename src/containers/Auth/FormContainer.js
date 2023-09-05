import React from 'react';
import { KeyboardAvoidingView, Text, Button } from 'components';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: scale(15),
    paddingHorizontal: scale(20),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  welcome: {
    paddingHorizontal: scale(13),
    marginBottom: scale(15),
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center'
  },
  // buttonContainer: {
  //   paddingVertical: scale(14),
  // },
});

const FormContainer = ({
  title, subtitle, children, 
  // buttonLabel, onSubmit,
}) => (
  <KeyboardAvoidingView contentContainerStyle={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.welcome}>
        <Text style={{fontSize:25,paddingVertical:scale(7)}} weight="medium">{title}</Text>
        <Text style={{textAlign:'center'}} color="gray50">
          {subtitle}
        </Text>
      </View>
      <View style={styles.container}>
        {children}
      </View>
      {/* <SafeAreaView>
        <View style={styles.buttonContainer}>
          <Button
            label={buttonLabel}
            onPress={onSubmit}
          />
        </View>
      </SafeAreaView> */}
    </View>
  </KeyboardAvoidingView>
);

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  // buttonLabel: PropTypes.string.isRequired,
  // onSubmit: PropTypes.func.isRequired,
};

export default FormContainer;
