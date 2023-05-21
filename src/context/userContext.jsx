import { useState, createContext } from "react";

export const UserContext = createContext({
  user: "",
  setUser: () => {},
});
const UserContextProvider = ({ children }) => {
  const [user, setCurrentUser] = useState("");
  const setUser = (username) => {
   return setCurrentUser(username);
  };
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
      ;
    </>
  );
};

export default UserContextProvider;
