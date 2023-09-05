import React,{useState,useEffect,useContext} from 'react'
import {View,ScrollView,TextInput,Modal,TouchableOpacity,Alert,Image,FlatList,Switch} from 'react-native'
import {NavBar, Container, Text,ListItem,Button,TextField,Checkbox} from 'components';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../../../../permission';
import axios from 'axios';
import UserContext from 'contexts/UserContext';
import baseUrl from '../../../../assets/common/baseUrl'
import {BallIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import { RadioButton } from 'react-native-paper';
import styles from './styles';

const AssemblyData = ['Local','Imported'];
const ConditionData = ['New','Used'];

const PostAddForm = ({navigation}) => {

  const notification = (message = 'Something went wrong', type) => showMessage({ message, type });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkview, setCheckView] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');
  const [fueltypedata, setFuelTypeData] = useState('');
  const [carbrands, setCarBrands] = useState('');
  const [carModal, setCarModal] = useState('');
  const [variant, setVariant] = useState('');
  const [checkcon, setcheckcon] = useState(false);
  const [checkcon2, setcheckcon2] = useState(false);
  const [show, setShow] = useState(false)
  const { brands, setBrands,location, setLocation } = useContext(UserContext);
  const [checked, setChecked] = useState('first');

  const [CategoryData, setCategoryData] = useState([]);
  const [filerData, setFilerData] = useState([]);
  const [transdata, setTransData] = useState('');
  const [ExtColorData, setExtColorData] = useState('');
  const [engcapData, setEngCapData] = useState('');
  const [search, setsearch] = useState('');
  
  const [image, setImage] = useState([]);

  const [stateid, setStateID] = useState('')
  const [cityid, setCityId] = useState('')
  const [areaid, setAreaId] = useState('')
  const [brandId, setBrandId] = useState(0);
  const [modalId, setModalId] = useState(0);
  const [variantid, setVariantId] = useState('')
  const [caryear, setCarYear] = useState('');
  const [categoryid, setCategoryId] = useState('')
  const [regyear, setRegYear] = useState('');
  const [exterior, setExterior] = useState('');
  const [engcapacity, setEngCapacity] = useState('');
  const [assembly, setAssembly] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [fueltype, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [price, setPrice] = useState('');
  
  const [UpfrontPrice, setUpfrontPrice] = useState('');
  const [CurrentIns, setCurrentIns] = useState('');
  const [Totalterms, setTotalterms] = useState('');
  
  const [phoneno, setPhoneNo] = useState('');
  const [name, setname] = useState('');
  const [whatsno, setWhatsNo] = useState('');

  //Url_slug State And title_en 
  const [titlemodel, settitlemodal] = useState('');
  const [titlevariant, settitlevariant] = useState('');
  const [titleyear, settitleyear] = useState('');
  const [id,setId] = useState('');
  


    const [FeatData, setFeatData] = useState([]);
    const [feature,setfeature] = useState('')

    
  
  useEffect(() => {
    async function fetchMyAPI() {
      const id =await (AsyncStorage.getItem('user_id'));
      setId(id)
    }
    fetchMyAPI();
      axios
       .get(`${baseUrl}features_api`)
       .then(function (res){
         setFeatData(res.data.Features);
       })
       .catch(function (error) {
         console.log(error);
       });
   },[])
  

  var curr_year = new Date().getFullYear();
  var Caryears = [];

  for (var i = curr_year + 1; i >= 1910; i--) {
         Caryears.push(JSON.stringify(i));
   }

  const onSelectedImage = async () => {
    const permissionStatus = await androidCameraPermission()
     if(permissionStatus || Platform.OS == 'ios'){
      Alert.alert(
        'Choose File',
        'Chose an Option',
        [
          // {text:'Camera',onPress:onCamera},
          {text:'Gallery',onPress:onGallery},
          {text:'Cancel',onPress: () => {}}
        ]
   )}}


  // const onCamera =() => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log("incamera",image);
  //   });
  // }


  const onGallery = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      mediaType:'photo',
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
      multiple:true      
    }).then((img) => {
        if (Array.isArray(img)){
          setImage(i=>[...i,...img])
        }
      })
      .catch((e) => {
        console.log(e);
      });
    }

  function functioncomb(i){
      if (i>-1) {
       var ss = image;
       ss.splice(i,1);
       setImage(d=>[...ss]);
      }
  }

    if(checkcon){
        if( brandId != 0){
          axios
          .get(`${baseUrl}model_api/${brandId}`)
            .then(function (response) {
              setCategoryData(response.data.Models)
              setFilerData(response.data.Models)
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
          setCategoryData(response.data.Variant);
          setFilerData(response.data.Variant);
           setcheckcon2(false)
         })
         .catch(function (error) {
           console.log(error);
         });
         }
     }
    
   const Categoryfun = () => {
     axios
      .get(`${baseUrl}categories_api`)
      .then(function (res){
        setCategoryData(res.data.Categories);
        setFilerData(res.data.Categories);
      })
      .catch(function (error) {
        console.log(error);
      });
   }

   const Exteriorfun = () => {
     axios
      .get(`${baseUrl}exterior_color_api`)
      .then(function (res){
        setExtColorData(res.data.Exterior_color);
      })
      .catch(function (error) {
        console.log(error);
      });
   }

  
   
   const EngCapacityfun = () => {
     axios
      .get(`${baseUrl}engine_capacity_api`)
      .then(function (res){
        setEngCapData(res.data.Engine_capacity);
      })
      .catch(function (error) {
        console.log(error);
      });
   }

   const CityFilter = (text) => {
     if(text){
       const newData = CategoryData.filter((item) => {
        const itemData = item.name ? 
          item.name.toUpperCase()
          :  ''.toUpperCase();
        const textData = text.toUpperCase();
         return itemData.indexOf(textData) > -1;
       });
       setFilerData(newData);
       setsearch(text)
     }else{
      setFilerData(CategoryData)
      setsearch(text)
     }
    }

    
    // const CategoryFilter = (text) => {
    //   if(text){
    //     const newData = CategoryData.filter((item) => {
    //      const itemData = item.title ? 
    //        item.title.toUpperCase()
    //        :  ''.toUpperCase();
    //      const textData = text.toUpperCase();
    //       return itemData.indexOf(textData) > -1;
    //     });
    //     setFilerData(newData);
    //     setsearch(text)
    //   }else{
    //    setFilerData(CategoryData)
    //    setsearch(text)
    //   }
    //  }

  function Transfun(){
     axios
      .get(`${baseUrl}transmission_api`)
      .then(function (res){
        const Convert = Object.values(res.data.Transmission);
        setTransData(Convert);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
  function Fuelfun(){
     axios
      .get(`${baseUrl}fueltypes_api`)
      .then(function (res){
        const Convert = Object.values(res.data.Fueltypes);
        setFuelTypeData(Convert);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function SubmitForm(){
    var FormData = require('form-data');
    var data = new FormData();
      data.append('user_id', id);
      data.append('country', stateid);
      data.append('state', cityid);
      data.append('city', areaid);
      data.append('brand', brandId);
      data.append('model', modalId);
      data.append('variant', variantid);
      data.append('year', titleyear);
      data.append('category', categoryid);
      data.append('registration_year', regyear);
      data.append('Exterior', exterior);
      data.append('engine_capacity', engcapacity);
      data.append('assembly', assembly);
      data.append('mileage', mileage);
      data.append('features', item);
      if (image.length > 0) {
       for (var i = 0; i < image.length; i++) {
         const photo = image[i];
           data.append('gallery[]', {
           name: photo.path,
           type: photo.mime,
           uri: Platform.OS === "ios" ? photo.path.replace("file://", "") : photo.path,
         });
        }
      }
      data.append('condition', condition);
      data.append('description_en', description);
      data.append('fuel_type', fueltype);
      data.append('transmission', transmission);
      data.append('price', price);
      data.append('upfrontprice', UpfrontPrice);
      data.append('currentinstallment', CurrentIns);
      data.append('totalterm', Totalterms);
      data.append('name', name);
      data.append('phone_no', phoneno);
      data.append('whatapp_no', whatsno);
      data.append('title_en',carbrands+'-'+titlemodel+'-'+titlevariant+'-'+titleyear+'-'+'for-sale-in'+'-'+state);
      data.append('url_slug',carbrands+'-'+titlemodel+'-'+titlevariant);

     var config = {
        method: 'post',
        url: `${baseUrl}create_ad_api`,
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
      if(res.data.status == 200){
        notification(res.data.message, 'success');
        setShow(true)
        setTimeout(() => {
          setShow(false)
          navigation.navigate('SellOption');
        },2000)
      }
      if(res.data.status == 400){
        notification('FIll Form Correctly', 'warning');
      }
    })
    .catch(function (error) {
      notification('Something Wrong Please Try Again','danger');
      console.log(error);
  });
  }

  const [item, setitem] = useState([])

  function Pushitem (){
    FeatData.map((item) => {
      if(item.isSelected == true){
        setitem(i=>[...i,...[item.name]])
      }  
    })
  }


  const funct = (item) => {
    const newitem = FeatData.map((val)=>{
      if(val.id === item.id){
        return{...val,isSelected:!val.isSelected}
      }else{
        return val;
      }
    })
    setFeatData(newitem)
  }


  return (
    <Container style={{backgroundColor:'#fff'}}>
        <NavBar
            title="Sell Your Car"
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
                        onPress={() => [setState(item.States.name),setStateID(item.States.id),setCheckView('city'),setModalVisible(true),
                          setFilerData(item.States.City),setCategoryData(item.States.City)]} 
                        style={styles.txtView}>
                        <Text color='gray100'> { item.States.name } </Text>
                        <Icon name="chevron-right" size={scale(20)} color='gray'/>
                     </TouchableOpacity>
                       )}
                       keyExtractor={(item) => item.States.id}
                       showsVerticalScrollIndicator={false}
                     />
                  </View>
            }

            {checkview == 'city' && 
               <View style={styles.modalView}>
                <View style={styles.modalhead}>
                 <Text font='h3' color='primary'>Select City</Text>
                  <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                </View>
                <TextField
                    SerachIcon
                    value={search}
                    placeholder="search Here"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => CityFilter(text)}
                  />
                <FlatList
                   data={filerData}
                   renderItem={({item}) => (
                   <TouchableOpacity onPress={() => [setCity(','+item.name ),setCityId(item.id),setCheckView('area'),
                       setModalVisible(true),setFilerData(item.Area),setCategoryData(item.Area),setsearch('')]} style={styles.txtView}>
                      <Text color='gray100'> {item.name} </Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                  />
                  </View>
                }

              {checkview == 'area' && 
                  <View style={styles.modalView}>
                    <View style={styles.modalhead}>
                    <Text font='h3' color='primary'>Select Area</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <TextField
                        SerachIcon
                        value={search}
                        placeholder="search Here"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => CityFilter(text)}
                      />
                    <FlatList
                      data={filerData}
                      renderItem={({item}) => (
                    <TouchableOpacity onPress={() => [setArea(','+item.name),setAreaId(item.id),setModalVisible(!modalVisible),setsearch(''),setFilerData([])]} style={styles.txtView}>
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
                    <View style={styles.modalhead}>
                    <Text font='h3' color='primary'>Select Brands</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <TextField
                      SerachIcon
                      value={search}
                      placeholder="search Here"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => CityFilter(text)}
                    />
                    <FlatList
                      data={filerData}
                      renderItem={({item}) => (
                      <TouchableOpacity 
                        onPress={() => [setCarBrands(item.name),setBrandId(item.id),setcheckcon(true),setCheckView('Model'),setsearch(''),setFilerData([]),setModalVisible(true)]}
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
                    <View style={styles.modalhead}>
                    <Text font='h3'color='primary'>Select Car Modal</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <TextField
                      SerachIcon
                      value={search}
                      placeholder="search Here"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => CityFilter(text)}
                    />
                      <FlatList
                      data={filerData}
                      renderItem={({item}) => (
                    <TouchableOpacity onPress={() => [setCarModal(','+item.name),settitlemodal(item.name),setsearch(''),setFilerData([]),setModalId(item.id),setcheckcon2(true),setCheckView('variant'),setModalVisible(true)]} 
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

                {checkview == 'variant' && 
                <View style={styles.modalView}>
                    <View style={styles.modalhead}>
                    <Text font='h3'color='primary'>Select Car Variants</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <TextField
                      SerachIcon
                      value={search}
                      placeholder="search Here"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => CityFilter(text)}
                    />
                   <FlatList
                      data={filerData}
                      renderItem={({item }) => (
                    <TouchableOpacity onPress={() => [setVariant(','+item.name),setVariantId(item.id),setsearch(''),setFilerData([]),settitlevariant(item.name),setCheckView('CarYear'),setModalVisible(true)]}
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

              {checkview == 'RegistrationYear' && 
                <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select Registration Year</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    <FlatList
                      data={Caryears}
                      renderItem={({item,key}) => (
                    <TouchableOpacity onPress={() => [setRegYear(item),setModalVisible(!modalVisible)]} key={key} style={styles.txtView}>
                      <Text color='gray100'>{item}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>
                   )}
                   keyExtractor={(item) => item}
                   showsVerticalScrollIndicator={false}
                 />
                </View>
                }

              {checkview == 'category' && 
                <View style={styles.modalView}>
                    <View style={styles.modalhead}>
                      <Text font='h3' color='primary'>Select Category</Text>
                      <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                  <FlatList
                    data={filerData}
                    renderItem={({item}) => (
                     <TouchableOpacity onPress={() => [setCategory(item.title),setCategoryId(item.id),
                      setModalVisible(!modalVisible)]} style={styles.txtView}>
                        <Text color='gray100'>{ item.title }</Text>
                        <Icon name="chevron-right" size={scale(20)} color='gray'/>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                }
              {checkview == 'extcolor' && 
                <View style={styles.modalView}>
                    <View style={styles.modalhead}>
                      <Text font='h3' color='primary'>Select Exterior Color</Text>
                      <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                  <FlatList
                    data={ExtColorData}
                    numColumns={5}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => [setExterior(item),setModalVisible(!modalVisible)]}
                         style={{width:'20%',alignItems:'center',marginTop:30}} >
                        <Text style={{backgroundColor:item.toLowerCase(),borderWidth:1,paddingHorizontal:20,paddingVertical:10,borderRadius:50,marginBottom:10}}></Text>
                        <Text color='gray100' font='h5'>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                }
         
              {checkview == 'engCapacity' && 
                <View style={styles.modalView}>
                    <View style={styles.modalhead}>
                      <Text font='h3' color='primary'>Select Exterior Color</Text>
                      <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                  <FlatList
                    data={engcapData}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => [setEngCapacity(item),setModalVisible(!modalVisible)]}
                        style={styles.txtView}>
                         <Text color='gray100'>{item}</Text>
                         <Icon name="chevron-right" size={scale(20)} color='gray'/>
                       </TouchableOpacity>
                     )}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                }

              {checkview == 'transmission' && 
                <View style={styles.modalView}>
                  <ScrollView>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select Transmission</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    {transdata &&
                     transdata.map((item, key) => (
                      <TouchableOpacity onPress={() => [setTransmission(item),setModalVisible(!modalVisible)]} 
                        key={key} style={styles.txtView}>
                      <Text color='gray100'>{item}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                      </TouchableOpacity>)
                      )}
                  </ScrollView>
                </View>
                }

              {checkview == 'fueltype' && 
                <View style={styles.modalView}>
                  <ScrollView>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary' >Select FuelTypes</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    {fueltypedata &&
                     fueltypedata.map((item, key) => (
                      <TouchableOpacity onPress={() => [setFuelType(item),setModalVisible(!modalVisible)]} 
                        key={key} style={styles.txtView}>
                      <Text color='gray100'>{item}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                      </TouchableOpacity>)
                      )}
                  </ScrollView>
                </View>
                }
             
              {checkview == 'feature' && 
                <View style={styles.modalView}>
                   <Text font='h3' color='primary' >Select Features</Text>
                    <FlatList
                        data={FeatData}
                        renderItem={({item}) => (
                      <TouchableOpacity style={styles.txtView} 
                        onPress={() => [funct(item),setfeature(item.name),setitem([])]}>
                          <Text color='gray100'>{item.name}</Text>
                          {item.isSelected == true && <Checkbox value={true}/>}
                      </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                      />
                 <View style={{paddingBottom:scale(15),paddingTop:scale(7)}}>
                  <Button label="Done" onPress={() => [Pushitem(),setModalVisible(!modalVisible)]}/>
                 </View>
                </View>
                }


              {checkview == 'assembly' && 
                <View style={styles.modalView}>
                  <ScrollView>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select Assembly</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    {AssemblyData.map((item, key) => (
                      <TouchableOpacity onPress={() => [setAssembly(item),setModalVisible(!modalVisible)]} key={key} style={styles.txtView}>
                      <Text color='gray100'>{item}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                      </TouchableOpacity>)
                      )}
                  </ScrollView>
                </View>
                }

              {checkview == 'condition' && 
                <View style={styles.modalView}>
                  <ScrollView>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3' color='primary'>Select Condition</Text>
                    <Icon name="close" size={scale(20)} color='gray' onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    {ConditionData.map((item, key) => (
                      <TouchableOpacity onPress={() => [setCondition(item),setModalVisible(!modalVisible)]} 
                      key={key} style={styles.txtView}>
                      <Text color='gray100'>{item}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                      </TouchableOpacity>)
                      )}
                  </ScrollView>
                </View>
                }

            </Modal>
      </View>

      <ScrollView>

        {/* Image View Start */}

         {image.length > 0 ?
          <View style={styles.imgview}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {image.map((i,index)=>(
               <View key={index} style={styles.imgbox}>
                <Image
                  key={index}
                  resizeMode='cover' 
                  style={{ width: 50, height: 90}}
                   source={{
                     uri: i.path,
                     width: i.width,
                     height: i.height,
                     mime: i.mime,  
                      }}
                    />
                     <Icon name='close' size={20} color='red' onPress={() =>  functioncomb(index)} style={{position:'absolute',left:40,top:-5,backgroundColor:'black',borderRadius:100}}/>
                  </View>
                  ))
                  }
               </ScrollView>
            </View>
            :
              <TouchableOpacity style={styles.imgview}  onPress={onSelectedImage}>
                <Image  source={require('images/add-photo.png')}
                resizeMode='center' style={{width:300,height:100}}/>
              </TouchableOpacity>
            }

            {image.length > 0 ?
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={onSelectedImage} style={{color:'red',padding:5,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'red',width:150,borderRadius:50}}>
                    <Icon name='camera' size={15} color='#fff'/>
                    <Text style={{color:'#fff',paddingHorizontal:scale(5)}}>Add More Photo</Text>
                </TouchableOpacity> 
            </View>
                : null }  

          {/* Image View End */}
    

          <ListItem
              title="Location"
              leftIcon="map-marker"
              subtitle={state + city + area}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('location')]}
            />


          <ListItem
              title="Car Info"
              leftIcon="car-info"
              subtitle={carbrands + carModal + variant + caryear}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('Carbrands'),setCategoryData(brands),setFilerData(brands)]}
              />


          <ListItem
              title="Car categories"
              leftIcon="car-multiple"
              subtitle={category}
              RightIcon='chevron-down'
              onPress={() => [Categoryfun(),setModalVisible(true),setCheckView('category')]}
            />

          <ListItem
              title="Registration Year"
              leftIcon="text-box-outline"
              subtitle={regyear}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('RegistrationYear')]}
              />

          <ListItem
              title="Exterior Color"
              leftIcon="format-color-fill"
              subtitle={exterior}
              RightIcon='chevron-down'
              onPress={() => [Exteriorfun(),setModalVisible(true),setCheckView('extcolor')]}
            />


          <ListItem
              title="Engine capacity"
              leftIcon="engine"
              subtitle={engcapacity}
              RightIcon='chevron-down'
              onPress={() => [EngCapacityfun(),setModalVisible(true),setCheckView('engCapacity')]}
            />

          <ListItem
              title="Assembly"
              leftIcon="puzzle"
              subtitle={assembly}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('assembly')]}
            />

          <ListItem
              title="Condition"
              leftIcon="car-cog"
              subtitle={condition}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('condition')]}

            />
            
          <ListItem
              title="Transmission"
              leftIcon="text-box-outline"
              subtitle={transmission}
              RightIcon='chevron-down'
              onPress={() => [Transfun(),setModalVisible(true),setCheckView('transmission')]}
            />
            
          <ListItem
              title="FuelTypes"
              leftIcon="text-box-outline"
              subtitle={fueltype}
              RightIcon='chevron-down'
              onPress={() => [Fuelfun(),setModalVisible(true),setCheckView('fueltype')]}
            />

          <ListItem
              title="Features"
              leftIcon="star-circle"
              subtitle={item.toString()}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('feature')]}
            />


         <View style={styles.inputContainer}> 
            <Icon name='speedometer' size={30} style={styles.inputicon}/>
            <View style={styles.inputview}>
              <Text style={styles.txt}>Mileage (KM)</Text>
              <TextInput placeholder='Specific Mileage' 
               onChangeText={(text) => setMileage(text)}
              style={styles.input}/>
            </View>
          </View>


          <View style={styles.inputContainer}> 
            <Icon name='text-long' size={30} style={styles.inputicon}/>
            <View style={styles.inputview}>
              <Text style={styles.txt}>Description</Text>
              <TextInput placeholder='Enter Your Description'
               onChangeText={(text) => setDescription(text)}
               multiline={true}
               numberOfLines={2}
              style={{paddingTop:10}}
              />
            </View>
          </View>


         <View style={{paddingHorizontal:scale(20)}}>
          <Text style={[styles.txt,{fontSize:16}]}>Transaction</Text>

          <View style={{flexDirection:'row',alignItems:'center',paddingVertical:scale(15)}}>
            <RadioButton
               value="first"
               status={checked === 'first' ? 'checked' : 'unchecked'}
               color='#a92226'
               onPress={() => setChecked('first')}
               />

          <Text font='h3'>Cash</Text>
            <RadioButton
                value="second"
                color='#a92226'
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
                />
          <Text font='h3'>Leased</Text>

        </View>

        {checked == 'first' ? 
           <TextField 
            isCustom={true}
            keyboardType='number-pad'
            label='Enter Amount'
            customSet={(text) => setPrice(text)} 
            />
            :
            <View>
           <TextField 
            isCustom={true}
            keyboardType='number-pad'
            label='Upfront Price (PKR)*'
            customSet={(text) => setUpfrontPrice(text)} 
            />
           <TextField 
            isCustom={true}
            keyboardType='number-pad'
            label='Current Installment*'
            customSet={(text) => setCurrentIns(text)} 
            />
           <TextField 
            isCustom={true}
            keyboardType='number-pad'
            label='Total Terms (Months)*'
            customSet={(text) => setTotalterms(text)} 
            />
         </View>
          }
        </View>



          <View style={styles.label}>
              <Text font='h3' style={styles.labeltxt}>Contact Information</Text>
            </View>
           <View style={styles.inputContainer}> 
            <Icon name='account-circle' size={30} style={styles.inputicon}/>
            <View style={styles.inputview}>
              <Text style={styles.txt}>Name</Text>
               <TextInput 
                placeholder='Enter Your Name'
               onChangeText={(text) => setname(text)} 
               style={styles.input}
               />
            </View>
          </View>
          <View style={styles.inputContainer}> 
            <Icon name='cellphone' size={30} style={styles.inputicon}/>
            <View style={styles.inputview}>
              <Text style={styles.txt}>Mobile Number</Text>
              <TextInput 
                 keyboardType='numeric'  
                 placeholder='031900000333'
                 onChangeText={(text) => setPhoneNo(text)}
                 style={styles.input}
               />
            </View>
          </View>

          <View style={[styles.inputContainer,{justifyContent:'flex-end',}]}> 
            <Icon name='whatsapp' size={20} style={[styles.inputicon,{backgroundColor:'green',color:'#fff'}]}/>
            <Text style={{paddingRight:scale(30)}}>Allow Whatsapp Contact</Text>
            <Switch
              trackColor={{ false: Colors.gray10, true: Colors.primary}}
              ios_backgroundColor={Colors.gray10}
              onValueChange={toggleSwitch}
              value={isEnabled}
             />
          </View>
          <View style={[styles.btn,{paddingHorizontal:scale(15)}]}>
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

export default PostAddForm;


