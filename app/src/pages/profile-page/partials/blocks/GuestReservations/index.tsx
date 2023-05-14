import React, { useContext, useEffect, useState } from "react";
import classes from "./index.module.scss";
import ReservationCard from "../../components/Reservation";
import AuthContext from "../../../../../context/AuthContext";
import { findAllReservationByUserId } from "../../../../../services/reservationService";

function GuestReservations() {
  const context = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const id = +context.user.id;
  const fetchReservations = async () => {
    const res = await findAllReservationByUserId(id);
    if (!res || !res.data) return;
    console.log(res.data);
    setReservations(res.data);
  };
  useEffect(() => {
    fetchReservations();
  }, [id]);

  const getReservations = () => {
    let result = [];
    let i = 1;
    for (let res of reservations) {
      result.push(
        <ReservationCard
          name={`Reservation ${i}`}
          address={`Guests: ${(res as any).numberOfGuests}, ${
            (res as any).status
          }`}
          startDate={(res as any).start}
          endDate={(res as any).end}
          id={(res as any).id}
        />
      );
      i++;
    }
    return result;
  };
  return <div className={classes["reservation-list"]}>{getReservations()}</div>;
}

export default GuestReservations;
function findAllReservationsByUserId(id: number) {
  throw new Error("Function not implemented.");
}
