import React, { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settingForm, setSettingForm] = React.useState({category:"",difficulty:"",type:"",value:0})
  const [score, setScore] = React.useState(0) 

  return (
    <AppContext.Provider 
      value={{
        settingForm, setSettingForm, score, setScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => React.useContext(AppContext);