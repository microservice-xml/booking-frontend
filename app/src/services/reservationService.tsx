import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export const getAllAccommodationSlots = async (id: any) => {
  return await request(`/availability-slot/accommodation/${id}`);
};

export const addAccommodationSlot = async (payload: any) => {
  return await request("/availability-slot", payload, HttpMethod.POST);
};

export const updateAccommodationSlot = async (payload: any) => {
  return await request("/availability-slot", payload, HttpMethod.PUT);
};

export const findAllReservationByUserId = async (id: number) => {
  return await request(`/reservation/user/${id}`);
};

export const cancelReservation = async (id: string) => {
  return await request(`/reservation/${id}`, [], HttpMethod.DELETE);
};
