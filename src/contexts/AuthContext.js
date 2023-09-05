import React, {createContext, useReducer, useMemo} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const initialState = Object.freeze({
  isLoggedIn: false,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      return { isLoggedIn: true };
    }
    case 'SIGN_OUT': {
      return { isLoggedIn: false };
    }
    default:
      return initialState;
  }
};

const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);
  
  async function checkAuth() {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token && token != "") {
        console.log('Token Exist');
        dispatch({ type: 'SIGN_IN' })
      }
      else {
        dispatch({ type: 'SIGN_OUT' })
      }
    } catch (error) {
      dispatch({ type: 'SIGN_OUT' })
    }
  }
  
  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      checkAuth();
      console.log('application start')
    }
    return () => { isMounted = false; }
  }, [])

  const contextValue = useMemo(() => (
    { auth, dispatch }
  ), [auth, dispatch]);


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
