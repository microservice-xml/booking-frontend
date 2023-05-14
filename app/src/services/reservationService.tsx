import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";
import { requestAcc } from "./base/HTTPAccommodationApi";
import { requestRes } from "./base/HTTPReservationApi";

export const getAllAccommodationSlots = async (id: number) => {
  return await requestRes(`/availability-slot/accommodation/${id}`);
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

export const findAllReservationByAccId = async (id: number) => {
  return await request(`/reservation/accommodation/${id}`);
};

export const acceptReservationManual = async (id: string) => {
  return await request(`/reservation/accept/${id}`, [], HttpMethod.PUT);
};

export const rejectReservation = async (id: string) => {
  return await request(`/reservation/reject/${id}`, [], HttpMethod.PUT);
};

export const makeReservation = async (payload: any) => {
  return await request(`/reservation`, payload, HttpMethod.POST);
};

export const makeReservationAuto = async (payload: any) => {
  return await request(`/reservation/auto`, payload, HttpMethod.POST);
};
