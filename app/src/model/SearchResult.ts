import FlightRoute from "./FlightRoute"

export default interface SearchItem {
  id: string;
  route: FlightRoute;
  ticketPrice: number;
  desiredSeats: number;
  availableSeats: number;
}
