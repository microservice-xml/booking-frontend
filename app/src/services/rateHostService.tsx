import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function rateHost(rate: any) {
    return await request("/rate", rate, HttpMethod.POST);
}

export async function getAllRatesByHostId(id: number) {
    return await request("/rate/" + id);
}

export async function changeRateHost(rate: any) {
    return await request("/rate/" + rate.id, rate, HttpMethod.PUT);
}

export async function deleteRateHost(id: number) {
    return await request("/rate/" + id, [], HttpMethod.DELETE);
}