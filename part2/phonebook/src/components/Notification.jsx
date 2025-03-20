const Notification = ({ message }) => {
  return <> {message && <div className="message">{message}</div>}</>;
};

export default Notification;
