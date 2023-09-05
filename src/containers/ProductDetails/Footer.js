import React from 'react';
import {
  SafeAreaView, View, StyleSheet,TouchableOpacity
} from 'react-native';
import { scale } from 'react-native-size-matters';
import {Text} from 'components';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getScreenHeight,getScreenWidth } from 'utils/size';
import {Linking} from 'react-native'


const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(4),
    borderTopWidth: 1,
    borderColor: Colors.gray10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent:'space-evenly'
  },
  custom:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:scale(5),
  },
  box1: {
    height: getScreenHeight() / 12,
    width: getScreenWidth() / 3.9,
    borderWidth:1,
    borderColor:Colors.primary,
  },
  box2: {
    height: getScreenHeight() / 12,
    width: getScreenWidth() / 7,
    borderWidth:1,
    borderColor:Colors.primary,
  },
  txt:{fontWeight:'bold',paddingLeft:scale(3),fontSize:scale(16)}
});

const Footer = ({ navigation, shop }) => (
  <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${shop.phone_no}`)}}
       style={[styles.box1,styles.custom,{backgroundColor:Colors.primary}]}>
        <Icon name='phone' color={Colors.gray10} size={20}/>
        <Text color='gray10' font='h2' style={styles.txt}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{Linking.openURL(`sms:${shop.phone_no}`)}}
       style={[styles.box1,styles.custom,]}>
        <Icon name='message-processing-outline' color={Colors.primary} size={20} />
        <Text color='primary' style={styles.txt}>SMS</Text>
      </TouchableOpacity>
      {shop.whatapp_no &&
      <TouchableOpacity onPress={()=>{Linking.openURL(`whatsapp://send?phone=92${shop.whatapp_no}`)}}
      style={[styles.box2,styles.custom,]}>
        <Icon name='whatsapp' color='green' size={32}/>
      </TouchableOpacity>
      }
      <TouchableOpacity style={[styles.box1,styles.custom]} 
      onPress={() => navigation.navigate('Chat')}
      >
        <Icon name='chat-processing-outline' color={Colors.primary} size={20}/>
        <Text color='primary' font='h2' style={styles.txt}>Chat</Text>
      </TouchableOpacity>
  </SafeAreaView>
);

Footer.propTypes = {
  navigation: PropTypes.object.isRequired,
  // shop: PropTypes.object.isRequired,
};

export default Footer;
