import { makeParametersList, request } from "./base/HTTPAccommodationApi";
import HttpMethod from "../constants/HttpMethod";

export async function createAccommodation(parameters: any) {
    return await request("/accommodation/add-accommodation", parameters, HttpMethod.POST);
}

export const getAllAccommodation = async () => {
    return request("/accommodation/all");
};