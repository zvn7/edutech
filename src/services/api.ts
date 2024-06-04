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
import { appendErrors } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_API_URL;

// login
export const postLogin = async (data: LoginUser) => {
	const response = await axios.post<LoginUser>(
		`${BASE_URL}/Account/login`,
		data
	);
	return response.data;
};

// get user info
export const getUserInfo = async () => {
	const response = await axios.get<UserLogin>(`${BASE_URL}/Account/userinfo`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
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
	const response = await axios.get<IMapel[]>(`${BASE_URL}/Lessons`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

// get data mapel
export const getMapel = async (id: number) => {
	const response = await axios.get<IMapel>(`${BASE_URL}/Lessons/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const getMapelClassroom = async () => {
	const response = await axios.get<Mapel[]>(
		`${BASE_URL}/Lessons/lessonClassRoomId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// delete mapel
export const deleteMapel = async (id: string) => {
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
};

// create data pengguna siswa
export const createUserSiswa = async (data: UserSiswa) => {
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
};

// delete siswa
export const deleteSiswa = async (studentId: string) => {
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
};

export const getCourseIds = async () => {
	const response = await axios.get<IMateriGuru[]>(
		`${BASE_URL}/Courses/getCourseByTeacherId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

export const getCourse = async (id: number) => {
	const response = await axios.get<IMateriGuru>(`${BASE_URL}/Courses/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
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
	const response = await axios.get<Tugas[]>(
		`${BASE_URL}/Assignments/getAssignmentByTeacherId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

export const getAssigmentByClassroomId = async () => {
	const response = await axios.get<Tugas[]>(
		`${BASE_URL}/Assignments/getAssignmentByClassRoomId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

export const getAssignments = async (id: string) => {
	const response = await axios.get<Tugas>(`${BASE_URL}/Assignments/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const createTugas = async (data: Tugas) => {
	const response = await axios.post(`${BASE_URL}/Assignments`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const deleteTugas = async (id: string) => {
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
};

export const getClassRooms = async () => {
	const response = await axios.get<Classrooms[]>(`${BASE_URL}/ClassRooms`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const getAssignmentSubmissionsIds = async () => {
	const response = await axios.get<Pengumpulan[]>(
		`${BASE_URL}/AssignmentSubmissions`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

export const createAssignmentSubmissions = async (data: Pengumpulan) => {
	const response = await axios.post(`${BASE_URL}/AssignmentSubmissions`, data, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const getAssignmentById = async (id: number) => {
	const response = await axios.get(`${BASE_URL}/AssignmentSubmissions/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
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
	const response = await axios.get<Mapel[]>(`${BASE_URL}/Lessons`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const getLessons = async (id: number) => {
	const response = await axios.get<Mapel>(`${BASE_URL}/Lessons/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const getSchedulesIds = async () => {
	const response = await axios.get<Jadwal[]>(
		`${BASE_URL}/Schedules/studentClassRoomId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

export const getSchedulesAdmin = async () => {
	const response = await axios.get<Jadwal[]>(`${BASE_URL}/Schedules`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
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
	const response = await axios.delete(`${BASE_URL}/Schedules/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
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

export const getAttendances = async () => {
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
};

export const getCourseClassroom = async () => {
	const response = await axios.get<CourseClassroom[]>(
		`${BASE_URL}/Courses/getCourseByClassRoomId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

export const getSiswaIds = async () => {
	const response = await axios.get<UserSiswa[]>(
		`${BASE_URL}/Account/students`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// get data mapel
export const getSiswa = async (id: string) => {
	const response = await axios.get<UserSiswa>(
		`${BASE_URL}/Account/student/${id}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// get absensi siswa
export const getAbsensi = async () => {
	const response = await axios.get<Absensi[]>(`${BASE_URL}/Attendances`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const getTeacherinfo = async () => {
	const response = await axios.get<IMateriGuru[]>(
		`${BASE_URL}/Courses/getCourseByTeacherId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
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
	const response = await axios.get<Ikelas>(
		`${BASE_URL}/ClassRooms/classRoomTeacherId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// awal api guru

// get guru
export const getGuru = async () => {
	const response = await axios.get<UserGuru[]>(`${BASE_URL}/Account/teachers`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

// get lesson by id guru
export const getLessonByTeacherId = async () => {
	const response = await axios.get<MapelTeacher[]>(
		`${BASE_URL}/Lessons/lessonTeacherId`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// get course by id
export const getCourseById = async (id: string) => {
	const response = await axios.get<DetailMateri>(`${BASE_URL}/Courses/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

// get guru by id
export const getGuruById = async (id: string) => {
	const response = await axios.get<UserGuru>(
		`${BASE_URL}/Account/teacher/${id}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
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
};

// akhir api guru

// pengumpulan
export const createPengumpulan = async (data: Pengumpulan) => {
	const response = await axios.post(`${BASE_URL}/AssignmentSubmissions`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

export const getAssignmentSubmissions = async (id: string) => {
	const response = await axios.get<Pengumpulan>(
		`${BASE_URL}/AssignmentSubmissions/getSubmissionForStudentByAssignmentId/${id}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
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
	const response = await axios.get<AssignmentSubmissionData>(
		`${BASE_URL}/AssignmentSubmissions/GetListSubmissionForTeacherGrades?LessonId=${lessonId}&AssignmentId=${assignmentId}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// get jumlah absensi
export const getAttendancesCalculate = async (
	uniqueNumberOfClassRoom: string,
	year: string,
	month: string
) => {
	const response = await axios.get<AttendancesCalculate>(
		`${BASE_URL}/Attendances/calculate?uniqueNumberOfClassRoom=${uniqueNumberOfClassRoom}&year=${year}&month=${month}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// get count teacher
export const getCountTeacher = async () => {
	const response = await axios.get<CountTeacher>(
		`${BASE_URL}/Account/calculateTeacherStudent`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
	return response.data;
};

// get Todo list
export const getToDoLists = async () => {
	const response = await axios.get<ToDoList[]>(`${BASE_URL}/ToDoLists`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

// create Todo List
export const createTodo = async (data: ToDoList) => {
	const response = await axios.post(`${BASE_URL}/ToDoLists`, data, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

// edit Todo List
export const editTodo = async (id: string, data: ToDoList) => {
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
};

export const editTodoCheck = async (id: string, data: ToDoList) => {
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
};

// delete Todo List
export const deleteTodo = async (id: string) => {
	const response = await axios.delete(`${BASE_URL}/ToDoLists/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};
