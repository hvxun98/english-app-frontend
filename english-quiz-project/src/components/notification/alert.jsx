import React, { useEffect, useState } from "react";
import { Alert } from "antd";

const Notification = ({ message, type, description, show }) => {
  const [showAlert, setShowAlert] = useState(show);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 2000);
    }
  }, [showAlert]);

  const onClose = (e) => {
    console.log(e, "I was closed.");
  };
  return showAlert ? (
    <Alert
      message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
      type="warning"
      closable
      onClose={onClose}
    />
  ) : null;
};

export default Notification;
