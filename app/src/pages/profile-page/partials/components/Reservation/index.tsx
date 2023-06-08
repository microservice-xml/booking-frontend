import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";
import { cancelReservation } from "../../../../../services/reservationService";
import { SuccesMessage, WarningMessage } from "../../../../../utils/toastService/toastService";

type Props = {
  name: string;
  address: string;
  startDate: string;
  endDate: string;
  id: string;
  numberOfGuests: number;
};

function ReservationCard(props: Props) {
  const navigate = useNavigate();

  const navigateToAirline = () => {
    const reservationDetails = {
      startDate: props.startDate,
      endDate: props.endDate,
      numberOfGuests: props.numberOfGuests,
    };
    navigate("/book-airline", { state: reservationDetails });
  };

  const submitHandler = async () => {
    let res = await cancelReservation(props.id);

    if (!res || !res.data) {
      WarningMessage("You cannot cancel reservation one day before");
      return;
    }

    if (res.data.includes("can't")) {
      WarningMessage("You cannot cancel reservation one day before");
      return;
    }

    SuccesMessage("Successfully canceled.");
    window.location.reload();
  };

  return (
    <div className={classes["reservation"]}>
      <div className={classes["reservation__header"]}>
        <div className={classes["reservation__header-name"]}>{props.name}</div>
        <div className={classes["reservation__header-location"]}>
          {props.address}
        </div>
      </div>
      <div className={classes["reservation__date"]}>
        {props.startDate}-{props.endDate}
      </div>
      <div className={classes["reservation__cancel"]} onClick={submitHandler}>
        <img src={"/icons/delete.svg"} alt={"My SVG"} className={classes["svg"]} />
      </div>
      <button className={classes["book__airline"]} onClick={navigateToAirline}>
        Book airline!
      </button>
    </div>
  );
}

export default ReservationCard;
