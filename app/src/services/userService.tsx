import { makeParametersList, request } from "./base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getAllRegisteredUsers() {

    return await request("/user/all");
}

export async function registerUser(parameters: any) {
    return await request("/auth/register", parameters, HttpMethod.POST);
}

export async function getById(id: number) {
    return await request("/user/" + id);
}

export async function changePersonalInfo(dto: any) {
    return await request('/user/change-personal-info', dto, HttpMethod.PUT);
}

export async function deleteUserAccount(id: number) {
    return await request("/user/remove/" + id, [], HttpMethod.DELETE);
}

export async function searchFlights(parameters: any) {

    return await request("/flight/search" + makeParametersList(parameters));
}