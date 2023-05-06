import { makeParametersList, request } from ".//base/HTTP";

export async function getAllRegisteredUsers() {

    return await request("/user/all");
}