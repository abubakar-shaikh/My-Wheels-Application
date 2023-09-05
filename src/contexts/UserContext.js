import React,{useState,createContext} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [brands,setBrands] = useState(0)
  const [userid,setUserid] = useState(0)
  const [location,setLocation] = useState('')
  const [browseCar, setBrowseCar] = useState('')
  const [active, setactive] = useState('')
  const [pending, setpending] = useState('')
  const [remove, setremove] = useState('')
  const [show, setshow] = useState(true)
  const [row,setRow] = useState()
    return (
        <UserContext.Provider value={{userid,setUserid,brands,setBrands,location,setLocation,row,setRow,browseCar,setBrowseCar,remove, setremove,pending, setpending,active, setactive,show, setshow}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;