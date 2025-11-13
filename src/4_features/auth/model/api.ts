import axios from "axios";
import type {RegisterFormType} from "../../../5_entity/model/user/type.ts";

const API_URL = "http://localhost:8080/api/v1/auth"

export const LoginApi = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password
    });
    return response.data;
}

export const RegisterApi = async ({firstName, lastName, email, password, confirmPassword, file, role} : RegisterFormType) => {
    const response = await axios.post(`${API_URL}/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        file,
        role
    });
    return response.data;
}