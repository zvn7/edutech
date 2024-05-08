import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginUser } from "../types/login";
import {
  postLogin,
	createMapel,
  deleteMapel,
	createUserSiswa,
	editSiswa,
	postDataExcelSiswa,
  createGuru,
  createSchedules,
  deleteSchedule,
  deleteSiswa,
  createTugas,
  deleteTugas,
  createPengumpulan,
  createAbsensi,
  createTodo,
  editTodo,
  deleteTodo,
  editTodoCheck,
} from "./api";
import { IMapel } from "../types/mapel";
import { UserGuru, UserSiswa } from '../types/user';
import {
	createAssignmentSubmissions,
	editAssignmentSubmission,
	createMateri,
} from "./api";
import { Pengumpulan } from "../types/pengumpulan";
import { IMateriGuru, UploadMateri } from "../types/materi";
import { Jadwal } from '../types/jadwal';
import { Tugas } from "../types/tugas";
import { Absensi, CreateAbsensi } from "../types/absensi";
import { ToDoList } from "../types/todolist";

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

// create jadwal
export function useCreateJadwalAdmin(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['createJadwalAdmin'],
        mutationFn:(data:Jadwal)=>createSchedules(data),

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
            await queryClient.invalidateQueries({ queryKey: ["jadwal"] });
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

export function useDeleteSiswa(){
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey:['deleteSiswa'],
		mutationFn:(studentId:string)=>deleteSiswa(studentId),
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
			await queryClient.invalidateQueries({ queryKey: ["siswa"] });
		},
	})
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

// export function useEditAssignmentSubmission() {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationKey: ["assignmentSubmission"],
// 		mutationFn: (data: Pengumpulan) => editAssignmentSubmission(data),

// 		onMutate: () => {
// 			console.log("Mutate");
// 		},

// 		onError: () => {
// 			console.log("Error");
// 		},

// 		onSuccess: () => {
// 			console.log("Success");
// 		},

// 		onSettled: async (_, error, variables) => {
// 			console.log("Settled");
// 			if (error) {
// 				console.log(error);
// 			} else {
// 				await queryClient.invalidateQueries({
// 					queryKey: ["assignment", variables.assignmentId], // Menggunakan assignmentId sebagai bagian dari queryKey
// 				});
// 			}
// 		},
// 	});
// }

// create materi
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
			await queryClient.invalidateQueries({ queryKey: ["teacherinfo"] });
		},
	});
}

// delete jadwal
export function useDeleteSchedules(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['deleteJadwal'],
        mutationFn: (id: string) => deleteSchedule(id),
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
            await queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
    })
}

// create guru
export function useCreateUserGuru(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['createUserGuru'],
        mutationFn:(data:UserGuru)=>createGuru(data),

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
            await queryClient.invalidateQueries({ queryKey: ["userguru"] });
        },
    })
}

// create tugas
export function useCreateTugas() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["createTugas"],
		mutationFn: (data: Tugas) => createTugas(data),
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
			await queryClient.invalidateQueries({ queryKey: ["assignmentsByTeacherId"] });
		},
	});
}

export function useDeleteTugas() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["deleteTugas"],
		mutationFn: (id: string) => deleteTugas(id),
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
			await queryClient.invalidateQueries({ queryKey: ["assignmentsByTeacherId"] });
		},
	});
}

// pengumpulan tugas

export function useCreatePengumpulan() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["createPengumpulan"],
		mutationFn: (data: Pengumpulan) => createPengumpulan(data),
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
			await queryClient.invalidateQueries({ queryKey: ["assignmentsByClassroomId"] });
		},
	});
}

// create absensi
export function useCreateAbsensi() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["createAbsensi"],
		mutationFn: (data: CreateAbsensi) => createAbsensi(data),
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
			await queryClient.invalidateQueries({ queryKey: ["attendances"] });
     },
	});
}

// create todo
export function useCreateTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["createTodo"],
		mutationFn: (data: ToDoList) => createTodo(data),

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
			await queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	});
}

export function useEditTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["editTodo"],
		mutationFn: ({ id, data }: { id: string; data: ToDoList }) =>
			editTodo(id, data),
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
			await queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	});
}

export function useEditTodoCheck() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["editTodo"],
		mutationFn: ({ id, data }: { id: string; data: ToDoList }) =>
			editTodoCheck(id, data),
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
			await queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	});
}

export function useDeleteTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: (id: string) => deleteTodo(id),
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
			await queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	});
}