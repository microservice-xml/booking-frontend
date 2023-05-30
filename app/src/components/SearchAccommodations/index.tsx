import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {
  makeReservation,
  makeReservationAuto,
} from "../../services/reservationService";
import { SuccesMessage } from "../../utils/toastService/toastService";

const SearchAccommodations = () => {
  const location = useLocation();
  const contex = useContext(AuthContext);
  const navigate = useNavigate();

  const makeRes = async (
    obj: any,
    accId: number,
    auto: boolean,
    hostId: number
  ) => {
    const payload = {
      start: obj.start,
      end: obj.end,
      nog: obj.guestCount,
      accId: accId,
      userId: contex.user.id,
      hostId: hostId,
    };
    if (auto === true) {
      let res = await makeReservationAuto(payload);
      if (!res || !res.data) return;
      SuccesMessage(res.data);
      navigate("/");
    } else {
      let res = await makeReservation(payload);
      if (!res || !res.data) return;
      SuccesMessage(res.data);
      navigate("/");
    }
  };
  return (
    <div className="search-accommodations">
      {location.state.accommodations && (
        <>
          <h2>Search results: </h2>
          {location.state.accommodations.map((a: any) => {
            return (
              <div className="search-accommodations__slot-card">
                <p>City: {a.location}</p>
                <p>Name: {a.name}</p>
                <p>
                  Allowed guests: {a.minGuests} - {a.maxGuests}
                </p>
                <Button
                  id="reservation-button"
                  onClick={() =>
                    makeRes(location.state, a.id, a.auto, a.userId)
                  }
                >
                  Make a reservation
                </Button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchAccommodations;
