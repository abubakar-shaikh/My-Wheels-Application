import React,{useState} from 'react'
import { StyleSheet, View ,ScrollView, TextInput,TouchableOpacity,Image, Platform ,Alert,Modal} from 'react-native'
import {NavBar, Container,Text,ListItem,Button} from 'components';
import { scale } from 'react-native-size-matters';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../../../../permission';

const locationData = ['Karachi','Islamabad','lahore','Pindi','Hyderabad','Nawabshah','Sukkur'];
// const CarInfo = ['Audi','Daihutu','BMW','Baic','Daewoo','Classic Cars','Prince'];
const CarBrandData = ['Acura','Audi','BMW','Bentley','Buick','Cadillac','Chevrolet','Suzuki','Tesla','Toyota'];

const BikeForm = ({navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [checkview, setCheckView] = useState('');
  const [locaton, setLocation] = useState('');
  // const [carinfo, setCarInfo] = useState('');
  const [carbrands, setCarBrands] = useState('');



  const [image, setImage] = React.useState([])

  const onSelectedImage = async () => {
    const permissionStatus = await androidCameraPermission()
    if(permissionStatus || Platform.OS == 'ios'){
      Alert.alert(
        'Choose File',
        'Chose an Option',
        [
          {text:'Camera',onPress:onCamera},
          {text:'Gallery',onPress:onGallery},
          {text:'Cancel',onPress: () => {}}
        ]
      )
    }
  }

  const onCamera =() =>{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }

  const onGallery = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
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
    })
      .then((img) => {
        if (Array.isArray(img)) {
          setImage(i=>[...i,...img])
        }
        console.log("imagesabc",image)
          })
          .catch((e) => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
          });
      }
      function functioncomb(i){
        if (i>-1) {
          var ss= image;
          ss.splice(i,1);
            setImage(d=>[...ss]);
        }
      }

  return (
    <Container style={{backgroundColor:'#fff'}}>
        <NavBar
            title="Sell Your Bike"
            onLeftIconPress={() => navigation.goBack()}
        /> 
       <ScrollView>
       <View style={styles.centeredView}>
          {/* LOcation Modal */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
              {checkview == 'location' && 
                  <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3'>Select City</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    {locationData.map((item, key)=>(
                    <TouchableOpacity onPress={() => [setLocation(item),setModalVisible(!modalVisible)]} key={key} style={styles.txtView}>
                      <Text color='gray100'> { item } </Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>)
                    )}
                  </View>
                }
                {checkview == 'Carbrands' && 
                <View style={styles.modalView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <Text font='h3'>Select Brands</Text>
                    <Icon name="close" size={scale(20)} color='gray'  onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                    {CarBrandData.map((item, key)=>(
                    <TouchableOpacity onPress={() => [setCarBrands(item),,setModalVisible(!modalVisible)]} key={key} style={styles.txtView}>
                      <Text color='gray100'>{item}</Text>
                      <Icon name="chevron-right" size={scale(20)} color='gray'/>
                    </TouchableOpacity>)
                    )}
                </View>
                }
            </Modal>
          </View>

        {image.length > 0 ? 
            <View style={styles.imgview}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {image.map((i,index)=>(
                  <View key={index} style={styles.imgbox}>
                  <Image key={index}
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
        
        <ListItem
              title="Location"
              leftIcon="map-marker"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('location')]}
              // onPress={() => navigation.navigate('Check')}
          />

        <ListItem
              title="Bike Brands"
              leftIcon="bike"
              subtitle={carbrands}
              RightIcon='chevron-down'
              onPress={() => [setModalVisible(true),setCheckView('Carbrands')]}
          />

        <ListItem
              title="Bike Models"
              leftIcon="bike"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => setModalVisible(true)}
            />

          <ListItem
              title="Years"
              leftIcon="calendar-month"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => setModalVisible(true)}
            />

          <ListItem
              title="Registration Year"
              leftIcon="file-document-edit-outline"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => setModalVisible(true)}
            />
          
          <View style={styles.inputContainer}> 
            <Icon name='engine' size={30} style={styles.inputicon}/>
            <View>
              <Text style={styles.txt}>Engine capacity</Text>
              <TextInput placeholder='Specific price' style={styles.input}/>
            </View>
          </View>

          <ListItem
              title="Assembly"
              leftIcon="file-document-edit-outline"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => setModalVisible(true)}
            />

          <View style={styles.inputContainer}> 
            <Icon name='speedometer' size={30} style={styles.inputicon}/>
            <View>
              <Text style={styles.txt}>Mileage</Text>
              <TextInput placeholder='Mileage' style={styles.input}/>
            </View>
          </View>

          
          <ListItem
              title="Condition"
              leftIcon="file-document-edit-outline"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => setModalVisible(true)}
            />


          <View style={styles.inputContainer}> 
            <Icon name='engine' size={30} style={styles.inputicon}/>
            <View>
              <Text style={styles.txt}>Description</Text>
              <TextInput placeholder='Description' style={styles.input}/>
            </View>
          </View>

          <ListItem
              title="Fuel Type"
              leftIcon="fuel"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => setModalVisible(true)}
            />

          <ListItem
              title="Transmission"
              leftIcon="transmission-tower"
              subtitle={locaton}
              RightIcon='chevron-down'
              onPress={() => setModalVisible(true)}
            />

          <View style={styles.inputContainer}> 
            <Foundation name='price-tag' size={30} style={[styles.inputicon,{padding:12}]}/>
            <View>
              <Text style={styles.txt}>Price</Text>
              <TextInput placeholder='Price' style={styles.input}/>
            </View>
          </View>

          <View style={styles.inputContainer}> 
            <Foundation name='price-tag' size={30} style={[styles.inputicon,{padding:12}]}/>
            <View>
              <Text style={styles.txt}>Price from</Text>
              <TextInput placeholder='Price' style={styles.input}/>
            </View>
          </View>

          <View style={styles.inputContainer}> 
            <Icon name='email' size={30} style={[styles.inputicon,{padding:12}]}/>
            <View>
              <Text style={styles.txt}>Email</Text>
              <TextInput placeholder='Email' style={styles.input}/>
            </View>
          </View>

            <View style={styles.label}>
              <Text font='h3' style={styles.labeltxt}>Contact Information</Text>
            </View>
          <View style={styles.inputContainer}> 
            <Icon name='account-circle' size={30} style={styles.inputicon}/>
            <View style={{borderBottomWidth:1,width:500,borderColor:'lightgray',paddingBottom:10}}>
              <Text color='gray100' weigth='medium'>Name</Text>
              <Text font="h3" color='gray100' weigth='medium' style={{fontWeight:'bold'}}>User Name Here</Text>
            </View>
          </View>
          <View style={styles.inputContainer}> 
            <Icon name='cellphone' size={30} style={styles.inputicon}/>
            <View>
              <Text style={styles.txt}>Mobile Number</Text>
              <TextInput placeholder='03173749749' placeholderTextColor='#000' style={styles.input}/>
            </View>
          </View>
          <View style={{borderRadius:0,paddingHorizontal:scale(20),paddingVertical:scale(20),backgroundColor:'#fff'}}>
            <Button label="Post Your Ads"/>
         </View>
        </ScrollView>
  </Container>
  )
}

export default BikeForm

const styles = StyleSheet.create({
  label: {
    padding: scale(14),
    marginLeft:scale(10),
  },
  labeltxt:{fontWeight:'bold'},
  inputContainer:{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingVertical:scale(10)},
  inputicon:{borderRadius:50,marginHorizontal:scale(10),color:"#b4b4b4",backgroundColor:'whitesmoke',padding:8},
  input:{borderBottomWidth:1,width:500,borderColor:'darkred',paddingBottom:0,paddingLeft:0},
  txt:{marginBottom:-10,fontWeight:'bold',color:'#000',fontSize:15},
  imgview:{height:scale(120),borderWidth:1,margin:scale(10),borderStyle:'dashed',borderColor:'red',flexDirection:'row',alignItems:'center'},
  imgbox:{paddingHorizontal:scale(5),margin:scale(5),},
  centeredView: {flex: 1,justifyContent: "center",alignItems: "center"},
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    width:'100%',
    height:'100%',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  txtView:{flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,borderColor:'gray',paddingVertical:15,justifyContent:'space-between'}
})