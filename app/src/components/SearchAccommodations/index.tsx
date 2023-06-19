import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { Button, Checkbox, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import {
  makeReservation,
  makeReservationAuto,
} from "../../services/reservationService";
import { SuccesMessage } from "../../utils/toastService/toastService";
import { getAllRegisteredUsers } from "../../services/userService";

const SearchAccommodations = () => {
  const location = useLocation();
  const contex = useContext(AuthContext);
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [facilities, setFacilities] = useState("");
  const [hasToBeSpecialHost, setHasToBeSpecialHost] = useState(false);
  const [displayedAccommodations, setDisplayedAccommodations] = useState([]);

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
      //navigate("/");
    }
  };

  const filter = async () => {
    let filtered = displayedAccommodations;
    if (minPrice) {
      filtered = filtered.filter((a: any) => a.price > minPrice);
    }
    if (maxPrice) {
      filtered = filtered.filter((a: any) => a.price < maxPrice);
    }
    if (facilities) {
      const help = facilities.split(',');
      filtered = filtered.filter((a: any) => {
        for (let i = 0; i < help.length; i++) {
          const help2 = help[i].trim();
          if (!a.facilities.toLowerCase().includes(help2.toLowerCase())) return false;
        }
        return true;
      });
    }
    if (hasToBeSpecialHost) {
      filtered = filtered.filter((a: any) => a.isHostHighlighted);
    }
    setDisplayedAccommodations(filtered);
  };

  useEffect(() => {
    aggregateAccommodationWithUser();
  }, []);

  const aggregateAccommodationWithUser = async () => {
    const res = await getAllRegisteredUsers();
    const users = await res.data;
    let help = location.state.accommodations;
    help = help.map((h: any) => {
      let host;
      users.forEach((u: any) => {
        if (u.id === h.userId) host = u;
      });
      return { ...h, isHostHighlighted: (host as any).highlighted };
    });
    setDisplayedAccommodations(help);
  };

  return (
    <div className="search-accommodations">
      <div className="search-accommodations-left">
        <TextField
          id="minPrice"
          label="Minimum price per night"
          value={minPrice}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMinPrice(event.target.value);
          }}
        />
        <TextField
          id="maxPrice"
          label="Maximum price per night"
          value={maxPrice}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMaxPrice(event.target.value);
          }}
        />
        <TextField
          id="facilities"
          label="Facilities"
          value={facilities}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFacilities(event.target.value);
          }}
        />
        <Checkbox
          checked={hasToBeSpecialHost}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setHasToBeSpecialHost(event.target.checked);
          }}
        />
        <Button
          id="reservation-button"
          onClick={filter}
        >
          Filter accommodations
        </Button>
      </div>
      <div className="search-accommodations-right">
      {displayedAccommodations && (
        <>
          <h2>Search results: </h2>
          {displayedAccommodations.map((a: any) => {
            return (
              <div className="search-accommodations-right__slot-card">
                <div className="slot-card__header">
                  {a.name}
                </div>
                <div className="slot-card__location">
                  {a.location}
                </div>
                <div className="slot-card__data">Price per night: {a.price}</div>
                <div className="slot-card__data">
                  Allowed guests: {a.minGuests} - {a.maxGuests}
                </div>
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
    </div>
  );
};

export default SearchAccommodations;
