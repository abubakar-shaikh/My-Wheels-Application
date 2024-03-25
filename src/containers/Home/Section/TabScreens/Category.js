import React, {useContext, useState} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {getScreenWidth} from 'utils/size';
import {scale, verticalScale} from 'react-native-size-matters';
import {Text} from 'components';
import {useNavigation} from '@react-navigation/native';
import UserContext from 'contexts/UserContext';
import {baseUrl, imageUrl} from '../../../../../assets/common/baseUrl';
import {BallIndicator} from 'react-native-indicators';
import {Skeleton} from '@rneui/themed';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex: 1,
    paddingVertical: verticalScale(5),
  },
  button: {
    width: getScreenWidth() / 5.2,
    aspectRatio: 1 / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: scale(8),
    // backgroundColor:'#fff',
    borderColor: 'gray',
    borderRadius: 5,
  },
  image: {
    width: scale(45),
    height: scale(45),
    marginTop: scale(10),
  },
});

const Category = () => {
  const navigation = useNavigation();
  const {browseCar, show, setshow} = useContext(UserContext);

  // setTimeout(() => {
  //   setshow(false)
  // }, 4000);

  return (
    <View style={styles.container}>
      {/* {show == false && browseCar == '' &&
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('images/Myimages/no-internet.png')} resizeMode='center'/>
      </View>
    } */}

      {show ? (
        <CategorySkeleton />
      ) : (
        <>
          {browseCar &&
            browseCar.Category.map(category => (
              <TouchableOpacity
                key={category[1]}
                onPress={() =>
                  navigation.navigate('Category', {
                    title: category[1],
                    isfor: 'search',
                    pmt: 'category',
                  })
                }>
                <View style={styles.button}>
                  <Image
                    source={{
                      uri: `${imageUrl}uploads/car-icons/${category[2]}`,
                    }}
                    resizeMode="contain"
                    style={styles.image}
                  />
                  <Text
                    style={{
                      height: 33,
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                    color="gray75"
                    font="h5">
                    {category[1]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </>
      )}
    </View>
  );
};

export default Category;
const CategorySkeleton = () => {
  return (
    <View style={styles.container}>
      {[{}, {}, {}, {}, {}, {}, {}, {}].map(item => (
        <Skeleton style={styles.button} />
      ))}
    </View>
  );
};
