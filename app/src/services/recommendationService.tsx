import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export const recommend = async (id: number) => {
  return await request(`/accommodation/recommend/${id}`);
};