import React, { useContext } from "react";
import "./index.scss";
import Moment from "react-moment";
import City from "../../model/City";
import AuthContext from "../../context/AuthContext";
import { purchaseTicket } from "../../services/tickets/ticketsService";
import {
  ErrorMessage,
  SuccesMessage,
} from "../../utils/toastService/toastService";
import { useNavigate } from "react-router-dom";

type Props = {
  arrivalCity: City;
  departureCity: City;
  arrival: Date;
  departure: Date;
  ticketPrice: number;
  dataSeats: number;
  flightId: string;
  canPurchase: boolean;
  availableSeats: number;
  isEmail: Boolean;
};

const TicketCard = ({
  arrivalCity,
  departureCity,
  arrival,
  departure,
  ticketPrice,
  dataSeats,
  flightId,
  canPurchase,
  availableSeats,
  isEmail
}: Props) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  let role = context.user.role;

  const getRandomNumber = () => {
    const i = Math.random() * 10;
    return i >= 1 && i <= 4;
  };

  const getRandomValue = () => {
    return Math.round(Math.random() * 100 * 0.5);
  };


  const sendPurchaseTicketsRequest = async () => {
    const purchaseTicketDto: any = {
      userId: context.user.id,
      flightId: flightId,
      payedPrice: ticketPrice,
      count: dataSeats,
    };
    console.log(purchaseTicketDto);
    const response = await purchaseTicket(purchaseTicketDto);
    if (!response || !response.ok) {
      ErrorMessage(
        "Please log in to access this feature. If you don't have an account yet, you can create one by clicking on the 'JOIN US' button. "
      );
      return;
    }
    SuccesMessage("Purchase successful!");
    navigate("/");
  };

  return (
    <div className="card">
      {canPurchase && getRandomNumber() && (
        <div className="card__top">
          <div className="card__top__icon"></div>
          <div className="card_top__field">
            <div className="card__top__field__title">Greener Choice</div>
            <div className="card__top__field__text">
              This flight emits {getRandomValue()}% less CO₂ than the average
              for your search
            </div>
          </div>
        </div>
      )}
      <div className="card__bottom">
        <div className="card__bottom__left">
          <div className="card__bottom__left__from">
            <div className="city">
              <div className="city__name">{departureCity.name}</div>
              <div className="city__airport">
                {departureCity.airport} ({departureCity.iata_code})
              </div>
            </div>
            <span className="time">
              <Moment format="hh:mm a" className="time">
                {departure}
              </Moment>
            </span>
          </div>
          <div className="card__bottom__left__icon">
            <div className="card__bottom__left__icon--icon"></div>
          </div>
          <div className="card__bottom__left__to">
            <div className="city">
              <div className="city__name">{arrivalCity.name}</div>
              <div className="city__airport">
                {arrivalCity.airport} ({arrivalCity.iata_code})
              </div>
            </div>
            <span className="time">
              <Moment
                format="hh:mm a"
                className="time"
                style={{ color: "#444444", fontWeight: "550" }}
              >
                {arrival}
              </Moment>
            </span>
          </div>
        </div>
        <div className="card__bottom__right">
          <div className="card__bottom__right__price">
            ${ticketPrice * dataSeats}
          </div>
          {canPurchase && (
            <>
              <div className="card__bottom__right__total-price">
                ${ticketPrice} per person
              </div>
              <div className="card__bottom__right--seats">
                <p className="card__bottom__right--seats-text">
                  {availableSeats}
                </p>
                <div className="card__bottom__right--seats-icon"></div>
              </div>
              <div className="card__bottom__right__button-position">
                {isEmail && (
                  <button
                    className="card__bottom__right__button-style"
                    onClick={sendPurchaseTicketsRequest}
                  >
                    Select
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
