import React, {useState, useEffect} from 'react';
import {Text} from 'components';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import {baseUrl, imageUrl} from '../../../../assets/common/baseUrl';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(14),
    paddingHorizontal: scale(14),
    justifyContent: 'space-between',
  },
  image: {
    width: scale(130),
    height: scale(100),
  },
  icon: {
    marginRight: scale(10),
  },
  flash: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  products: {
    paddingVertical: scale(14),
  },
  card: {
    width: scale(143),
    height: scale(190),
    backgroundColor: Colors.white,
    shadowColor: Colors.gray50,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 10,
    borderRadius: scale(5),
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: verticalScale(5),
    marginHorizontal: scale(10),
  },
  imgview: {
    margin: scale(6),
  },
});

const Supervised = ({navigation}) => {
  const [Supervised, setSupervised] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .get(`${baseUrl}get_supervised_api`)
      .then(res => {
        setSupervised(res.data.Data);
        console.log('get Supervised');
      })
      .catch(error => {
        console.log(error);
      });
  }, [isFocused]);

  return (
    <>
      {Supervised && (
        <>
          <View style={styles.header}>
            <View style={styles.flash}>
              <Text style={{fontWeight: '700'}} font="h2">
                Supervised Cars
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Category', {
                  title: 'Supervised Cars',
                  isfor: 'sCar',
                  type: 'supervised',
                })
              }>
              <Text color="primaryAlt" weight="medium">
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.products}>
            {Supervised.slice(0, 10).map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.container}
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    pid: item.id,
                    proglist: 'show',
                    ProItem: item,
                  })
                }>
                <View style={styles.card}>
                  <View style={styles.imgview}>
                    <ImageBackground
                      source={{
                        uri: `${imageUrl}uploads/gallery/${
                          JSON.parse(item.gallery)[0]
                        }`,
                      }}
                      resizeMode="cover"
                      style={styles.image}
                    />
                    <Text
                      style={{
                        backgroundColor: 'red',
                        color: '#fff',
                        textAlign: 'center',
                        padding: 5,
                        fontSize: 11,
                      }}>
                      PKR{' '}
                      {Math.floor(item.price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderTopWidth: 1.5,
                      width: 40,
                      alignSelf: 'center',
                      borderColor: 'red',
                    }}></View>
                  <Text
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      marginVertical: 7,
                      fontSize: 11.5,
                      fontWeight: 'bold',
                    }}
                    color="gray100">
                    {item.brand_name} {item.model_name}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}
                    color="primaryAlt"
                    font="h5">
                    {item.state_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

Supervised.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Supervised;
