import { useState, createContext } from "react";

export const UserContext = createContext({
  taskData: [],
  setData: () => {},
});
const UserContextProvider = ({ children }) => {
  const [taskData, setTasksData] = useState([]);
  const setData = (taskList) => {
   return setTasksData(taskList);
  };
  return (
    <>
      <UserContext.Provider value={{ taskData, setData}}>
        {children}
      </UserContext.Provider>
      ;
    </>
  );
};

export default UserContextProvider;
