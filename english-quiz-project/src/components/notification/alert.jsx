import React, { useContext, useEffect, useState } from "react";
import { HvxContext } from "../../contexts";
import "./style.scss";

const Notification = () => {
  const { notification } = useContext(HvxContext);
  const [showAlert, setShowAlert] = useState(notification.show);
  console.log(notification);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [showAlert, notification]);

  return (
    <div>
      {showAlert ? (
        <div
          className={`alert animate__animated animate__bounceInRight ${notification.type}`}
        >
          <span className="text">{notification.message}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notification;
