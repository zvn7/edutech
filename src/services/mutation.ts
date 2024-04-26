import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginUser } from "../types/login";
import {
	createMapel,
	createUserSiswa,
	deleteMapel,
	editSiswa,
	postDataExcelSiswa,
	postLogin,
} from "./api";
import { IMapel } from "../types/mapel";
import { UserSiswa } from "../types/user";
import {
	postLoginSiswa,
	postLoginGuru,
	postLogin,
	createAssignmentSubmissions,
	editAssignmentSubmission,
	createMateri,
} from "./api";
import { Pengumpulan } from "../types/pengumpulan";
import { IMateriGuru, MateriGuru, UploadMateri } from "../types/materi";

// login
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

// create mapel
export function useCreateMapel() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["createMapel"],
		mutationFn: (data: IMapel) => createMapel(data),
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
			await queryClient.invalidateQueries({ queryKey: ["mapel"] });
		},
	});
}

// create pengguna siswa
export function useCreateUserSiswa() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["createUserSiswa"],
		mutationFn: (data: UserSiswa) => createUserSiswa(data),

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
			await queryClient.invalidateQueries({ queryKey: ["usersiswa"] });
		},
	});
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
export function useEditSiswa() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["editSiswa"],
		mutationFn: ({ id, data }: { id: string; data: UserSiswa }) =>
			editSiswa(id, data),
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
			await queryClient.invalidateQueries({ queryKey: ["usersiswa"] });
		},
	});
}

export function useDeleteMapel() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["deleteMapel"],
		mutationFn: (id: string) => deleteMapel(id),
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
			await queryClient.invalidateQueries({ queryKey: ["mapel"] });
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
		mutationFn: (data: UploadMateri) => createMateri(data),
		onMutate: () => {
			console.log("Mutate");
		},
		onError: () => {
			console.log("Error");
		},
		onSettled: () => {
			console.log("Settled");
		},
		onSuccess: async (data: any) => {
			console.log("Success", data);
			await queryClient.invalidateQueries({ queryKey: ["course"] });
		},
	});
}
