import { makeParametersList, request } from "./base/HTTPReservationApi";
import HttpMethod from "../constants/HttpMethod";

export const getAllAccommodationSlots = async (id: number) => {
  return await request(`/availability-slot/accommodation/${id}`);
};

export const addAccommodationSlot = async (payload: any) => {
  return await request("/availability-slot", payload, HttpMethod.POST);
}

export const updateAccommodationSlot = async (payload: any) => {
  return await request("/availability-slot", payload, HttpMethod.PUT);
}