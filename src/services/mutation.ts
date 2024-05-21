import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginUser } from "../types/login";
import {
  postLogin,
  createMapel,
  deleteMapel,
  createUserSiswa,
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
  deleteGuru,
} from "./api";
import { IMapel } from "../types/mapel";
import { UserGuru, UserSiswa } from "../types/user";
import { createAssignmentSubmissions, createMateri } from "./api";
import { Pengumpulan } from "../types/pengumpulan";
import { UploadMateri } from "../types/materi";
import { Jadwal } from "../types/jadwal";
import { Tugas } from "../types/tugas";
import { CreateAbsensi } from "../types/absensi";
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

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
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

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
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

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["usersiswa"] });
    },
  });
}

// create jadwal
export function useCreateJadwalAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createJadwalAdmin"],
    mutationFn: (data: Jadwal) => createSchedules(data),

    onError: () => {
      console.log("error");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jadwal"] });
    },
  });
}

export function useDeleteMapel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteMapel"],
    mutationFn: (id: string) => deleteMapel(id),

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["mapel"] });
    },
  });
}

export function useDeleteSiswa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSiswa"],
    mutationFn: (studentId: string) => deleteSiswa(studentId),

    onError: () => {
      console.log("error");
    },

    onSuccess: async (data: any) => {
      console.log("success", data);
      await queryClient.invalidateQueries({ queryKey: ["siswa"] });
    },
  });
}

export function useCreateAssignmentSubmissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["assignmentSubmissions"],
    mutationFn: (data: Pengumpulan) => createAssignmentSubmissions(data),

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

// create materi
export function useCreateMateri() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createMateri"],
    mutationFn: (data: UploadMateri) => createMateri(data),

    onError: () => {
      console.log("Error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["teacherinfo"] });
    },
  });
}

// delete jadwal
export function useDeleteSchedules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteJadwal"],
    mutationFn: (id: string) => deleteSchedule(id),

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["schedulesAdmin"] });
    },
  });
}

// create guru
export function useCreateUserGuru() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createUserGuru"],
    mutationFn: (data: UserGuru) => createGuru(data),

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userguru"] });
    },
  });
}

// delete guru
export function useDeleteGuru() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteGuru"],
    mutationFn: (teacherId: string) => deleteGuru(teacherId),

    onError: () => {
      console.log("error");
    },

    onSuccess: async (data: any) => {
      console.log("success", data);
      await queryClient.invalidateQueries({ queryKey: ["guru"] });
    },
  });
}

// create tugas
export function useCreateTugas() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createTugas"],
    mutationFn: (data: Tugas) => createTugas(data),

    onError: () => {
      console.log("Error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["assignmentsByTeacherId"],
      });
    },
  });
}

export function useDeleteTugas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTugas"],
    mutationFn: (id: string) => deleteTugas(id),

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["assignmentsByTeacherId"],
      });
    },
  });
}

// pengumpulan tugas

export function useCreatePengumpulan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPengumpulan"],
    mutationFn: (data: Pengumpulan) => createPengumpulan(data),

    onError: () => {
      console.log("Error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["assignmentsByClassroomId"],
      });
    },
  });
}

// create absensi
export function useCreateAbsensi() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createAbsensi"],
    mutationFn: (data: CreateAbsensi) => createAbsensi(data),

    onError: () => {
      console.log("Error");
    },

    onSuccess: async () => {
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

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
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

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
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

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: (id: string) => deleteTodo(id),

    onError: () => {
      console.log("error");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });
}
