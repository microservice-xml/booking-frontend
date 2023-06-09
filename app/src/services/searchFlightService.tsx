import { makeParametersList, request } from "./base/HTTPSearchFlight"
import HttpMethod from "../constants/HttpMethod";

export async function searchFlights(parameters: any) {

    return await request("/flight/search" + makeParametersList(parameters));
}

export async function checkEmail(email: string) {
    return await request("user/email/" + email);
}