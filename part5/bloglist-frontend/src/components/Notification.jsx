import React from "react";

const Notification = ({ message }) => {
  return (
    <>
      {message && (
        <div className={message.isError ? "error" : "message"}>
          {message.content}
        </div>
      )}
    </>
  );
};

export default Notification;
