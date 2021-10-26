import React from "react";

const UserRateItem = ({ idx, avatar, name, point }) => {
  return (
    <div className="user-item">
      <div className="user-item-left">
        <span>{idx}</span>
      </div>
      <div className="user-item-right">
        <img
          className="user-item-avt"
          src={avatar || "http://placehold.it/30x30"}
          alt="user-avt"
        />
        <span className="user-item-name">{name?.username}</span>
      </div>

      <div className="point">
        <span>{point}</span>
      </div>
    </div>
  );
};

export default UserRateItem;
