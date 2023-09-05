import { I18nManager } from 'react-native';
import Toast from 'react-native-toast-message';

let text = ''

export const OnlyAlphabets = (value) =>{
    let val = value;
    const reg = /^[A-Za-z ]+$/;

    if(val.trim().length > 0 || val.length > 0){
        if(!reg.test(val)){
            text = val
            return true
        }
        else{
            text = val
            return false
        }
    }
}


export const EmailValidation = (value) =>{
    let val = value;
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(val)){
        return true
    }
    else{
        return false
    }
}


export const NumberValidation = (value) =>{
    let val = value;
    const reg = /^[0-9]+$/;

    if(val.trim().length > 0){
        if(reg.test(val)){
            return true
        }
        else{
            return false
        }
    }
    else
    {
        return false
    }
}


export const PasswordValidation = (value) =>{
    let val = value;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(val.trim().length > 0){
        if(val.trim().length >= 8 && passReg.test(val.trim()))
        {
            return true
        }
        else{
            return false
        }
    }
    else{
        return null
    }
}

export const MobileNumberValidation = (fldName,fldValue) =>{
    let val = fldValue;
    const numReg = /^.{8,13}$/

    if(numReg.test(val.trim()))
    {
        return true
    }
    else{
        // Toast.show({
        //     type: 'error',
        //     text1:  I18nManager.isRTL ? 'خطأ' : 'Error',
        //     text2:  I18nManager.isRTL ? `${fldName} يجب أن يكون بين 8 إلى 13 رقمًا` : `${fldName} should be between 8 to 13 digits`
        // })
    }
}


export const Required = (fldName,fldValue,position) =>{
    console.log({fldName,fldValue,position});
    if(fldValue.trim() === '' || fldValue === ''){
        Toast.show({
            type:'error',
            text1:I18nManager?.isRTL ? "خطأ" : 'Error',
            text2:`${fldName} ${I18nManager?.isRTL ? "مطلوب" :'Required'}`,
            position:position
          })
    }
    else{
        return true
    }
}



