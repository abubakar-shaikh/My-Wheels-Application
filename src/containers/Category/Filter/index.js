import React, {useRef, useState, useEffect,useContext} from 'react'
import {StyleSheet,View,ScrollView,Modal,TouchableOpacity,FlatList} from 'react-native'
import {Text, TextField, ListItem2, Button,NavBar,Container} from 'components'
// import Colors from 'themes/colors'
import {scale} from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Feather'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import {baseUrl,imageUrl} from '../../../../assets/common/baseUrl'
// import {useNavigation} from '@react-navigation/native'
import UserContext from 'contexts/UserContext';
import {BallIndicator} from 'react-native-indicators';

const Filter = ({navigation,route}) => {
  const {name,type} = route.params;
  const [show, setShow] = useState(false)
  console.log(type)
  const [multiSliderPrice, setMultiSliderPrice] = useState('')
  const [multiSliderPricefrom, setMultiSliderPriceFrom] = useState('')
  const [multiSli, setMultiSli] = useState()
  const [milf, setMilf] = useState()
  const [max ,setmax] = useState(10)

  setTimeout(() => {
    setmax(5000000)
  }, 1000);

  const [mileage, setMileage] = useState('')
  const [mileagefrom, setMileageFrom] = useState('')
  const {setRow} = useContext(UserContext);

  const multiSliderValuesChange = values => {setMultiSliderPrice(values[0]),setMultiSliderPriceFrom(values[1])}
  const mullageValuesChange = values => {setMileage(values[0]),setMileageFrom(values[1])}

  const [modalVisible, setModalVisible] = useState(false)
  const [checkview, setCheckView] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [modal, setModal] = useState('')

  const [cityData, setCityData] = useState('')
  const [modalData, setModalData] = useState('')
  const [cateData, setCateData] = useState('')

  const filfunction = () => {
    setShow(true)
    console.log('hit fun')
    var config = {
      method: 'get',
      url: `${baseUrl}filter_api?city=${city}&type=${type}&model=${modal}&category=${category}&min_price=${multiSliderPrice}&max_price=${multiSliderPricefrom}&min_mileage=${mileage}&max_mileage=${mileagefrom}`,
      headers: {},
    }

    axios(config)
      .then(function(res){
        if (res.data.status == 200){
          if(res.data.Data != "no post"){
            console.log('Filter data', res.data.Data)
            navigation.goBack()
            setRow(res.data.Data)
            setShow(false)
           }else{
            setShow(false)
            setRow('')
            navigation.goBack()
           }
        }
      })
      .catch(function (error) {
        console.log(error)
        setShow(false)
      })
  }

  useEffect(() => {
    axios
      .get(`${baseUrl}city_api`)
      .then(function (res) {
        setCityData(res.data.Data)
        console.log('City Data Successful')
      })
      .catch(function (error) {
        console.log(error)
      })

    axios
      .get(`${baseUrl}all_model_api?data=all`)
      .then(function (res) {
        setModalData(res.data.Data)
        console.log('Location Data')
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const Categoryfun = () => {
    axios
      .get(`${baseUrl}categories_api`)
      .then(function (res) {
        setCateData(res.data.Categories)
        console.log('category successfull')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Container backgroundColor="white">
      <NavBar
        title={"Filter  " + name }
        onLeftIconPress={() => navigation.goBack()}/>
       <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {checkview == 'city' && (
          <View style={styles.modalView}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text font="h3" color="primary">
                Select City
              </Text>
              <Icon2
                name="close"
                size={scale(20)}
                color="gray"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <FlatList
              data={cityData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => [
                    setCity(item.name),
                    setModalVisible(!modalVisible),
                  ]}
                  style={styles.txtView}>
                  <Text color="gray100"> {item.name} </Text>
                  <Icon name="chevron-right" size={scale(20)} color="gray" />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {checkview == 'modal' && (
          <View style={styles.modalView}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text font="h3" color="primary">
                Select Car Modal
              </Text>
              <Icon2
                name="close"
                size={scale(20)}
                color="gray"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <FlatList
              data={modalData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => [
                    setModal(item.name),
                    setModalVisible(!modalVisible),
                  ]}
                  style={styles.txtView}>
                  <Text color="gray100"> {item.name} </Text>
                  <Icon name="chevron-right" size={scale(20)} color="gray" />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {checkview == 'category' && (
          <View style={styles.modalView}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text font="h3">Select Category</Text>
              <Icon2
                name="close"
                size={scale(20)}
                color="gray"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <FlatList
              data={cateData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => [
                    setCategory(item.title),
                    setModalVisible(!modalVisible),
                  ]}
                  style={styles.txtView}>
                  <Text color="gray100">{item.title}</Text>
                  <Icon name="chevron-right" size={scale(20)} color="gray" />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </Modal>

       <ScrollView>
        <View style={styles.container1}>
            <ListItem2
              title="Location"
              leftIcon="map-marker"
              subtitle={city}
              RightIcon="chevron-down"
              onPress={() => [setModalVisible(true), setCheckView('city')]}
            />

            <ListItem2
              title="Car Model"
              leftIcon="car"
              subtitle={modal}
              RightIcon="chevron-down"
              onPress={() => {
                setModalVisible(true), setCheckView('modal')
              }}
            />

            <ListItem2
              title="Car categories"
              leftIcon="car"
              subtitle={category}
              RightIcon="chevron-down"
              onPress={() => [
                Categoryfun(),
                setModalVisible(true),
                setCheckView('category'),
              ]}
            />
            <ListItem2 title="Price Range(PKR)" leftIcon="tag" />
            <View style={styles.price}>
              <View style={styles.flex}>
                <TextField
                  initialValue={multiSliderPrice.toString()}
                  isCustom={true}
                  placeholder='0'
                  keyboardType="number-pad"
                  customSet={(text) => setMultiSliderPrice(text)}
                />
              </View>
              <View style={styles.divider}></View>
              <View style={styles.flex}>
                <TextField
                  initialValue={multiSliderPricefrom.toString()}
                  isCustom={true}
                  placeholder='500000'
                  keyboardType="number-pad"
                  customSet={(text) => setMultiSliderPriceFrom(text)}
                />
              </View>
            </View>


            <View style={{alignItems: 'center'}}>
              <MultiSlider
                values={[0, multiSli]}
                sliderLength={300}
                onValuesChange={multiSliderValuesChange}
                min={0}
                max={max}
                step={1}
                allowOverlap
                snapped
                markerStyle={{
                  ...Platform.select({
                    android: {
                      height: 25,
                      width: 25,
                      borderRadius: 50,
                      backgroundColor: '#a92226',
                    },
                  }),
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {backgroundColor: '#a92226'},
                  }),
                }}
                selectedStyle={{backgroundColor: '#a92226'}}
                trackStyle={{backgroundColor: '#000'}}
              />
            </View>

            <ListItem2 title="Mileage Range" leftIcon="tag" />
            <View style={{alignItems: 'center'}}>
              <View style={styles.price}>
                <View style={styles.flex}>
                  <TextField
                    initialValue={mileage.toString()}
                    keyboardType="number-pad"
                    customSet={(text) => setMileage(text)}
                    isCustom={true}
                    placeholder='0'
                  />
                </View>
                <View style={styles.divider}></View>
                <View style={styles.flex}>
                  <TextField
                    keyboardType="number-pad"
                    customSet={(text) => setMileageFrom(text)}
                    isCustom={true}
                    placeholder='500000'
                    initialValue={mileagefrom.toString()}
                  />
                </View>
              </View>


             <MultiSlider
                values={[0, milf]}
                sliderLength={300}
                onValuesChange={mullageValuesChange}
                min={0}
                max={max}
                step={1}
                markerStyle={{
                  ...Platform.select({
                    android: {
                      height: 25,
                      width: 25,
                      borderRadius: 50,
                      backgroundColor: '#a92226',
                    },
                  }),
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      backgroundColor: '#a92226',
                    },
                  }),
                }}
                selectedStyle={{
                  backgroundColor: '#a92226',
                }}
                trackStyle={{
                  backgroundColor: '#000',
                }}
              />
            </View>
          </View>
           </ScrollView>
            <View style={{margin: 10,height:50}}>
            {show ?
              <BallIndicator color='red' animationDuration={1200} animating={show} />
              :
                <Button label="FILTER" onPress={() => filfunction()} />
              }
            </View>
        </Container>
  )
}

export default Filter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(14),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    marginLeft: scale(5),
  },
  price: {
    flexDirection: 'row',
    flex: 0.2,
  },
  divider: {
    marginHorizontal: scale(10),
  },
  flex: {
    flex: 1,
  },
  label: {
    marginHorizontal: scale(10),
    fontSize: scale(23),
  },
  container1: {
    flex:1,
    backgroundColor: 'white',
    marginHorizontal: scale(15),
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 20,
    shadowColor: "#000",
    width:'100%',
    marginTop: 'auto',
    height: '93%',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  txtView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingVertical: scale(15),
    justifyContent: 'space-between',
  },
})
