import { useContext, useEffect, useState } from "react";
import NotificationComponenet from "../../components/Notification";
import "./index.scss";
import Switch from "@mui/material/Switch";
import AuthContext from "../../context/AuthContext";
import Button from "@mui/material/Button";

import {
  findGuestConfig,
  findHostConfig,
  findNotificationByUserId,
  updateGuestConfig,
  updateHostConfig,
} from "../../services/notificationService";
import {
  SuccesMessage,
  WarningMessage,
} from "../../utils/toastService/toastService";
const NotificationListPage = () => {
  const context = useContext(AuthContext);
  const [reservationAnswer, setReservationAnswer] = useState();
  const [newReservation, setNewReservation] = useState();
  const [cancelReservation, setCancelReservation] = useState();
  const [newRate, setNewRate] = useState();
  const [newRateAcc, setNewRateAcc] = useState();
  const [isHighlighted, setIsHighlighted] = useState();
  const [notifications, setNotifications] = useState();

  const fetchNotification = async () => {
    let res;
    res = await findNotificationByUserId(+context.user.id);
    if (!res || !res.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    setNotifications((res.data as any).reverse());
  };
  const fetchConfig = async () => {
    let response;
    if (context.user.role === "HOST")
      response = await findHostConfig(+context.user.id);
    else response = await findGuestConfig(+context.user.id);

    if (!response || !response.data) {
      WarningMessage("Something went wrong.");
      return;
    }
    if (context.user.role === "HOST") {
      setNewReservation(response.data.newReservation);
      setCancelReservation(response.data.cancelReservation);
      setNewRate(response.data.newRate);
      setNewRateAcc(response.data.newRateAcc);
      setIsHighlighted(response.data.isHighlighted);
    } else {
      setReservationAnswer(response.data.reservationAnswer);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchNotification();
  }, [context.user]);

  const updateConfig = () => {
    if (context.user.role === "HOST") {
      const dto = {
        userId: context.user.id,
        newReservation,
        cancelReservation,
        newRate,
        newRateAcc,
        isHighlighted,
      };
      updateHostConfig(dto);
      SuccesMessage("Configuration successfully updated.");
    } else {
      const dto = {
        userId: context.user.id,
        reservationAnswer,
      };
      updateGuestConfig(dto);
    }
  };
  const getSwitchs = () => {
    let retVal = [];
    if (context.user.role === "HOST") {
      retVal.push(
        <>
          <div>
            <label>New Reservation</label>
            <Switch
              checked={newReservation}
              onChange={(e) => {
                setNewReservation(e.target.checked as any);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            <label>Cancel Reservation</label>
            <Switch
              checked={cancelReservation}
              onChange={(e) => {
                setCancelReservation(e.target.checked as any);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            <label>New Rate</label>
            <Switch
              checked={newRate}
              onChange={(e) => {
                setNewRate(e.target.checked as any);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            <label>New Rate Accommodation</label>
            <Switch
              checked={newRateAcc}
              onChange={(e) => {
                setNewRateAcc(e.target.checked as any);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            <label>Highlighted</label>
            <Switch
              checked={isHighlighted}
              onChange={(e) => {
                setIsHighlighted(e.target.checked as any);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </>
      );
    } else {
      retVal.push(
        <div>
          <label>Reservation Answer</label>
          <Switch
            checked={reservationAnswer}
            onChange={(e) => {
              setReservationAnswer(e.target.checked as any);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      );
    }
    retVal.push(
      <Button variant="contained" onClick={updateConfig}>
        Save
      </Button>
    );
    return retVal;
  };

  const getNotifications = () => {
    let retVal = [];
    if ((notifications as any).length == 0) {
      retVal.push(<div>You don't have notification yet.</div>);
      return retVal;
    }
    for (let not of notifications as any) {
      let tit;
      let back;
      not.isSeen ? (tit = "   ") : (tit = "New");
      not.isSeen
        ? (back = "rgb(240, 240, 240)")
        : (back = "rgb(250, 250, 250)");
      retVal.push(
        <NotificationComponenet
          id={not._id}
          title={tit}
          msg={not.message}
          dateTime={not.dateTime}
          key={Math.random()}
          background={back}
        />
      );
    }
    return retVal;
  };
  return (
    <div className="notifications-page">
      <div className="notifications-page__card">
        <div className="notifications-page__card--title">My inbox</div>
        <div className="notifications-page__card__config">
          <div className="notifications-page__card__config--list">
            {getSwitchs()}
          </div>
        </div>
        <div className="notifications-page__card__content">
          {notifications && getNotifications()}
        </div>
      </div>
    </div>
  );
};

export default NotificationListPage;
