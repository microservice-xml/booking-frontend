import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function rateHost(rate: any) {
    return await request("/rate", rate, HttpMethod.POST);
}