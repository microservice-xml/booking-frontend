import { useForm } from "react-hook-form";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import FormButton from "../FormComponents/Button";
import { Button } from "@mui/material";
import {
  acceptReservationManual,
  findAllReservationByAccId,
  rejectReservation,
} from "../../services/reservationService";
import { SuccesMessage } from "../../utils/toastService/toastService";

const PendingReservation = (props: any) => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const { id } = useParams();

  const fetchReservations = async () => {
    const res = await findAllReservationByAccId(Number(id));
    if (!res || !res.data) return;
    setReservations(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, [id]);

  const accept = (id: string) => {
    acceptReservationManual(id);
    SuccesMessage("Accepeted.");
  };

  const reject = (id: string) => {
    rejectReservation(id);
    SuccesMessage("Rejected.");
  };

  const getRow = () => {
    let result = [];
    if (reservations.length === 0) {
      return (
        <div>You dont have reservation request for this accomodation.</div>
      );
    }
    for (let item of reservations) {
      result.push(
        <div className="reservations__list__card">
          <div>NoG: {(item as any).numberOfGuests}</div>
          <div>Start: {(item as any).start}</div>
          <div>End: {(item as any).end}</div>
          <div>{(item as any).status}</div>
          <div>Penalties: 0</div>
          <div className="reservations__list__card--button">
            <Button id="accept-button" onClick={() => accept((item as any).id)}>
              Accept
            </Button>
          </div>
          <div>
            <Button id="reject-button" onClick={() => reject((item as any).id)}>
              Reject
            </Button>
          </div>
        </div>
      );
    }
    return result;
  };
  return (
    <div className="reservations__list">
      <h1 className="reservations__list-title">Pending reservations</h1>
      <div className="reservations__list__cards">{getRow()}</div>
      <div className="reservations__list-desc">*NoG - Number of guests</div>
    </div>
  );
};

export default PendingReservation;
