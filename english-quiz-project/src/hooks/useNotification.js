import { useContext, useEffect, useState } from "react";
import { HvxContext } from "../contexts";

export const useNotification = () => {
  const { setNotificat } = useContext(HvxContext);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setNotificat(notification)
  }, [setNotificat, notification]);

  return { notification, setNotification };
};
