import React, {useState, useEffect} from 'react';
import {Container, NavBar, Text, Noresult} from 'components';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {getScreenWidth} from 'utils/size';
import {baseUrl, imageUrl} from '../../../../assets/common/baseUrl';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';
import {BallIndicator} from 'react-native-indicators';
// import BlogData from 'mocks/BlogData';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Skeleton} from '@rneui/themed';

const Blog = ({navigation}) => {
  const [BlogData, setBlogData] = useState([]);
  const [show, setShow] = useState(true);

  //  const [isLoading, setisLoading] = useState(false)
  //  const [pageCurrent, setpageCurrent] = useState(1)

  //  useEffect(() => {
  //   setisLoading(true)
  //   getData()
  //   return() =>{

  //   }
  //  }, [pageCurrent])

  // const getData = async () =>{
  //   const apiUrl = "https://mywheelsui.adigitalxpress.com/blog_api" + pageCurrent
  //   // axios
  //   .get(apiUrl)
  //   .then((res)=>{
  //     setBlogData(BlogData.concat(res.data.Data))
  //     setisLoading(false)
  //     // setBlogData(res.data.Data)
  //     console.log('Blogs data successfull',res.data.Data)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  //   console.log('getData')
  //     fetch(apiUrl)
  //     .then((response) =>{
  //       // setBlogData(BlogData.concat(res.data.Data[0]))
  //       console.log('agegege',response.data.Data)
  //       setisLoading(false)
  //     }).catch((error)=>{
  //         console.log(error)
  //     })
  //  }

  //   const getData = async () => {
  //     try {
  //       const response = await fetch('https://mywheelsui.adigitalxpress.com/blog_api');
  //       const json = await response.json();
  //       //  setData(json.movies);
  //       console.log('dshdshsd',json.Data);
  //       setBlogData(BlogData.concat(json.Data))
  //       } catch (error) {
  //         console.error('cathc',error);
  //         }
  //       }

  // useEffect(() => {
  //   const apiUrl = "https://mywheelsui.adigitalxpress.com/blog_api" + pageCurrent
  //     axios
  //       .get(apiUrl)
  //       .then((res)=>{
  //         setBlogData(BlogData.concat(res.data.Data))
  //         setisLoading(false)
  //         // setBlogData(res.data.Data)
  //                console.log('Blogs data successfull',res.data.Data)
  //       })
  //       .catch((error)=>{
  //         console.log(error)
  //       })
  // },[])
  // getMovies()

  // const renderFooter = () => {
  //     return(
  //       isLoading ?
  //         <View>
  //         <ActivityIndicator size='large'/>
  //         </View>
  //         : null
  //     )
  //    }

  //   const handleLoadMore = () => {
  //     console.log('handleLoadMore')
  //     setpageCurrent(pageCurrent + 1)
  //     setisLoading(true)
  //    }

  useEffect(() => {
    axios
      .get(`${baseUrl}blog_api`)
      .then(res => {
        setShow(false);
        setBlogData(res.data.Data);
        console.log('Blogs data successfull');
      })
      .catch(error => {
        setShow(false);
        console.log(error);
      });
  }, []);

  setTimeout(() => {
    setShow(false);
  }, 3000);

  console.log(show);
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
      <NavBar title="Blogs" onLeftIconPress={() => navigation.goBack()} />

      {show == false && BlogData == '' && <Noresult />}
      <BlogSkeleton />
      {/* {show ? (
        <BallIndicator color="red" animationDuration={1200} animating={show} />
      ) : (
        <FlatList
          data={BlogData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate('BlogDetails', {item})}>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={{
                      uri: `${imageUrl}uploads/images/${item.featured_img}`,
                    }}
                    style={styles.bg}
                  />
                </View>
                <View style={styles.info}>
                  <Text
                    numberOfLines={3}
                    font="h3"
                    weight="medium"
                    color="tertiary"
                    style={{paddingBottom: scale(7), fontWeight: 'bold'}}>
                    {Object.values(item.title)[0]}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="calendar" size={25} color="blue" />
                    <Text color="gray50" weight="medium" font="h4">
                      {item.create_time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={renderFooter}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0}
        />
      )} */}
    </Container>
  );
};

export default Blog;
const BlogSkeleton = () => {
  return (
    <View>
      {[{}, {}, {}, {}, {}, {}, {}, {}].map(item => (
        <Skeleton style={styles.container}>
          <Skeleton style={styles.imageContainer} />

          <View style={styles.info}>
            <Skeleton height={heightPercentageToDP(4)} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Skeleton height={heightPercentageToDP(4)} />

              <Skeleton height={heightPercentageToDP(4)} />
            </View>
          </View>
        </Skeleton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: scale(10),
    marginHorizontal: scale(12),
  },
  imageContainer: {
    width: getScreenWidth() / 3.2,
    aspectRatio: 1 / 1,
    borderRadius: scale(8),
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
  bg: {
    flex: 1,
  },
});
