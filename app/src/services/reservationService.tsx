import { makeParametersList, request } from "./base/HTTPReservationApi";
import HttpMethod from "../constants/HttpMethod";

export const getAllAccommodationSlots = async (id: number) => {
  return request(`/availability-slot/accommodation/${id}`);
};

export function addAccommodationSlot(payload: any) {
  return request("/availability-slot", payload, HttpMethod.POST);
}

export function updateAccommodationSlot(payload: any) {
  return request("/availability-slot", payload, HttpMethod.PUT);
}