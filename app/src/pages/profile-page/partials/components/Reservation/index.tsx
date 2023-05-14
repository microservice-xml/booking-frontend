import React from "react";
import classes from "./index.module.scss";
import { cancelReservation } from "../../../../../services/reservationService";

type Props = {
  name: string;
  address: string;
  startDate: string;
  endDate: string;
  id: string;
};

function ReservationCard(props: Props) {
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
      <div
        className={classes["reservation__cancel"]}
        onClick={() => {
          cancelReservation(props.id);
          window.location.reload();
        }}
      >
        <img
          src={"/icons/delete.svg"}
          alt={"My SVG"}
          className={classes["svg"]}
        />
      </div>
    </div>
  );
}

export default ReservationCard;
