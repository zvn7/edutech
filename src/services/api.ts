import axios from "axios";
import { LoginUser } from "../types/login";
import { UserGuru, UserLogin, UserSiswa } from "../types/user";
import { IMapel, MapelTeacher } from "../types/mapel";
import { Absensi, AttendancesCalculate, CreateAbsensi } from "../types/absensi";
import {
  CourseClassroom,
  DetailMateri,
  IMateriGuru,
  UploadMateri,
} from "../types/materi";
import { Tugas } from "../types/tugas";
import { Pengumpulan } from "../types/pengumpulan";
import { Mapel } from "../types/mapel";
import { Jadwal } from "../types/jadwal";
import { Kehadiran } from "../types/kehadiran";
import { Ikelas, Classrooms } from "../types/kelas";
import { CountTeacher } from "../types/countTeacher";
import { ToDoList } from "../types/todolist";

const BASE_URL = import.meta.env.VITE_API_URL;

// login
export const postLogin = async (data: LoginUser) => {
  try {
    const response = await axios.post<LoginUser>(
      `${BASE_URL}/Account/login`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data); // or handle error as needed
  }
};

// get user info
export const getUserInfo = async () => {
  try {
    const response = await axios.get<UserLogin>(
      `${BASE_URL}/Account/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// create mapel
export const createMapel = async (data: IMapel) => {
  try {
    const response = await axios.post(`${BASE_URL}/Lessons`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get mapel by id
export const getMapelIds = async () => {
  try {
    const response = await axios.get<IMapel[]>(`${BASE_URL}/Lessons`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get data mapel
export const getMapel = async (id: number) => {
  try {
    const response = await axios.get<IMapel>(`${BASE_URL}/Lessons/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getMapelClassroom = async () => {
  try {
    const response = await axios.get<Mapel[]>(
      `${BASE_URL}/Lessons/lessonClassRoomId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// delete mapel
export const deleteMapel = async (id: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/Lessons/deactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// create data pengguna siswa
export const createUserSiswa = async (data: UserSiswa) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/Account/register/student2`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// delete siswa
export const deleteSiswa = async (studentId: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/Account/student/delete/${studentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getCourseIds = async () => {
  try {
    const response = await axios.get<IMateriGuru[]>(
      `${BASE_URL}/Courses/getCourseByTeacherId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getCourse = async (id: number) => {
  try {
    const response = await axios.get<IMateriGuru>(`${BASE_URL}/Courses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getAssignmentsIds = async () => {
  return (
    await axios.get<Tugas[]>(`${BASE_URL}/Assignments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data.map((assignments) => assignments.id);
};

export const getAssigmentByTeacherId = async () => {
  try {
    const response = await axios.get<Tugas[]>(
      `${BASE_URL}/Assignments/getAssignmentByTeacherId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getAssigmentByClassroomId = async () => {
  try {
    const response = await axios.get<Tugas[]>(
      `${BASE_URL}/Assignments/getAssignmentByClassRoomId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getAssignments = async (id: string) => {
  try {
    const response = await axios.get<Tugas>(`${BASE_URL}/Assignments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const createTugas = async (data: Tugas) => {
  try {
    const response = await axios.post(`${BASE_URL}/Assignments`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const deleteTugas = async (id: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/Assignments/deactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getClassRooms = async () => {
  try {
    const response = await axios.get<Classrooms[]>(`${BASE_URL}/ClassRooms`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getAssignmentSubmissionsIds = async () => {
  try {
    const response = await axios.get<Pengumpulan[]>(
      `${BASE_URL}/AssignmentSubmissions`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const createAssignmentSubmissions = async (data: Pengumpulan) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/AssignmentSubmissions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getAssignmentById = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/AssignmentSubmissions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

const getStudentIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (token) {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload?.StudentId || null;
  }
  return null;
};

export const getLessonsIds = async () => {
  try {
    const response = await axios.get<Mapel[]>(`${BASE_URL}/Lessons`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getLessons = async (id: number) => {
  try {
    const response = await axios.get<Mapel>(`${BASE_URL}/Lessons/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getSchedulesIds = async () => {
  try {
    const response = await axios.get<Jadwal[]>(
      `${BASE_URL}/Schedules/studentClassRoomId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getSchedulesAdmin = async () => {
  try {
    const response = await axios.get<Jadwal[]>(`${BASE_URL}/Schedules`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// create jadwal admin
export const createSchedules = async (data: Jadwal) => {
  try {
    const response = await axios.post(`${BASE_URL}/schedules`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// hapus jadwal
export const deleteSchedule = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Schedules/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getAttendancesIds = async () => {
  return (
    await axios.get<Kehadiran[]>(`${BASE_URL}/Attendances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data.map((attendances) => attendances.id);
};

export const getAttendances = async (id: number) => {
  try {
    const studentId = getStudentIdFromToken();
    if (!studentId) {
      throw new Error("StudentId not found in token");
    }
    const response = await axios.get<Kehadiran>(
      `${BASE_URL}/Attendances/student/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getCourseClassroom = async () => {
  try {
    const response = await axios.get<CourseClassroom[]>(
      `${BASE_URL}/Courses/getCourseByClassRoomId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getSiswaIds = async () => {
  try {
    const response = await axios.get<UserSiswa[]>(
      `${BASE_URL}/Account/students`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get data mapel
export const getSiswa = async (id: string) => {
  try {
    const response = await axios.get<UserSiswa>(
      `${BASE_URL}/Account/student/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// post data siswa with excel
export const postDataExcelSiswa = async (formData: FormData) => {
  try {
    // Mendapatkan data dari formData
    const fileData = formData.get("excelFile");

    // Pastikan data file yang diperoleh adalah FormData
    if (fileData instanceof File) {
      // Kirim data file ke server
      const response = await axios.post<UserSiswa[]>(
        `${BASE_URL}/Account/seedexcel`,
        formData,
        {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } else {
      throw new Error("File not found");
    }
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// edit data siswa
export const editSiswa = async (id: string, data: UserSiswa) => {
  try {
    const response = await axios.put<UserSiswa>(
      `${BASE_URL}/Account/edit/student/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get absensi siswa
export const getAbsensi = async () => {
  try {
    const response = await axios.get<Absensi[]>(`${BASE_URL}/Attendances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getTeacherinfo = async () => {
  try {
    const response = await axios.get<IMateriGuru[]>(
      `${BASE_URL}/Courses/getCourseByTeacherId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const createMateri = async (data: UploadMateri) => {
  try {
    const response = await axios.post(`${BASE_URL}/Courses/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getClassRoomsByTeacherId = async () => {
  try {
    const response = await axios.get<Ikelas>(
      `${BASE_URL}/ClassRooms/classRoomTeacherId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// awal api guru

// get guru
export const getGuru = async () => {
  try {
    const response = await axios.get<UserGuru[]>(
      `${BASE_URL}/Account/teachers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get lesson by id guru
export const getLessonByTeacherId = async () => {
  try {
    const response = await axios.get<MapelTeacher[]>(
      `${BASE_URL}/Lessons/lessonTeacherId`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get course by id
export const getCourseById = async (id: string) => {
  try {
    const response = await axios.get<DetailMateri>(
      `${BASE_URL}/Courses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get guru by id
export const getGuruById = async (id: string) => {
  try {
    const response = await axios.get<UserGuru>(
      `${BASE_URL}/Account/teacher/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// create guru
export const createGuru = async (data: UserGuru) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/Account/register/teacher`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const deleteGuru = async (teacherId: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/Account/teacher/delete/${teacherId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// akhir api guru

// pengumpulan
export const createPengumpulan = async (data: Pengumpulan) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/AssignmentSubmissions`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getAssignmentSubmissions = async (id: string) => {
  try {
    const response = await axios.get<Pengumpulan>(
      `${BASE_URL}/AssignmentSubmissions/getSubmissionForStudentByAssignmentId/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// create absensi
export const createAbsensi = async (data: CreateAbsensi) => {
  try {
    const response = await axios.post(`${BASE_URL}/Attendances`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get list tugas
export const getListAssignment = async (
  lessonId: string,
  assignmentId: string
) => {
  try {
    const response = await axios.get<AssignmentSubmissionData>(
      `${BASE_URL}/AssignmentSubmissions/GetListSubmissionForTeacherGrades?LessonId=${lessonId}&AssignmentId=${assignmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get jumlah absensi
export const getAttendancesCalculate = async (
  uniqueNumberOfClassRoom: string,
  year: string,
  month: string
) => {
  try {
    const response = await axios.get<AttendancesCalculate>(
      `${BASE_URL}/Attendances/calculate?uniqueNumberOfClassRoom=${uniqueNumberOfClassRoom}&year=${year}&month=${month}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get count teacher
export const getCountTeacher = async () => {
  try {
    const response = await axios.get<CountTeacher>(
      `${BASE_URL}/Account/calculateTeacherStudent`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// get Todo list
export const getToDoLists = async () => {
  try {
    const response = await axios.get<ToDoList[]>(`${BASE_URL}/ToDoLists`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// create Todo List
export const createTodo = async (data: ToDoList) => {
  try {
    const response = await axios.post(`${BASE_URL}/ToDoLists`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// edit Todo List
export const editTodo = async (id: string, data: ToDoList) => {
  try {
    const response = await axios.put<ToDoList>(
      `${BASE_URL}/ToDoLists/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const editTodoCheck = async (id: string, data: ToDoList) => {
  try {
    const response = await axios.put<ToDoList>(
      `${BASE_URL}/ToDoLists/ceklis/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// delete Todo List
export const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/ToDoLists/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
