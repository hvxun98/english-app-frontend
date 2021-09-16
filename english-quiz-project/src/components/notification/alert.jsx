import React, { useEffect, useState } from "react";
import { Alert } from "antd";

const Notification = ({ notification }) => {
  const [showAlert, setShowAlert] = useState(notification.show);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 2000);
    }
  }, [showAlert]);

  return showAlert ? (
    <Alert
      message={notification.message}
      type={notification.type}
      closable
      showIcon
    />
  ) : (
    ""
  );
};

export default Notification;
