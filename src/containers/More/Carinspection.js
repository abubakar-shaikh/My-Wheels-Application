import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet,View,ScrollView,TextInput,Modal,TouchableOpacity,FlatList,Image} from 'react-native'
import {NavBar, Container, Text,ListItem,Button,} from 'components';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import UserContext from 'contexts/UserContext';
import {BallIndicator} from 'react-native-indicators';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const CityData = ['Karachi','Islamabad']

const Carinspection = ({navigation}) => {

  const notification = (message = 'Something went wrong', type) => showMessage({ message, type });

  const [modalVisible, setModalVisible] = useState(false);
  const [checkview, setCheckView] = useState('');
  const [city, setCity] = useState('');
  const [carbrands, setCarBrands] = useState('');
  const [carModal, setCarModal] = useState('');
  const [variant, setVariant] = useState('');
  const [variantdata, setVariantData] = useState('');
  const [modalData, setmodelData] = useState('');
  const [checkcon, setcheckcon] = useState(false);
  const [checkcon2, setcheckcon2] = useState(false);
  const { brands, setBrands,} = useContext(UserContext);

  const [show, setShow] = useState(false)
  
  const [brandId, setBrandId] = useState(0);
  const [modalId, setModalId] = useState(0);
  const [variantid, setVariantId] = useState('')
  const [caryear, setCarYear] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [email,setEmail] = useState('');

  //Url_slug State And title_en 
  const [titlemodel, settitlemodal] = useState('');
  const [titlevariant, settitlevariant] = useState('');
  const [titleyear, settitleyear] = useState('');

  const [id,setId] = useState('');

  useEffect(() => {
    async function fetchMyAPI() {
      const id =await (AsyncStorage.getItem('user_id'));
      setId(id)
      console.log('idid',id)
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
      data.append('url_slug',carbrands+'-'+titlemodel+'-'+titlevariant);
      data.append('phone_no', phoneno);
      data.append('email', email);
      data.append('brand', brandId);
      data.append('model', modalId);
      data.append('variant', variantid);
      data.append('year', titleyear);
      data.append('city_name ', city);

    var config = {
      method: 'post',
      url: `${baseUrl}inspection_api`,
      headers: { 
        'Cookie': 'ci_session=17ff09b5594ea25d1c794b6ca8c7379e2d324a17', 
        ...data.getHeaders ? data.getHeaders() : { 'Content-Type': 'multipart/form-data' }
      },
      data : data
    };

    
    axios(config)
    .then(function (res) {
      if(res.data.status == 200){
        notification(res.data.message, 'succcess');
        setShow(true)
        setTimeout(() => {
          setShow(false)
          navigation.navigate('Home');
        },2000)
        console.log(res.data)
      }
      if(res.data.status == 400){
        notification(res.data.message, 'info');
        console.log(res.data)
        setShow(true)
        setTimeout(() => {
          setShow(false)
        },2000)
      }
    })
    .catch(function (error) {
      notification('Something Wrong Please Try Again','danger');
      console.log(error);
   });
  }

  return (
    <Container style={{backgroundColor:'#fff'}}>
        <NavBar
            title="Car Inspection"
            onLeftIconPress={() => navigation.goBack()}
            /> 
       <ScrollView>
     {/*  Modal */}

     <View style={styles.centeredView}>
         <Modal animationType="slide" transparent={true} visible={modalVisible}>

               {checkview == 'city' && 
                  <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select City</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    
                  {CityData.map(( item,index )  => (
                    <TouchableOpacity key={index} onPress={() => [setCity(item),setModalVisible(!modalVisible)]} style={styles.txtView}>
                      <Text color='gray100'> {item} </Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>
                    ))}
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
                      renderItem={({item,key }) => (
                      <TouchableOpacity 
                        onPress={() => [setCarBrands(item.name),setBrandId(item.id),setcheckcon(true),setCheckView('Model'),setModalVisible(true)]}
                        key={key} style={styles.txtView}>
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
                      renderItem={({item,key }) => (
                    <TouchableOpacity onPress={() => [setCarModal(','+item.name),settitlemodal(item.name),setModalId(item.id),setcheckcon2(true),setCheckView('variant'),setModalVisible(true)]} key={key} style={styles.txtView}>
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
                      renderItem={({item,key }) => (
                    <TouchableOpacity onPress={() => [setVariant(','+item.name),setVariantId(item.id),settitlevariant(item.name),setCheckView('CarYear'),setModalVisible(true)]}
                      key={key} style={styles.txtView}>
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
                     <TouchableOpacity onPress={() => [setCarYear(','+item),settitleyear(item),setModalVisible(!modalVisible)]} style={styles.txtView}>
                       <Text color='gray100'>{item}</Text>
                       <Icon name="chevron-right" size={scale(20)} color='gray'/>
                     </TouchableOpacity>
                    )}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                />
                </View>
                }
          
            </Modal>
      </View>
          <Image
            source={require('images/inspection.png')}
            resizeMode="cover"
            style={{alignSelf:'center',width: scale(160), height: scale(85)}}
            />
          <ListItem
              title="Location"
              leftIcon="map-marker"
              subtitle={ city }
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('city')]}
            />

          <ListItem
              title="Car Info"
              leftIcon="car"
              subtitle={carbrands + carModal + variant + caryear}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('Carbrands')]}
              />

           <View style={styles.inputContainer}> 
            <Icon name='cellphone' size={30} style={styles.inputicon}/>
            <View>
              <Text style={styles.txt}>Mobile Number</Text>
              <TextInput 
               keyboardType='numeric'
               placeholder='03173000200'
               onChangeText={(text) => setPhoneNo(text)} 
               style={styles.input}/>
            </View>
          </View>

           <View style={styles.inputContainer}> 
            <Icon name='account-circle' size={30} style={styles.inputicon}/>
            <View>
              <Text style={styles.txt}>Email</Text>
              <TextInput 
               onChangeText={(text) => setEmail(text)} 
               placeholder='Email@gmail.com'
              style={styles.input}/>
            </View>
          </View>
        </ScrollView>

          <View style={{borderRadius:0,paddingHorizontal:scale(20),paddingVertical:scale(20),backgroundColor:'#fff'}}>
           {show ?
            <BallIndicator color='red' animationDuration={1200} animating={show} />
            :
            <Button label="Book Inspection" onPress={() => SubmitForm()}/>
            }
          </View>
  </Container>
  )
} 

export default Carinspection

const styles = StyleSheet.create({
  label: {padding: scale(14),marginLeft:scale(10)},
  labeltxt:{fontWeight:'bold'},
  inputContainer:{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingVertical:scale(10)},
  inputicon:{borderRadius:50,marginHorizontal:scale(10),color:"#b4b4b4",backgroundColor:'whitesmoke',padding:8},
  input:{borderBottomWidth:1,width:500,borderColor:'darkred',paddingBottom:0,paddingLeft:0},
  txt:{marginBottom:-10,fontWeight:'bold',color:'#000',fontSize:15},
  centeredView: {flex: 1,justifyContent: "center",alignItems: "center"},
  modalView: {
    backgroundColor: "white",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    padding: 15,
    shadowColor: "#000",
    width:'100%',
    height:'93%',
    marginTop:'auto',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
  imgview:{height:scale(120),borderWidth:1,margin:scale(10),borderStyle:'dashed',borderColor:'red',flexDirection:'row',alignItems:'center',justifyContent:'center'},
  imgbox:{paddingHorizontal:scale(5),margin:scale(5),},
  txtView:{flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,borderColor:'gray',paddingVertical:15,justifyContent:'space-between'}
})
