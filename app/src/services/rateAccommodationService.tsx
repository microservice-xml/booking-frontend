import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function rateAccommodation(rate: any) {
    return await request("/rate-accommodation", rate, HttpMethod.POST);
}

export async function getAllRatesByAccommodationId(id: number) {
    return await request("/rate-accommodation/" + id);
}

export async function deleteRateAccommodation(id: number) {
    return await request("/rate-accommodation/" + id, [], HttpMethod.DELETE);
}

export async function changeRateAccommodation(rate: any) {
    return await request("/rate-accommodation/" + rate.id, rate, HttpMethod.PUT);
}





