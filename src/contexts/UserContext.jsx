import { useState } from 'react';
import { createContext } from 'react';


const UserContext = createContext();

const getUserFromToken= () =>{
  //first pull the raw token in local storage
      const token = localStorage.getItem("token");
      
      //if there is not token the user is not signed in
      if (!token) return null;
      
      
      
      //then extract the payload
      const payload = token.split(".")[1];

      //convert the specialize dpayload into JSON
      const tokenJson = atob(payload);

      //take that josn and convert it back into json
      return JSON.parse(tokenJson).payload;
}

function UserProvider({ children }) {
    const [user,setUser] = useState(getUserFromToken);

    const value = { user, setUser};
    
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext};
