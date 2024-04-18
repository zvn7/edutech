import { useQueries, useQuery } from "@tanstack/react-query";
import { getAbsensi, getGuru, getMapel, getMapelIds, getSiswa, getSiswaIds, getUserInfo } from "./api";


// queries get user login
export function useUserLogin(){
    return useQueries({
        queries:[
            {
                queryKey:["userinfo"],
                queryFn:getUserInfo
            }
        ]
    })
}

//queries get mapel id
export function useGetMapelId(){
    return useQuery({
            queryKey:["mapel"],
            queryFn:getMapelIds
        })
}

// queries get mapel
export function useMapel(id:(number|undefined)[] | undefined){
    return useQueries({
        queries:(id ?? []).map((id)=>{
            return{
                queryKey:["mapel",id],
                queryFn:()=>getMapel(id!)
            }
          }),
    })
}

// queries get siswa
export function useGetSiswaId(){
    return useQuery({
        queryKey:["siswa"],
        queryFn:getSiswaIds
    })
}

// queries get siswa
// export function useSiswa(id:string){
//    return useQuery({
//     queryKey:["siswa",id],
//     queryFn:()=>getSiswa(id)
//    })
// }

export function useSiswa(ids:(string|undefined)[] | undefined){
    return useQueries({
        queries: (ids ?? []).map((id)=>{
            return{
                queryKey: ["siswa", {id}],
                queryFn: () => getSiswa(id!)
            };
        }),
    });
}

// get siswa by id
export function useSiswaDetail(id:string){
    return useQuery({
        queryKey:["siswa",id],
        queryFn:()=>getSiswa(id)
    })
}

// get guru
export function useGetGuru(){
    return useQuery({
        queryKey:["guru"],
        queryFn:getGuru
    })
}

// get absensi
export function useGetAbsensi(){
    return useQuery({
        queryKey:["absensi"],
        queryFn:getAbsensi
    })
}