import axios from "axios";
import { LoginUser } from "../types/login";
import { UserGuru, UserLogin, UserSiswa } from "../types/user";
import { IMapel } from "../types/mapel";
import { Absensi } from "../types/absensi";

const BASE_URL ="http://192.168.144.239:13311"

// login
export const postLogin = async (data:LoginUser)=>{
    try {
        const response = await axios.post<LoginUser>(`${BASE_URL}/api/Account/login`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
        throw new Error("Failed to login"); // or handle error as needed
    }
}


// get user info
export const getUserInfo = async()=>{
    try {
        const response =await axios.get<UserLogin>(`${BASE_URL}/api/Account/userinfo`,{
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


// create mapel
export const createMapel = async(data:IMapel)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/Lessons`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })   
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error("Terjadi Kesalahan ketika ")
        throw new Error("Failed to get data")
    }
}


// get mapel by id
export const getMapelIds = async()=>{
    try {
        const response = await axios.get<IMapel[]>(`${BASE_URL}/api/Lessons`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get data")
    }
}

// get data mapel
export const getMapel = async (id:number)=>{
    try {
        const response = await axios.get<IMapel>(`${BASE_URL}/api/Lessons/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data

    } catch (error) {
        console.log(error);
        throw new Error("Failed to get data")
    }
}

// delete mapel
export const deleteMapel = async (id:string)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/api/Lessons/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get data")
    }
}


// create data pengguna siswa
export const createUserSiswa = async(data:UserSiswa)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/Account/register/student`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })   
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error("Terjadi Kesalahan ketika ")
        throw new Error("Failed to get data")
    }
}

export const getSiswaIds = async()=>{
    try {
        const response = await axios.get<UserSiswa[]>(`${BASE_URL}/api/Account/students`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get data")
    }
}

// get data mapel
export const getSiswa = async (id:string)=>{
    try {
        const response = await axios.get<UserSiswa>(`${BASE_URL}/api/Account/student/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data

    } catch (error) {
        console.log(error);
        throw new Error("Failed to get data")
    }
}

// post data siswa with excel
export const postDataExcelSiswa = async (formData: FormData) => {
    try {
      // Mendapatkan data dari formData
      const fileData = formData.get('excelFile');
  
      // Pastikan data file yang diperoleh adalah FormData
      if (fileData instanceof File) {
        // Kirim data file ke server
        const response = await axios.post<UserSiswa[]>(`${BASE_URL}/api/Account/seedexcel`, formData, {
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
  
        console.log(response.data);
        return response.data;
      } else {
        // Handle jika data file tidak ditemukan dalam formData
        console.error('File not found in formData');
        throw new Error('File not found');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error('Failed to process file');
    }
  };

  
// edit data siswa
export const editSiswa = async (id: string, data: UserSiswa) => {
    try {
        const response = await axios.put<UserSiswa>(`${BASE_URL}/api/Account/edit/student/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Terjadi Kesalahan ketika ");
        throw new Error("Failed to edit data");
    }
};


// get guru 
export const getGuru = async ()=>{
    try {
        const response = await axios.get<UserGuru[]>(`${BASE_URL}/api/Account/teachers`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get data")
    }
}

// get absensi siswa
export const getAbsensi = async()=>{
    try {
        const response = await axios.get<Absensi[]>(`${BASE_URL}/api/Attendances`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get data")
    }
}