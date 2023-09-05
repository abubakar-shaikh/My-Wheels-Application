import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet,View,ScrollView,TextInput,Modal,TouchableOpacity,FlatList,Switch} from 'react-native'
import {NavBar, Container, Text,ListItem,Button,TextField} from 'components';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import UserContext from 'contexts/UserContext';
import {BallIndicator} from 'react-native-indicators';
import baseUrl from '../../../../assets/common/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import styles from './styles';

const TryMywheelsform = ({navigation}) => {

  const notification = (message = 'Something went wrong', type) => showMessage({ message, type });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [whatscon, setWhatsCon] = useState(false);
  const [checkview, setCheckView] = useState('');
  const [CityData, setCityData] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [carbrands, setCarBrands] = useState('');
  const [carModal, setCarModal] = useState('');
  // const [brands, setBrands] = useState('');
  const [variant, setVariant] = useState('');
  const [variantdata, setVariantData] = useState('');
  const [modalData, setmodelData] = useState('');
  const [checkcon, setcheckcon] = useState(false);
  const [checkcon2, setcheckcon2] = useState(false);
  const { brands, setBrands,location, setLocation } = useContext(UserContext);
  const [show, setShow] = useState(false)

  const [stateid, setStateID] = useState('')
  const [cityid, setCityId] = useState('')
  const [brandId, setBrandId] = useState(0);
  const [modalId, setModalId] = useState(0);
  const [variantid, setVariantId] = useState('')
  const [caryear, setCarYear] = useState('');
  const [regyear, setRegYear] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [name, setname] = useState('');
  const [email,setEmail] = useState('');
  const [whatsno, setWhatsNo] = useState('');

  //Url_slug State And title_en 
  const [titlemodel, settitlemodal] = useState('');
  const [titlevariant, settitlevariant] = useState('');
  const [titleyear, settitleyear] = useState('');

  const [id,setId] = useState('');


  useEffect(() => {
    async function fetchMyAPI() {
      const id =await (AsyncStorage.getItem('user_id'));
      setId(id)
    }
    fetchMyAPI();
  },[])
  

  var curr_year = new Date().getFullYear();
  var Caryears = [];

  for (var i = curr_year + 1; i >= 1910; i--) {
         Caryears.push(JSON.stringify(i));
   }


    if(checkcon){
        if(brandId != 0){
          axios
          .get(`${baseUrl}model_api/${brandId}`)
            .then(function (response) {
              setmodelData(response.data.Models)
              console.log('Model Data')
              setcheckcon(false)
            })
            .catch(function (error) {
              console.log(error);
            });  
          }
    }
      

  if(checkcon2){
      if(modalId != 0 && brandId != 0){
        axios
         .get(`${baseUrl}variant_api/${brandId}/${modalId}`)
         .then(function (response){
           setVariantData(response.data.Variant);
           console.log('Variants Data');
           setcheckcon2(false)
         })
         .catch(function (error) {
           console.log(error);
         });
         }
  }
   

  function SubmitForm(){
    var FormData = require('form-data');
    var data = new FormData();
      data.append('user_id', id);
      data.append('country', stateid);
      data.append('state', cityid);
      data.append('brand', brandId);
      data.append('model', modalId);
      data.append('variant', variantid);
      data.append('year', caryear);
      data.append('registration_year', regyear);
      data.append('first_name', name);
      data.append('email', email);
      data.append('phone_no', phoneno);
      data.append('whatapp_no', whatsno);
      data.append('title_en',carbrands+'-'+titlemodel+'-'+titlevariant+'-'+titleyear+'-'+'for-sale-in'+'-'+state);
      data.append('url_slug',carbrands+'-'+titlemodel+'-'+titlevariant);

    var config = {
      method: 'post',
      url: `${baseUrl}supervised_ad_api`,
      headers: { 
        'Cookie': 'ci_session=17ff09b5594ea25d1c794b6ca8c7379e2d324a17', 
        ...data.getHeaders ? data.getHeaders() : { 'Content-Type': 'multipart/form-data' }
      },
      data : data
    };

    if(isEnabled == true){
      setWhatsNo(phoneno)
    }
   
   axios(config)
    .then(function (res) {
      console.log('then status',res.data)
      if(res.data.status == 200){
        notification(res.data.message, 'succcess');
        setShow(true)
        setTimeout(() => {
         setShow(false)
         navigation.navigate('Ads');
        },2000)
        console.log(res.data)
      }
      if(res.data.status == 400){
        notification('FIll Form Correctly', 'warning');
        // console.log(res.data);
      }
    })
    .catch(function (error) {
      console.log(error);
      notification('Something Wrong Please Try Again','danger');
   });
  }

  return (
    <Container style={{backgroundColor:'#fff'}}>
        <NavBar
            title="MyWheels Sell It for Me Request"
            onLeftIconPress={() => navigation.goBack()}
            /> 
     {/*  Modal */}

     <View style={styles.centeredView}>
         <Modal animationType="slide" transparent={true} visible={modalVisible}>
              {checkview == 'location' && 
                  <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select State</Text>
                    <Icon name="close" size={scale(20)} color='gray' onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                   <FlatList
                     data={location}
                     renderItem={({item}) => (
                      <TouchableOpacity
                      onPress={() => [setState(item.States.name),setStateID(item.States.id),setCheckView('city'),setModalVisible(true),setCityData(item.States.City)]} 
                       style={styles.txtView}>
                      <Text color='gray100'> { item.States.name } </Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                      </TouchableOpacity>
                       )}
                       keyExtractor={(item) => item.id}
                       showsVerticalScrollIndicator={false}
                     />
                  </View>
                }

               {checkview == 'city' && 
                  <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select City</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <FlatList
                      data={CityData}
                      renderItem={({item }) => (
                    <TouchableOpacity onPress={() => [setCity(','+item.name ),setCityId(item.id),setModalVisible(!modalVisible)]} style={styles.txtView}>
                      <Text color='gray100'> { item.name } </Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                  />
                  </View>
                }


              {checkview == 'Carbrands' && 
                <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select Brands</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <FlatList
                      data={brands}
                      renderItem={({item}) => (
                      <TouchableOpacity 
                        onPress={() => [setCarBrands(item.name),setBrandId(item.id),setcheckcon(true),setCheckView('Model'),setModalVisible(true)]}
                        style={styles.txtView}>
                       <Text color='gray100'>{item.name}</Text>
                       <Icon name="chevron-right" size={scale(20)} color='gray'/>
                     </TouchableOpacity>
                    )}
                      keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
                }

              {checkview == 'Model' && 
                <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3'color='primary'>Select Car Modal</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                      <FlatList
                      data={modalData}
                      renderItem={({item }) => (
                    <TouchableOpacity onPress={() => [setCarModal(','+item.name),settitlemodal(item.name),setModalId(item.id),setcheckcon2(true),setCheckView('variant'),setModalVisible(true)]} style={styles.txtView}>
                      <Text color='gray100'>{item.name}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                }

                {checkview == 'variant' && 
                <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3'color='primary'>Select Car Variants</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                   <FlatList
                      data={variantdata}
                      renderItem={({item}) => (
                    <TouchableOpacity onPress={() => [setVariant(','+item.name),setVariantId(item.id),settitlevariant(item.name),setCheckView('CarYear'),setModalVisible(true)]}
                       style={styles.txtView}>
                      <Text color='gray100'>{item.name}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>
                   )}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
                </View>
                }

                {checkview == 'CarYear' && 
                <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3'color='primary'>Select Car Year</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>       
                  {/* {Caryears && */}
                      <FlatList
                      data={Caryears}
                      renderItem={({item }) => (
                     <TouchableOpacity onPress={() => [setCarYear(','+item),settitleyear(item),console.log("showcaryesr",item),setModalVisible(!modalVisible)]} style={styles.txtView}>
                       <Text color='gray100'>{item}</Text>
                       <Icon name="chevron-right" size={scale(20)} color='gray'/>
                     </TouchableOpacity>
                    )}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                />
                </View>
                }

              {checkview == 'RegistrationYear' && 
                <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select Brands</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <FlatList
                      data={Caryears}
                      renderItem={({item}) => (
                    <TouchableOpacity onPress={() => [setRegYear(item),setModalVisible(!modalVisible)]} style={styles.txtView}>
                      <Text color='gray100'>{item}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>
                   )}
                   keyExtractor={(item) => item.id}
                   showsVerticalScrollIndicator={false}
                 />
                </View>
                }
          
            </Modal>
      </View>

      <ScrollView>
          <ListItem
              title="Location"
              leftIcon="map-marker"
              subtitle={state + city }
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('location')]}
            />

          <ListItem
              title="Car Info"
              leftIcon="car-info"
              subtitle={carbrands + carModal + variant + caryear}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('Carbrands')]}
              />


          <ListItem
              title="Registration Year"
              leftIcon="text-box-outline"
              subtitle={regyear}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('RegistrationYear')]}
              />



            <View style={styles.label}>
              <Text font='h3' style={styles.labeltxt}>Contact Information</Text>
            </View>
           <View style={styles.inputContainer}> 
            <Icon name='email' size={30} style={styles.inputicon}/>
            <View style={styles.inputview}>
              <Text style={styles.txt}>Email</Text>
            <TextInput 
              autoComplete='email'
               onChangeText={(text) => setEmail(text)} 
               placeholder='Enter Your Email'
                style={styles.input}/>
            </View>
          </View>
           <View style={styles.inputContainer}> 
            <Icon name='account-circle' size={30} style={styles.inputicon}/>
            <View style={styles.inputview}>
              <Text style={styles.txt}>Name</Text>
              <TextInput 
               onChangeText={(text) => setname(text)} 
               placeholder='Enter Your Name'
               style={styles.input}/>
            </View>
          </View>
          <View style={styles.inputContainer}> 
            <Icon name='cellphone' size={30} style={styles.inputicon}/>
            <View style={styles.inputview}>
              <Text style={styles.txt}>Mobile Number</Text>
              <TextInput 
               keyboardType='numeric'
               placeholder='03173749749'
               onChangeText={(text) => setPhoneNo(text)} 
               style={styles.input}/>
            </View>
          </View>

          <View style={[styles.inputContainer,{justifyContent:'flex-end',}]}> 
            <Icon name='whatsapp' size={20} style={[styles.inputicon,{backgroundColor:'green',color:'#fff'}]}/>
            <Text style={{paddingRight:scale(30)}}>Allow Whatsapp Contact</Text>
            <Switch
                  onPress={() => console.log(value)}
                  trackColor={{ false: Colors.gray10, true: Colors.primary}}
                  ios_backgroundColor={Colors.gray10}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  
                />
          </View>
          <View style={{borderRadius:0,paddingHorizontal:scale(20),paddingVertical:scale(20),backgroundColor:'#fff'}}>
           {show ?
            <BallIndicator color='red' animationDuration={1200} animating={show} />
            :
            <Button label="Post Your Ads" onPress={() => SubmitForm()}/>
            }
          </View>
        </ScrollView>
  </Container>
  )
}

export default TryMywheelsform