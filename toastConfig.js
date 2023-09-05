import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {BaseToast,ErrorToast} from 'react-native-toast-message';
import { errorColor, primaryColor1 } from './src/utils/Theme';
import { I18nManager, Platform } from 'react-native';

const toastConfig = {

    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderWidth:1, borderColor:primaryColor1, borderLeftWidth:4, borderLeftColor:primaryColor1}}
        contentContainerStyle={{ paddingHorizontal: wp(5) }}
        text1Style={{
          fontSize:Platform.OS == 'ios' && I18nManager.isRTL ? wp(3) : wp(4),
          color:primaryColor1,
          fontFamily:'Lato-Bold',
        }}
        text2Style={{
          fontSize:Platform.OS == 'ios' && I18nManager.isRTL ? wp(2) : wp(3),
          fontFamily:'Lato-Regular'
        }}
        text2NumberOfLines={3}
      />
    ),
    error: (props) => (
      // console.log(props)
      <ErrorToast
        {...props}
        style={{ borderWidth:1, borderColor:errorColor, borderLeftWidth:4, borderLeftColor:errorColor}}
        contentContainerStyle={{ paddingHorizontal: wp(5) }}
        text1Style={{
            fontSize:Platform.OS == 'ios' && I18nManager.isRTL ? wp(3) : wp(4),
            fontFamily:'Lato-Bold',
            color:errorColor,
            textAlign:Platform.OS == 'ios' && I18nManager.isRTL ? 'left' : 'left'
        }}
        // text1={I18nManager?.isRTL ? 'خطأ':'Error'}
        text2Style={{
            fontSize:Platform.OS == 'ios' && I18nManager.isRTL ? wp(2) : wp(3),
            fontFamily:'Lato-Regular',
            textAlign:Platform.OS == 'ios' && I18nManager.isRTL ? 'left' : 'left'
        }}
        // text2={props?.text2}
        text2NumberOfLines={3}
      />
    )
};

export default toastConfig