import { makeParametersList, request } from ".//base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function createAccommodation(parameters: any) {
    return await request("/accommodation/add-accommodation", parameters, HttpMethod.POST);
}