import React,{useState,useEffect} from 'react';
import {Container,NavBar,Text} from 'components';
import { View, StyleSheet,ImageBackground,useWindowDimensions,ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';
import baseUrl from '../../../../assets/common/baseUrl';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/EvilIcons';

const BlogDetails = ({navigation,route}) => {
    const {item} = route.params;
    const { width } = useWindowDimensions();
   const [BlogDetails, setBlogDetails] = useState([])

   useEffect(()=>{
        axios
        .get(`${baseUrl}blogById_api/${item.id}`)
        .then((res)=>{
            var Covertobject = JSON.parse(res.data.Data[0].description)
            setBlogDetails(Object.values(Covertobject)) 
        })
        .catch((error)=>{
          console.log(error)
        })
  },[])

  
const source = {
    html: `${BlogDetails}`
  };

  return (
    <Container>
     <NavBar
       title="Blogs"
       onLeftIconPress={() => navigation.goBack()}
       />
       <ScrollView>
       <View style={styles.container}>
         <View style={styles.imageContainer}>
           <ImageBackground
             source={{uri:`${baseUrl}uploads/images/${item.featured_img}`}}
             style={styles.bg}
           />
         </View>
          <Text font='h2' weight="medium" color="tertiary"
           style={{paddingBottom:scale(5),fontWeight:'bold'}}>{Object.values(item.title)[0]}</Text>
        <View style={styles.info}>
          <Icon name='calendar' size={30} color='blue'/>
          <Text color="gray50" weight="medium" font="h4">{item.create_time}</Text>
        </View>
      <RenderHtml
        contentWidth={width}
        source={source}
      />
      </View>
     
     </ScrollView>
    </Container>    
  )
}

export default BlogDetails

const styles = StyleSheet.create({
    container: {
        marginVertical: scale(10),
        marginHorizontal: scale(10),
      },
      imageContainer: {
        aspectRatio: 2 / 1,
        overflow: 'hidden',
        borderRadius:scale(5)
      },
      info: {
        flex: 1,
        flexDirection:'row'
      },
      bg: {
        flex: 1,
        alignItems:'center'
      },
})