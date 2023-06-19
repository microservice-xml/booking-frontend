import React, { useContext } from "react";
import { useEffect, useState } from "react";
import SearchResult from "../../components/SearchResult";
import TicketCard from "../../components/TicketCard";
import "./index.scss";
import { useLocation } from "react-router-dom";

import SearchItem from "../../model/SearchResult";
import SearchComponent from "../../components/SearchComponent";
import { checkEmail, searchFlights } from "../../services/searchFlightService";
import AuthContext from "../../context/AuthContext";
import { getById } from "../../services/userService";


const ChooseFlight = () => {
  const location = useLocation();
  const context = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showSearchBar, setShowSearchBar] = useState<Boolean>(false);
  const [haveEmailOnAirline, setHaveEmailOnAirline] = useState<Boolean>(false);

  const data = location.state?.data;

  useEffect(() => {
    fetchData();
    checkUserEmail();
  }, [data]);

  const fetchData = async () => {
    let response = await searchFlights(data);
    setSearchResults(response.data as SearchItem[]);
  };
  const changeState = () => {
    setShowSearchBar((prev) => !prev);
  };

  const checkUserEmail = async () => {
    let user = await getById(context.user?.id as any);
    let response = await checkEmail(user.data.email);
    if (response && response.data) {
      setHaveEmailOnAirline(true);
      console.log(haveEmailOnAirline);
    }
  }

  const renderTickets = () => {
    let result = [];

    if (!searchResults || searchResults.length === 0) {
      return (
        <div className="noFlights-container">
          <div className="noFlights-container__text">
            Sorry, there are no flights available for your input.
          </div>
          <div className="noFlights-container__image"></div>
        </div>
      );
    }

    for (let item of searchResults) {
      result.push(
        <TicketCard
          key={item.id}
          arrivalCity={item.route.arrivalCity}
          departureCity={item.route.departureCity}
          arrival={item.route.arrival}
          departure={item.route.departure}
          ticketPrice={item.ticketPrice}
          dataSeats={data.desiredSeats}
          flightId={item.id}
          canPurchase={true}
          availableSeats={item.availableSeats}
          isEmail={haveEmailOnAirline}
        />
      );
    }
    return result;
  };

  return (
    <div className="flights-container">
      <div className="flights-container__search-result">
        <SearchResult
          arrivalCity={data.arrivalCity}
          departureCity={data.departureCity}
          arrival={data.arrival}
          departure={data.departure}
          changeState={changeState}
        ></SearchResult>
      </div>
      {showSearchBar && (
        <div className="flights-container__search-component">
          <SearchComponent />
        </div>
      )}
      <div className="flights-container__card">{renderTickets()}</div>
    </div>
  );
};

export default ChooseFlight;
