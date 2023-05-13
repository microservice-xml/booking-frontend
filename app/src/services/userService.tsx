import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getAllRegisteredUsers() {

    return await request("/user/all");
}

export async function registerUser(parameters: any) {
    return await request("/auth/register", parameters, HttpMethod.POST);
}