import React,{useState,useEffect} from 'react';
import {Text,Ads} from 'components';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import UserContext from 'contexts/UserContext';
import {BallIndicator} from 'react-native-indicators';

const Active = () => {
  const navigation = useNavigation();
  const {active,show, setshow} = React.useContext(UserContext)

  // const [show, setShow] = useState(true);

  // setTimeout(() => {
  //   setshow(false);
  // }, 2000);

    return (
      <View style={{flex: 1}}>
        {show ? (
           <BallIndicator color="red" animationDuration={1200} animating={show}/>
        ) : show == false && active == '' ? (
          <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginHorizontal: scale(5),}}>
            <Text font="h2" weight="medium">
              No Active Ads
            </Text>
            <Text style={{textAlign: 'center', margin: scale(10)}}>
              You haven't posted anything yet would you like to sell something
            </Text>
          </View>
        ) : (
          <Ads navigation={navigation} products={active} />
        )}
      </View>
    );
  };


export default Active;
