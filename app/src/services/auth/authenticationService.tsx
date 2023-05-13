import { request } from "./../base/HTTP";
import HttpMethod from "../../constants/HttpMethod";

export async function login(loginDto: any) {
    return await request("/auth/authenticate", loginDto as any, HttpMethod.POST);
}