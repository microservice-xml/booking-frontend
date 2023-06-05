import { useNavigate } from "react-router-dom";
import "./index.scss";

interface Notification {
  id: string;
  title: string;
  msg: string;
  dateTime: string;
  background?: string;
}
const NotificationComponenet: React.FC<Notification> = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="notification-container"
      onClick={() => navigate("/notification/" + props.id, { state: props.id })}
    >
      <div
        className="notification-container__content"
        style={{ background: props.background }}
      >
        <div className="notification-container__content--title">
          {props.title}
        </div>
        <div className="notification-container__content--message">
          {props.msg}
        </div>
        <div className="notification-container__content--date">
          {props.dateTime.split("2023")[0]}
        </div>
      </div>
    </div>
  );
};

export default NotificationComponenet;
