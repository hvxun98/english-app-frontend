import React, { createContext, useState } from "react";

export const HvxContext = createContext();

const HvxContextProvider = ({ children }) => {

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const notificationContextData = {
    notification,
    setNotification,
  };
  return (
    <HvxContext.Provider value={notificationContextData}>
      {children}
    </HvxContext.Provider>
  );
};

export default HvxContextProvider;
