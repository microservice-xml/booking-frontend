import { useLocation } from "react-router-dom";
import FlipCard from "../../components/FlipCard";
import "./index.scss";
import { findById } from "../../services/notificationService";
import { WarningMessage } from "../../utils/toastService/toastService";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const NotificationPage = () => {
  const location = useLocation();
  const context = useContext(AuthContext);
  const id = location.state;
  const [data, setData] = useState();
  const fetchDate = async () => {
    let res;
    res = await findById(id);
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setData(res.data);
  };
  useEffect(() => {
    fetchDate();
  }, [context.user.id]);
  return (
    <div className="notification-page">
      <div className="notification-page__content">
        {data && (
          <FlipCard
            width="30vw"
            height="30vw"
            message={(data as any).message}
            dateTime={(data as any).dateTime.split("GMT")[0]}
            img="/inbox.png"
          />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
