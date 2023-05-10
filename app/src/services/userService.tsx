import { makeParametersList, request } from "./base/HTTPAccommodationApi";
import HttpMethod from "../constants/HttpMethod";

export async function getAllRegisteredUsers() {

    return await request("/user/all");
}

export async function registerUser(parameters: any) {
    return await request("/user/registration", parameters, HttpMethod.POST);
}