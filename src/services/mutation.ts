import { useMutation, useQueryClient} from '@tanstack/react-query';
import { LoginUser } from "../types/login";
import {createMapel, createUserSiswa, deleteMapel, editSiswa, postDataExcelSiswa, postLogin} from "./api";
import { IMapel } from '../types/mapel';
import { UserSiswa } from '../types/user';


// login
export function useLogin(){
    const queryClient = useQueryClient();

    return useMutation<LoginUser, Error, LoginUser, unknown>({
        mutationFn: async (data: LoginUser) => {
            try {
                const result = await postLogin(data);
                return result;
            } catch (error) {
                throw new Error("Failed to login");
            }
        },
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.log("error");
        },
        onSettled: () => {
            console.log("settled");
        },
        onSuccess: async (data:any) => {
            console.log("success", data);
            await queryClient.invalidateQueries({ queryKey: ["login"] });
        },
    })
}

// create mapel
export function useCreateMapel(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['createMapel'],
        mutationFn:(data:IMapel)=>createMapel(data),
        onMutate:()=>{
            console.log("mutate")
        },
        onError:()=>{
            console.log("error");
        },
        onSettled:()=>{
            console.log("settled");
        },
        onSuccess: async (data:any) => {
            console.log("success", data);
            await queryClient.invalidateQueries({ queryKey: ["mapel"] });
        },
    })
}

// create pengguna siswa
export function useCreateUserSiswa(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['createUserSiswa'],
        mutationFn:(data:UserSiswa)=>createUserSiswa(data),

        onMutate:()=>{
            console.log("mutate")
        },
        onError:()=>{
            console.log("error");
        },
        onSettled:()=>{
            console.log("settled");
        },
        onSuccess: async (data:any) => {
            console.log("success", data);
            await queryClient.invalidateQueries({ queryKey: ["usersiswa"] });
        },
    })
}

// upload file excel datas siswa
// export function useUploadFileSiswa(){
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationKey: ['uploadFileSiswa'],
//         mutationFn:(data:UserSiswa[])=>postDataExcelSiswa(data),
//         onMutate:()=>{
//             console.log("mutate")
//         },
//         onError:()=>{
//             console.log("error");
//         },
//         onSettled:()=>{
//             console.log("settled");
//         },
//         onSuccess: async (data:any) => {
//             console.log("success", data);
//             await queryClient.invalidateQueries({ queryKey: ["usersiswa"] });
//         },
//     })
// }

//edit data siswa
export function useEditSiswa(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['editSiswa'],
        mutationFn: ({ id, data }: { id: string, data: UserSiswa }) => editSiswa(id, data),
        onMutate:()=>{
            console.log("mutate")
        },
        onError:()=>{
            console.log("error");
        },
        onSettled:()=>{
            console.log("settled");
        },
        onSuccess: async (data:any) => {
            console.log("success", data);
            await queryClient.invalidateQueries({ queryKey: ["usersiswa"] });
        },
    })
}

export function useDeleteMapel(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['deleteMapel'],
        mutationFn: (id: string) => deleteMapel(id),
        onMutate:()=>{
            console.log("mutate")
        },
        onError:()=>{
            console.log("error");
        },
        onSettled:()=>{
            console.log("settled");
        },
        onSuccess: async (data:any) => {
            console.log("success", data);
            await queryClient.invalidateQueries({ queryKey: ["mapel"] });
        },
    })
}