import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, messageType }) => {
  if (!message) {
    return null;
  }
  return <div className={messageType}>{message}</div>;
};

export default Notification;

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};
