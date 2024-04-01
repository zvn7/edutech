import axios from "axios";
import { LoginUser } from "../types/login";
import { Siswa } from "../types/user";

const BASE_URL ="http://192.168.74.239:1331"

export const postLoginSiswa = async (data: LoginUser) => {
    try {
        const response = await axios.post<LoginUser>(`${BASE_URL}/api/Account/login/student`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
        throw new Error("Failed to login"); // or handle error as needed
    }
}

export const postLogin = async (data:LoginUser)=>{
    try {
        const response = await axios.post<LoginUser>(`${BASE_URL}/api/Account/login`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
        throw new Error("Failed to login"); // or handle error as needed
    }
}

export const postLoginGuru = async(data:LoginUser)=>{
    try {
        const response = await axios.post<LoginUser>(`${BASE_URL}/api/Account/login/teacher`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
        throw new Error("Failed to login"); // or handle error as needed
    }
}

export const getUserSiswa = async()=>{
    try {
        const response = await axios.get<Siswa>(`${BASE_URL}/api/Account/students`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Terjadi Kesalahan ketika ")
        throw new Error("Failed to get data")
    }
}


