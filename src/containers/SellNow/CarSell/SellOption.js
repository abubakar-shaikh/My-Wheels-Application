import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {NavBar, Container, Button} from 'components';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';
import colors from 'themes/colors';
import {AuthContext} from 'contexts/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const SellOption = ({navigation}) => {
  const {
    auth: {isLoggedIn},
  } = useContext(AuthContext);
  const [checked, setChecked] = React.useState('first');
  // const [check,setCheck] = useState(true);
  // const [check2,setCheck2] = useState(false);

  function checkmar2() {
    setChecked('second');
  }
  function checkmar() {
    setChecked('first');
  }

  function CheckSelect() {
    if (checked === 'first') {
      isLoggedIn
        ? navigation.navigate('PostAddForm')
        : navigation.navigate('IsAuth');
    } else if (checked === 'second') {
      navigation.navigate('TryMywheelsForm');
    }
  }

  return (
    <Container>
      <LinearGradient
        start={{x: 1.2, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#dc333a', '#9a0e12']}
        style={{
          paddingBottom: widthPercentageToDP(10),
        }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
      </LinearGradient>
      <NavBar
        title="Select Car Selling Option"
        onLeftIconPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => checkmar()}
            style={[styles.box, checked === 'first' ? styles.select : {}]}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: scale(13),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                color="#a92226"
                onPress={() => setChecked('first')}
              />

              <Text style={styles.headtxt}>Post your Ad on MyWheels</Text>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={styles.tinyLogo}
                source={require('images/postmobile.png')}
              />
            </View>

            <View style={styles.markview}>
              <Icon name="check" size={20} color="green" />
              <Text style={styles.txt}>
                Post your Ad for Free in 3 Easy Steps
              </Text>
            </View>
            <View style={styles.markview}>
              <Icon name="check" size={20} color="green" />
              <Text style={styles.txt}>
                {' '}
                Get Genuine offers from Verified Buyers
              </Text>
            </View>
            <View style={styles.markview}>
              <Icon name="check" size={20} color="green" />
              <Text style={styles.txt}>Post Your Ad For Free</Text>
            </View>
            <View style={styles.markview3}>
              <Text style={styles.txt}>
                {' '}
                Sell your car Fast at the Best Price
              </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: scale(20),
              color: '#000',
              fontWeight: '500',
            }}>
            or Wants to sell Your Car Hassle Free?
          </Text>

          <TouchableOpacity
            onPress={() => checkmar2()}
            style={[styles.box, checked === 'second' ? styles.select : {}]}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: scale(13),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RadioButton
                value="second"
                color="#a92226"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text style={styles.headtxt}>Try MyWheels Sell It For Me</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={styles.tinyLogo}
                source={require('images/download.png')}
              />
            </View>
            <View style={styles.markview}>
              <Icon name="check" size={20} color="green" />
              <Text style={styles.txt}>
                {' '}
                Dedicated Sales Expert to Sell your Car
              </Text>
            </View>
            <View style={styles.markview}>
              <Icon name="check" size={20} color="green" />
              <Text style={styles.txt}>
                {' '}
                We Bargain for you and share the Best Offer
              </Text>
            </View>
            <View style={styles.markview}>
              <Icon name="check" size={20} color="green" />
              <Text style={styles.txt}>
                {' '}
                We ensure Safe & Secure Transaction
              </Text>
            </View>
            <View style={styles.markview3}>
              <Text style={styles.txt}>
                initial payment of 2,000 will be charged for inspection at the
                time of on boarindg 1% of the car's selling price will be
                charged as comission once the car is sold
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          padding: scale(15),
          borderTopWidth: 0.3,
          borderColor: 'lightgray',
        }}>
        {/* <Button label='Continue' onPress={() => {isLoggedIn ? CheckSelect() : navigation.navigate('IsAuth')}}/> */}
        <Button label="Continue" onPress={() => CheckSelect()} />
      </View>
    </Container>
  );
};

export default SellOption;

const styles = StyleSheet.create({
  container: {marginHorizontal: scale(30), marginVertical: scale(10), flex: 1},
  box: {borderWidth: 0.5, borderRadius: scale(10)},
  inputicon: {color: 'red'},
  txt: {color: '#000', fontWeight: 'bold', fontSize: 11, textAlign: 'center'},
  markview: {alignItems: 'center', marginLeft: scale(25), flexDirection: 'row'},
  markview3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(15),
    backgroundColor: 'lightgray',
    marginTop: scale(15),
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  headtxt: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: scale(0),
  },
  tinyLogo: {
    width: scale(120),
    height: scale(100),
  },
  select: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
});
