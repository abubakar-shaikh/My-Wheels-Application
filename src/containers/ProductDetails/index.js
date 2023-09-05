import React, { useState } from 'react';
import { Text, NavBar, Container, IconButton} from 'components';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { getScreenHeight } from 'utils/size';
import { scale } from 'react-native-size-matters';
import { getRandomShop } from 'mocks/shops';
import Footer from './Footer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from 'themes/colors';
import ProgressForm from './ProgressForm';
import ImageView from "react-native-image-viewing";
import { useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { verticalScale } from 'react-native-size-matters';
import baseUrl from '../../../assets/common/baseUrl';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  carousel: {
    height: getScreenHeight() / 2.3,
    resizeMode: 'contain',
  },
  discount: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  price: {
    marginTop: scale(14),
  },
  card: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(14),
    marginBottom: scale(14),
    backgroundColor: Colors.white,
  },
  rating: {
    marginTop: scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  control: {
    flexDirection: 'row',
  },
  icon: {
    paddingLeft: scale(14),
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  detailcontainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: scale(10) },
  featview: { flexDirection: 'row', paddingVertical: scale(10) },
  featIcon: { paddingRight: scale(12), color: Colors.gray50 },
  featTxt: { flex: 0.5 },
  feathead: { paddingTop: scale(20), paddingBottom: scale(10), fontWeight: '700' },
  image: { width: '100%', height: scale(190) },
  inspection: { borderBottomWidth: 1, borderColor: Colors.primary, height: scale(16), marginTop: 10 },
  wrapper: {
    height: verticalScale(150),
  },
  slide: {
    flex: 1,
    width: '100%',
    height: 100,
  },
});

const shop = getRandomShop();

