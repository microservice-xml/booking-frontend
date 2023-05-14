import React, { useContext, useEffect, useState } from "react";
import classes from "./index.module.scss";
import LocationCard from "../../components/Location";
import AuthContext from "../../../../../context/AuthContext";
import { findAllAccommodationByUserId } from "../../../../../services/accommodationService";

function HostLocations() {
  const context = useContext(AuthContext);
  const [accommodations, setAccommodations] = useState([]);
  const id = +context.user.id;

  const fetchAccommodations = async () => {
    const res = await findAllAccommodationByUserId(id);
    if (!res || !res.data) return;
    console.log(res.data);
    setAccommodations(res.data);
  };

  useEffect(() => {
    fetchAccommodations();
  }, [id]);

  const getAccomodations = () => {
    let result = [];
    if (accommodations.length === 0) {
      return <div>You don't have accommodation yet.</div>;
    }
    for (let acc of accommodations) {
      result.push(
        <LocationCard
          name={(acc as any).name}
          address={(acc as any).location}
        />
      );
    }
    return result;
  };

  return (
    <div className={classes["reservation-list"]}>{getAccomodations()}</div>
  );
}

export default HostLocations;
