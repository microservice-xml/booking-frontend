import { useForm } from "react-hook-form";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import FormButton from "../FormComponents/Button";
import { Button } from "@mui/material";

const reservations = [
  {
    start: "15-06-2023",
    end: "20-06-2023",
    numberOfGuests: 10,
    status: "PENDING",
    penalties: 2,
  },
  {
    start: "12-05-2023",
    end: "10-02-2023",
    numberOfGuests: 5,
    status: "PENDING",
    penalties: 0,
  },
  {
    start: "11-06-2023",
    end: "21-06-2023",
    numberOfGuests: 3,
    status: "PENDING",
    penalties: 1,
  },
];

const PendingReservation = () => {
  const form = useForm();
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const {
    setValue,
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (dto: any) => {
    console.log("zdravo");
  };
  const getRow = () => {
    let result = [];
    result.push(
      <div className="reservations__list__card">
        <div>Guests</div>
        <div>Start date</div>
        <div>End date</div>
        <div>Status</div>
        <div>Penalties</div>
      </div>
    );
    for (let item of reservations) {
      result.push(
        <div className="reservations__list__card">
          <div>{item.numberOfGuests}</div>
          <div>{item.start}</div>
          <div>{item.end}</div>
          <div>{item.status}</div>
          <div>{item.penalties}</div>
          <div className="reservations__list__card--button">
            <Button id="accept-button">Accept</Button>
          </div>
          <div>
            <Button id="reject-button">Reject</Button>
          </div>
        </div>
      );
    }
    return result;
  };
  return (
    <div className="reservations__list">
      <div className="reservations__list__cards">{getRow()}</div>
    </div>
  );
};

export default PendingReservation;