const ProductDetails = ({ navigation, route }) => {
  const { proglist, pid ,ProItem} = route.params;
  var objImg = JSON.parse(ProItem.gallery)

  const [variant, setVariant] = useState('ghost');
  const onScroll = (y) => {
    setVariant(y > getScreenHeight() / 2 ? 'gradient' : 'ghost');
  };

  const [visible, setIsVisible] = useState(false);
  const [item, setitem] = useState([]);
  const [imgindex, setimgindex] = useState();
  if (pid != null) {
    // console.log("productid", pid)
    useEffect(() => {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: `${baseUrl}product_detail_api/${pid}`,
        headers: {
          'Cookie': 'ci_session=1db562ac4d6209d8ea8fb1560e43fbf408fe60ea'
        }
      };

      axios(config)
        .then(function (response) {
          setitem(response.data.Data[0]);
          // setimage(JSON.parse(response.data.Data[0].gallery))
          // console.log("PRODUCTdETAILS",response.data.Data);
        })
        .catch(function (error) {
          console.log(error);
        });


    }, [])

    var viewimg = [];
    for (var i = 0; i < objImg.length; i++) {
      const uri = `${baseUrl}uploads/gallery/${objImg[i]}`;
      viewimg.push({ uri })
      
    }
  }

  return (
    <Container style={{ backgroundColor: '#fff' }}>
     <View style={{flex:1}}>
      <ImageView
        images={viewimg}
        imageIndex={imgindex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        backgroundColor='whitesmoke'
        />
      </View>
    
    <ScrollView
      onScroll={({ nativeEvent: { contentOffset: { y } } }) => onScroll(y)} scrollEventThrottle={16}>
        <Swiper
          style={StyleSheet.flatten([styles.wrapper, styles.carousel])}
          autoplay={false}
          activeDotColor={Colors.primary}
          dotColor={Colors.gray50}
        >
          {objImg.map((image,index) => (
            <Pressable key={image} onPress={() => {setimgindex(index),setIsVisible(true),console.log(index)}} style={{flex:1}}>
            <Image
              source={{uri:`${baseUrl}uploads/gallery/${image}`}}
              resizeMode="contain"
              style={styles.slide}
            />
             </Pressable>
          ))}
        </Swiper>

        <View style={styles.card}>
          <View style={{ marginVertical: 15 }}>
            <Text font="p1" weight="medium" style={{ paddingRight: scale(20) }}>{ProItem.brand_name} {ProItem.model_name} {item.variant_name}</Text>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text font="h2" weight="medium" color="tertiary">PKR {Math.floor(ProItem.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              {!proglist &&
                <TouchableOpacity style={styles.inspection} onPress={() => navigation.navigate('Carinspection')}>
                  <Text color='primary' font='p2'>Request inspection</Text>
                </TouchableOpacity>
              }
            </View>
            <Text>{item.city_name}</Text>
          </View>


        {proglist == 'show' ?
         <View style={{paddingVertical: scale(20)}}>
           <Image source={require('images/Myimages/1.jpg')} resizeMode='cover' style={styles.image}/>
         </View>
         :
         null
         }

         <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: scale(30), marginHorizontal: scale(-30) }}>
            <View>
              <Icon name='text-box' size={30} color='gray' />
              <Text>{item.year}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon name='speedometer' size={30} color='gray' />
              <Text>{item.mileage} Km</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon name='fuel' size={30} color='gray' />
              <Text>{item.fuel_type}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon name='text-box' size={30} color='gray' />
              <Text>{item.transmission}</Text>
            </View>
          </View>

          <View style={{ marginTop: scale(10) }}>
            <View style={styles.detailcontainer}>
              <Text color='gray50'>Registration Year</Text>
              <Text>{item.registration_year}</Text>
            </View>

            <View style={styles.detailcontainer}>
              <Text color='gray50'>Exterior Color</Text>
              <Text>{item.Exterior}</Text>
            </View>

            <View style={styles.detailcontainer}>
              <Text color='gray50'>Assembly</Text>
              <Text>{item.assembly}</Text>
            </View>

            <View style={styles.detailcontainer}>
              <Text color='gray50'>Engine Capacity</Text>
              <Text>{item.engine_capacity} cc</Text>
            </View>

            <View style={styles.detailcontainer}>
              <Text color='gray50'>Body Type</Text>
              <Text>{item.cat_name}</Text>
            </View>

            <View style={styles.detailcontainer}>
              <Text color='gray50'>Last Updated</Text>
              <Text>{item.last_update_time}</Text>
            </View>

            <View style={styles.detailcontainer}>
              <Text color='gray50'>Ad ID</Text>
              <Text>{item.id}</Text>
            </View>
          </View>


          {proglist &&
            <ProgressForm />
          }

          <Text color='gray100' font='h2' style={styles.feathead}>Seller Comments</Text>
          <Text color='gray75'>Zero meter</Text>
          <Text color='gray75'>All Color Availabe</Text>
          <Text color='gray75' style={{ paddingTop: scale(20) }}>Mention Mywheels.com when calling seller to get a good deal</Text>


          <Text color='gray100' font='h2' style={styles.feathead}>Features</Text>

          <View style={styles.featview}>
            <Icon size={20} name='car-brake-abs' style={styles.featIcon} />
            <Text style={styles.featTxt}>ABS</Text>
            <Icon size={20} name='radio' style={styles.featIcon} />
            <Text style={styles.featTxt}>AM/FM Radio</Text>
          </View>

          <View style={styles.featview}>
            <Icon size={20} name='car-seat-cooler' style={styles.featIcon} />
            <Text style={styles.featTxt}>Air Bags</Text>
            <Icon size={20} name='air-conditioner' style={styles.featIcon} />
            <Text style={styles.featTxt}>Air Conditioning</Text>
          </View>

          <View style={styles.featview}>
            <FontAwesome size={20} name='life-ring' style={styles.featIcon} />
            <Text style={styles.featTxt}>Alloy Rims</Text>
            <Icon size={20} name='car-cruise-control' style={styles.featIcon} />
            <Text style={styles.featTxt}>Cruise Control</Text>
          </View>


          <View style={styles.featview}>
            <FontAwesome size={20} name='life-ring' style={styles.featIcon} />
            <Text style={styles.featTxt}>Immobolizer Key</Text>
            <Icon size={20} name='car-door-lock' style={styles.featIcon} />
            <Text style={styles.featTxt}>Keyless Entry</Text>
          </View>


          <View style={styles.featview}>
            <Icon size={20} name='router' style={styles.featIcon} />
            <Text style={styles.featTxt}>Navigation System</Text>
            <Icon size={20} name='car-door' style={styles.featIcon} />
            <Text style={styles.featTxt}>Power Locks</Text>
          </View>

          {/* <Text color='gray100' font='h2' style={styles.feathead}>Seller Details</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image resizeMode='center' style={{ width: 50, height: 50, borderRadius: scale(100) }} source={require('images/users/1.jpg')} />
            <View style={{ paddingHorizontal: scale(10), flex: 1, justifyContent: 'center' }}>
              <Text color='gray100' font='h3'>Manzer Cars</Text>
              <Text font='p2' color='gray75'>Near Sir Syed Hospital Blue Area In karachi</Text>
            </View>
          </View> */}


       {!proglist &&
          <Pressable style={{ paddingVertical: scale(20) }} onPress={() => navigation.navigate('Carinspection')} >
          <Text color='gray100' font='h2' style={styles.feathead}>MyWheels Services</Text>
          <Image onPress={() => navigation.navigate('Carinspection')}
             source={require('images/Myimages/2.jpg')} resizeMode='cover' style={styles.image} />
         </Pressable>
        }

        <Text color='gray100' style={[styles.feathead, { fontSize: 18, fontWeight: 'bold' }]}>Want to Sell Your Car?</Text>
          <Pressable onPress={() => navigation.navigate('SellOption')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image resizeMode='center' style={{ width: 70, height: 70, borderRadius: scale(100) }} source={require('images/wanttosell.png')}/>
            <View style={{ paddingHorizontal: scale(10), flex: 1, justifyContent: 'center' }}>
              <Text color='gray100' font='h3'>Post an Ad for Free</Text>
              <Text font='p2' color='gray75'>Sell it faster to thousand of buyers</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SellOption')} style={{ width: 110, padding: scale(5), backgroundColor: Colors.primary, borderRadius: scale(5), alignItems: 'center', marginTop: scale(10) }}>
                <Text color='gray5'>Sell Your Car</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <NavBar
        onLeftIconPress={() => navigation.goBack()}
        containerStyle={styles.navbar}
        title={variant !== 'ghost' ? item.name : null}
        variant={variant}
        // renderRightComponent={() => (
        //   <View style={styles.control}>
        //     <IconButton
        //       icon="heart"
        //       color="white"
        //       style={styles.icon}
        //     />
        //     <IconButton
        //       icon="share-2"
        //       color="white"
        //       style={styles.icon}
        //     />
        //   </View>
        // )}
      />
      <Footer
        navigation={navigation}
        shop={item}
      />
    </Container>
  );
};


ProductDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ProductDetails;
