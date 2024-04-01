import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginUser } from "../types/login";
import { postLoginSiswa, postLoginGuru, postLogin} from "./api";


export function useLoginSiswa() {
    const queryClient = useQueryClient();
    
    return useMutation<LoginUser, Error, LoginUser, unknown>({
            mutationFn: async (data: LoginUser) => {
                try {
                    const result = await postLoginSiswa(data);
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
        }
    );
}

export function useLoginGuru() {
    const queryClient = useQueryClient();
    
    return useMutation<LoginUser, Error, LoginUser, unknown>({
            mutationFn: async (data: LoginUser) => {
                try {
                    const result = await postLoginGuru(data);
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
        }
    )
}

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