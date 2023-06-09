import HttpMethod from "../../constants/HttpMethod";
import { request } from "../base/HTTPSearchFlight";

export const purchaseTicket = async (purchaseTicketDto: any) => {
  return await request("/ticket/purchase", purchaseTicketDto, HttpMethod.POST);
};

export const getAllTicketByUser = async (userId: string) => {
  return await request(`/ticket/user/${userId}`);
};