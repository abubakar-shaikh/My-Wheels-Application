import React,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from 'navigators/tabs';
import BikeForm from 'containers/SellNow/BikeSell/BikeForm';
import SellOption from 'containers/SellNow/CarSell/SellOption';
import PostAddForm from 'containers/SellNow/CarSell/PostAddForm';
import TryMywheelsForm from 'containers/SellNow/CarSell/TryMywheelsform';
import Category from 'containers/Category';
import ProductDetails from 'containers/ProductDetails';
import Auth from '../auth';
import ChatRoom from 'containers/Chat/ChatRoom';
import myprofile from 'containers/More/Myprofile';
import Blog from 'containers/More/Blog';
import BlogDetails from 'containers/More/Blog/BlogDetails';
import Ads from 'containers/Ads';
import Chat from 'containers/Chat'
import Savedads from 'containers/More/Savedads';
import Carinspection from 'containers/More/Carinspection';
import Search from 'containers/Search';
import Filter from 'containers/Category/Filter';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
          <Stack.Navigator mode="modal" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="PostAddForm" component={PostAddForm}/> 
            <Stack.Screen name="TryMywheelsForm" component={TryMywheelsForm}/>
            <Stack.Screen name="ProductDetails" component={ProductDetails}/>
            <Stack.Screen name="SellOption" component={SellOption}/>
            <Stack.Screen name="BikeForm" component={BikeForm}/>
            <Stack.Screen name="Blog" component={Blog}/>
            <Stack.Screen name="BlogDetails" component={BlogDetails}/>
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
            <Stack.Screen name="Ads" component={Ads}/>
            <Stack.Screen name="Myprofile" component={myprofile} />
            <Stack.Screen name="Chats" component={Chat} />
            <Stack.Screen name="Savedads" component={Savedads} />
            <Stack.Screen name="Carinspection" component={Carinspection} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Filter" component={Filter} />

            {/* Authentication Screen  */}
            <Stack.Screen name="IsAuth" component={Auth} />
          </Stack.Navigator>
  );
};


export default App;



