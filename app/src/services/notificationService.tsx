import { requestNot } from "./base/HTTPNotification";
import HttpMethod from "../constants/HttpMethod";

export async function findHostConfig(id: number) {
  return await requestNot(`/config/host/${id}`);
}
export async function findGuestConfig(id: number) {
  return await requestNot(`/config/guest/${id}`);
}

export async function updateGuestConfig(dto: any) {
  return await requestNot(`/config/guest`, dto, HttpMethod.PUT);
}

export async function updateHostConfig(dto: any) {
  return await requestNot(`/config/host`, dto, HttpMethod.PUT);
}

export async function findNotificationByUserId(id: number) {
  return await requestNot(`/notification/${id}`);
}

export async function findById(id: string) {
  return await requestNot(`/notification/${id}`, [], HttpMethod.PUT);
}
