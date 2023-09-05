import React, { useRef }  from 'react';
import { View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RBSheet from "react-native-raw-bottom-sheet";
// import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './home';
import ChatStack from './chat';
import AdsStack from './ads';
import MoreStack from './more';
import colors from 'themes/colors' 
import {scale} from 'react-native-size-matters';

const homeName = "Home";
const ChatName = "Chat";
const MoreName = "More";

const Tab = createBottomTabNavigator();
const CreateNewPlaceholder = () => <View style={{flex:1,backgroundColor:'red'}} />
export default function App({navigation}) {
  const refRBSheet = useRef();
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
      tabBarActiveTintColor:colors.primaryAlt,
      tabBarInactiveTintColor: colors.buyer,
      tabBarStyle: {
        height: 58,
        paddingBottom:7
      },
      headerShown: false,
        tabBarIcon: ({ focused, color }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = focused ? 'home' : 'home-outline';
        }
        else if (rn === ChatName) {
          iconName = focused ? 'wechat' : 'wechat';
        }else if (rn === MoreName){
          iconName = focused ? 'reorder-horizontal' : 'reorder-horizontal'
        }
          return <Icon name={iconName} size={30} color={color}/>;
      },
    })}>
    <Tab.Screen name={homeName} component={HomeStack} />
    <Tab.Screen name="My Ads" component={AdsStack}
      options={{ tabBarIcon:({focused ,color}) => (
        <View >
          <Icon name="google-ads" size={25} color={color} 
          />        
        </View>
      )}} />
    <Tab.Screen name="Sell" component={CreateNewPlaceholder}
      options={{ 
        tabBarIcon:({focused ,color}) => (
        <View style={styles.Logintab}>
          <TouchableOpacity  onPress={() => navigation.navigate('SellOption')}>
         <Image
          source={require('images/Myimages/plus-icon.png')}
          //  onPress={() => refRBSheet.current.open()}
          resizeMode='cover'
            style={styles.icon}
          />
          </TouchableOpacity>
          {/* <RBSheet
            height={220}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            openDuration={500}
            customStyles={{
            container:{
                  borderTopLeftRadius:20,
                  borderTopRightRadius:20,
            },
            draggableIcon: {
              backgroundColor: "red"
            }
          }}
        >
          <View>
            <Text style={[styles.txt,{fontSize:scale(20),paddingTop:scale(10)}]}>Sell Your Car</Text>
           <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
             <View>
              <Icon name="car" size={60} color='#000' style={styles.icon2} onPress={() => {navigation.navigate('SellOption'); refRBSheet.current?.close();}}/>
              <Text style={styles.txt}>Car</Text> 
             </View>
            <View>
               <Fontisto name="motorcycle" size={40} color='#000' style={[styles.icon2,{paddingHorizontal:scale(15)}]} onPress={() => {navigation.navigate('BikeForm'); refRBSheet.current?.close();}}/>
               <Text style={styles.txt}>bike</Text> 
            </View>
           </View>
          </View>
        </RBSheet>         */}
        </View>
      )}}
       listeners={({}) => ({
             tabPress: event =>{
             event.preventDefault();
             }
          })}
        />
    <Tab.Screen name={ChatName} component={ChatStack} />
    <Tab.Screen name={MoreName} component={MoreStack} />
   </Tab.Navigator>
  );
 }

const styles = StyleSheet.create({
    // Logintab:{},
    icon:{top:-20,width:scale(65),height:scale(65),borderRadius:100,tintColor:colors.primaryAlt,backgroundColor:'#fff'},
    txt:{fontSize:17,fontWeight:'700',color:'#000',textAlign:'center',},
    icon2:{backgroundColor:colors.gray10,padding:scale(10),borderRadius:scale(100),marginTop:scale(20)}
  })