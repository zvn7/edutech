import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginUser } from "../types/login";
import {
	postLoginSiswa,
	postLoginGuru,
	postLogin,
	createAssignmentSubmissions,
	editAssignmentSubmission,
	createMateri,
} from "./api";
import { Pengumpulan } from "../types/pengumpulan";
import { IMateriGuru, MateriGuru } from "../types/materi";

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
		onSuccess: async (data: any) => {
			console.log("success", data);
			await queryClient.invalidateQueries({ queryKey: ["login"] });
		},
	});
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
		onSuccess: async (data: any) => {
			console.log("success", data);
			await queryClient.invalidateQueries({ queryKey: ["login"] });
		},
	});
}

export function useLogin() {
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
		onSuccess: async (data: any) => {
			console.log("success", data);
			await queryClient.invalidateQueries({ queryKey: ["login"] });
		},
	});
}

export function useCreateAssignmentSubmissions() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["assignmentSubmissions"],
		mutationFn: (data: Pengumpulan) => createAssignmentSubmissions(data),

		onMutate: () => {
			console.log("Mutate");
		},

		onError: () => {
			console.log("Error");
		},

		onSuccess: () => {
			console.log("Success");
		},

		onSettled: async (_, error) => {
			console.log("Settled");
			if (error) {
				console.log(error);
			} else {
				await queryClient.invalidateQueries({
					queryKey: ["assignmentSubmissions"],
				});
			}
		},
	});
}

export function useEditAssignmentSubmission() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["assignmentSubmission"],
		mutationFn: (data: Pengumpulan) => editAssignmentSubmission(data),

		onMutate: () => {
			console.log("Mutate");
		},

		onError: () => {
			console.log("Error");
		},

		onSuccess: () => {
			console.log("Success");
		},

		onSettled: async (_, error, variables) => {
			console.log("Settled");
			if (error) {
				console.log(error);
			} else {
				await queryClient.invalidateQueries({
					queryKey: ["assignment", variables.assignmentId], // Menggunakan assignmentId sebagai bagian dari queryKey
				});
			}
		},
	});
}

export function useCreateMateri() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["createMateri"],
		mutationFn: (data: IMateriGuru) => createMateri(data),
		onMutate: () => {
			console.log("Mutate");
		},
		onError: () => {
			console.log("Error");
		},
		onSettled: () => {
			console.log("Settled");
		},
		onSuccess: async (data:any) => {
			console.log("Success", data);
			await queryClient.invalidateQueries({ queryKey: ["materiGuru"] });
		}
	});
}
