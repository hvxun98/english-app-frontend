import React, { createContext, useState } from "react";

export const HvxContext = createContext();

export const HvxContextProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  return (
    <HvxContext.Provider value={{ notification, setNotification }}>
      {children}
    </HvxContext.Provider>
  );
};
