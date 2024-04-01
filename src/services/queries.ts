import { useQueries } from "@tanstack/react-query";
import { getUserSiswa } from "./api";

export function useGetUserSiswa(){
    return useQueries({
        queries: [
            {
                queryKey: ['userSiswa'],
                queryFn: getUserSiswa
            }
        ]
    })
}