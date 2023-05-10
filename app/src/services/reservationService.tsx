import { makeParametersList, request } from "./base/HTTPReservationApi";
import HttpMethod from "../constants/HttpMethod";


export const getAllAccommodationSlots = async (id: number) => {
  return request(`/availability-slot/accommodation/${id}`);
};