import {useWindowDimensions, View } from 'react-native';
import React, {useState, useEffect,useMemo} from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Active from './TabScren/Active';
import Pending from './TabScren/Pending';
import Remove from './TabScren/Remove';
import {NavBar,IconButton} from 'components';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';
import { useIsFocused } from '@react-navigation/native';
import UserContext from 'contexts/UserContext';

const renderScene = SceneMap({
    Active: Active,
    Pending: Pending,
    Remove: Remove,
  });


const Ads = ({navigation}) => {
  const isFocused = useIsFocused();
  const {userid,active,setactive,pending, setpending,remove ,setremove,setshow} = React.useContext(UserContext)
  const [refresh, setRefresh] = useState(0)

  useMemo(() => {
    axios
     .post(`${baseUrl}user_posts_ads_api/${userid}`)
     .then((res) => { 
      if(res.data.status == 200){
        setactive(res.data.Active)
        setpending(res.data.Pending)
        setremove(res.data.Remove)
        setshow(false)
       }
      })
      .catch((error) => {
        console.log('Catch Error',error)
        setshow(false)
      });
  },[isFocused,refresh])

  const layout = useWindowDimensions();
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled={true}
      indicatorStyle={{ backgroundColor: 'red' }}
      style={{ backgroundColor: '#F0F0F0' }}
      tabStyle={{ width: scale(115) }}
      activeColor='red'
      inactiveColor='gray'
    />
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Active', title: 'Active' },
    { key: 'Pending', title:'Pending' },
    { key: 'Remove', title: 'Remove' },
  ]);

  return (
    <View style={{flex:1,}}>
      <NavBar
        title="My Ads"
        onLeftIconPress={() => navigation.goBack()}
        renderRightComponent={() => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              color="white"
              icon="refresh"
              iconType='MaterialCommunityIcons'
              size={32}
              style={{ paddingLeft: scale(14) }}
              onPress={() => {setRefresh(refresh + 1),setshow(true)}}
            />
          </View>
        )}
      /> 
      <TabView
          swipeEnabled={false}
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{backgroundColor:'#fff',color:'#000'}}
          initialLayout={{ width: layout.width }}
          />
    </View>
  )
}

export default Ads
