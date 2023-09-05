import React, { useState } from 'react';
import { Heart as RNSwitch } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../themes/colors'
const Heart = () => {
  const [like, setLike] = useState(false);
  function CheckLike(){
    if(like){
       setLike(false)
    }else{
        setLike(true)
    }
  } 
  return (
    <Icon
       onPress={() => CheckLike()}
       name={like ? 'heart' : 'hearto'}
       color={colors.tertiary} size={18}/>
  );
};

export default Heart;
