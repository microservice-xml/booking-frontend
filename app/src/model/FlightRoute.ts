import City from "./City";

export default interface Section {
  arrival: Date;
  departure: Date;
  arrivalCity: City;
  departureCity: City;
}
