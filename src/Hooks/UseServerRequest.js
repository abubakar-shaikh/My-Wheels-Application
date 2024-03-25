/* eslint-disable eqeqeq */
import Toast from 'react-native-toast-message';
import {baseUrl} from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UseServerRequest = () => {
  // const GetRequest = async path => {
  //   let userData = await GetUser();
  //   try {
  //     const result = await fetch(baseUrl + path, {
  //       headers: {
  //         Authorization: `Bearer ${
  //           (userData && JSON.parse(userData)?.token) || ''
  //         }`,
  //       },
  //     });
  //     const finalResult = await result.json();
  //     return finalResult;
  //   } catch (err) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: err?.message || 'Something went wrong',
  //     });
  //   }
  // };

  const PostRequest = async (path, body, requestType) => {
    const token = await AsyncStorage.getItem('@auth_token');

    try {
      const result = await fetch(baseUrl + path, {
        method: 'Post',
        body: body,
        headers:
          requestType == 0
            ? {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${(token && token) || ''}`,
              }
            : {
                Authorization: `Bearer ${(token && token) || ''}`,
              },
      });
      const finalResult = await result.json();
      return finalResult;
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err?.message || 'Something went wrong',
      });
    }
  };

  // const PatchRequest = async (path, body, requestType) => {
  //   let userData = await GetUser();

  //   try {
  //     const result = await fetch(baseUrl + path, {
  //       method: 'Patch',
  //       body: body,
  //       headers:
  //         requestType == 0
  //           ? {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${
  //                 userData && JSON.parse(userData)?.token
  //               }`,
  //             }
  //           : userData &&
  //             JSON.parse(userData)?.token && {
  //               Authorization: `Bearer ${
  //                 userData && JSON.parse(userData)?.token
  //               }`,
  //             },
  //     });
  //     const finalResult = await result.json();
  //     return finalResult;
  //   } catch (err) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: err?.message || 'Something went wrong',
  //     });
  //   }
  // };

  // const DeleteRequest = async (path, body) => {
  //   let userData = await GetUser();

  //   try {
  //     const result = await fetch(baseUrl + path, {
  //       method: 'delete',
  //       headers: {
  //         Authorization: `Bearer ${userData && JSON.parse(userData)?.token}`,
  //       },
  //     });
  //     const finalResult = await result.json();
  //     return finalResult;
  //   } catch (err) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: err?.message || 'Something went wrong',
  //     });
  //   }
  // };

  return {PostRequest};
  // return {GetRequest, PostRequest, PatchRequest, DeleteRequest};
};

export default UseServerRequest;
