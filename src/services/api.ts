import axios from "axios";
import { LoginUser } from "../types/login";
import { UserGuru, UserLogin, UserSiswa } from "../types/user";
import { IMapel } from "../types/mapel";
import { Absensi } from "../types/absensi";
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

const BASE_URL = "http://192.168.139.239:13311";

// login
export const postLogin = async (data: LoginUser) => {
	try {
		const response = await axios.post<LoginUser>(
			`${BASE_URL}/api/Account/login`,
			data
		);
		return response.data;
	} catch (error) {
		console.error("An error occurred while logging in:", error);
		throw new Error("Failed to login"); // or handle error as needed
	}
};

// get user info
export const getUserInfo = async () => {
	try {
		const response = await axios.get<UserLogin>(
			`${BASE_URL}/api/Account/userinfo`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Terjadi Kesalahan ketika ");
		throw new Error("Failed to get data");
	}
};

// create mapel
export const createMapel = async (data: IMapel) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/Lessons`, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Terjadi Kesalahan ketika ");
		throw new Error("Failed to get data");
	}
};

// get mapel by id
export const getMapelIds = async () => {
	try {
		const response = await axios.get<IMapel[]>(`${BASE_URL}/api/Lessons`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

// get data mapel
export const getMapel = async (id: number) => {
	try {
		const response = await axios.get<IMapel>(`${BASE_URL}/api/Lessons/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

export const getMapelClassroom = async () => {
	try {
		const response = await axios.get<Mapel[]>(
			`${BASE_URL}/api/Lessons/lessonClassRoomId`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

// delete mapel
export const deleteMapel = async (id: string) => {
	try {
		const response = await axios.delete(`${BASE_URL}/api/Lessons/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

// create data pengguna siswa
export const createUserSiswa = async (data: UserSiswa) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/api/Account/register/student`,
			data,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("failed to get data");
	}
};

export const getCourseIds = async () => {
	return (
		await axios.get<IMateriGuru[]>(`${BASE_URL}/api/Courses`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
	).data.map((course) => course.teacherId);
};

export const getCourse = async (id: number) => {
	try {
		const response = await axios.get<IMateriGuru>(
			`${BASE_URL}/api/Courses/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch course:", error);
		throw new Error("Failed to fetch course");
	}
};

export const getAssignmentsIds = async () => {
	return (
		await axios.get<Tugas[]>(`${BASE_URL}/api/Assignments`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
	).data.map((assignments) => assignments.id);
};

export const getAssigmentByTeacherId = async () => {
	return (
		await axios.get<Tugas[]>(
			`${BASE_URL}/api/Assignments/getAssignmentByTeacherId`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		)
	).data.map((assignments) => assignments);
};

export const getAssigmentByClassroomId = async () => {
	return (
		await axios.get<Tugas[]>(
			`${BASE_URL}/api/Assignments/getAssignmentByClassRoomId`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		)
	).data.map((assignments) => assignments.id);
};

// export const getAssignmentByTeacherId = async () => {
// 	return (
// 		await axios.get<Tugas[]>(`${BASE_URL}/api/Assignments/getAssignmentByTeacherId`, {
// 			headers: {
// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			},
// 		})
// 	).data.map((assignments) => assignments.id);
// };

export const getAssignments = async (id: string) => {
	try {
		const response = await axios.get<Tugas>(
			`${BASE_URL}/api/Assignments/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch assignments:", error);
		throw new Error("Failed to fetch assignments");
	}
};

export const createTugas = async (data: Tugas) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/Assignments`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Failed to post materi:", error);
	}
};

const getClassRoomIdFromToken = (): string | null => {
	const token = localStorage.getItem("token");
	if (token) {
		const payload = token.split(".")[1];
		const decodedPayload = JSON.parse(atob(payload));
		return decodedPayload?.ClassRoomId || null;
	}
	return null;
};

export const getClassRooms = async (data: Classrooms) => {
	try {
		const response = await axios.get<Classrooms[]>(
			`${BASE_URL}/api/ClassRooms`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

export const getAssignmentSubmissionsIds = async () => {
	return (
		await axios.get<Pengumpulan[]>(`${BASE_URL}/api/AssignmentSubmissions`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
	).data.map((assignmentSubmissions) => assignmentSubmissions.id);
};

export const getAssignmentSubmissions = async (assignmentId: number) => {
	try {
		const classRoomId = getClassRoomIdFromToken();
		if (!classRoomId) {
			throw new Error("ClassRoomId not found in token");
		}

		const response = await axios.get<Pengumpulan[]>(
			`${BASE_URL}/api/AssignmentSubmissions/${classRoomId}/${assignmentId}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		console.log(response.data);

		return response.data;
	} catch (error) {
		console.error("Failed to fetch assignment submissions:", error);
		throw new Error("Failed to fetch assignment submissions");
	}
};

export const createAssignmentSubmissions = async (data: Pengumpulan) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/api/AssignmentSubmissions`,
			data,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Failed to post assignments:", error);
		throw new Error("Failed to post assignments");
	}
};

export const getAssignmentById = async (id: number) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/api/AssignmentSubmissions/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch assignment by id:", error);
		throw new Error("Failed to fetch assignment by id");
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

export const editAssignmentSubmission = async (data: any) => {
	try {
		const assignmentId = data.id;
		const studentId = getStudentIdFromToken();
		if (!studentId) {
			throw new Error("StudentId not found in token");
		}
		const response = await axios.put(
			`${BASE_URL}/api/AssignmentSubmissions/student/${studentId}/assignment/${assignmentId}`,
			data,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		console.log(response.data);

		return response.data;
	} catch (error) {
		console.error("Failed to edit assignment submission:", error);
		throw new Error("Failed to edit assignment submission");
	}
};

export const getLessonsIds = async () => {
	try {
		const response = await axios.get<Mapel[]>(`${BASE_URL}/api/Lessons`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
		return response.data
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");		
	}
};

export const getLessons = async (id: number) => {
	try {
		const response = await axios.get<Mapel>(`${BASE_URL}/api/Lessons/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch Lessons:", error);
		throw new Error("Failed to fetch Lessons");
	}
};

export const getSchedulesIds = async () => {
	return (
		await axios.get<Jadwal[]>(`${BASE_URL}/api/Schedules/studentClassRoomId`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
	).data.map((schedules) => schedules);
};


// create jadwal admin
export const createSchedules = async(data:Jadwal)=>{
	try {
		const response = await axios.post(`${BASE_URL}/api/schedules`,data,{
			headers:{
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
		return response.data
	} catch (error) {
		console.error("Failed to post assignments:", error);
		throw new Error("Failed to post assignments");
	}
}

// hapus jadwal
export const deleteSchedule = async (id: string) => {
	try {
		const response = await axios.delete(`${BASE_URL}/api/Schedules/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

// export const getSchedules = async (id: number) => {
// 	try {
// 		const response = await axios.get<Jadwal>(
// 			`${BASE_URL}/api/Schedules/${id}`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
// 				},
// 			}
// 		);
// 		return response.data;
// 	} catch (error) {
// 		console.error("Failed to fetch course:", error);
// 		throw new Error("Failed to fetch course");
// 	}
// };

// export const getAttendancesIds = async () => {
// 	return (
// 		await axios.get<Materi[]>(`${BASE_URL}/api/Attendances`, {
// 			headers: {
// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			},
// 		})
// 	).data.map((course) => course.id);
// };

export const getAttendancesIds = async () => {
	return (
		await axios.get<Kehadiran[]>(`${BASE_URL}/api/Attendances`, {
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
			`${BASE_URL}/api/Attendances/student/${studentId}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch Attendances:", error);
		throw new Error("Failed to fetch Attendances");
	}
};

// export const getCourseClassroomIds = async () => {
// 	return (
// 		await axios.get<Materi[]>(`${BASE_URL}/api/Account/courseclassroom`, {
// 			headers: {
// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			},
// 		})
// 	).data;
// };

export const getCourseClassroom = async () => {
	try {
		const response = await axios.get<CourseClassroom>(
			`${BASE_URL}/api/Courses/studentcourseclassroom`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch courseclassroom:", error);
		throw new Error("Failed to fetch courseclassroom");
	}
};

export const getSiswaIds = async () => {
	try {
		const response = await axios.get<UserSiswa[]>(
			`${BASE_URL}/api/Account/students`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

// get data mapel
export const getSiswa = async (id: string) => {
	try {
		const response = await axios.get<UserSiswa>(
			`${BASE_URL}/api/Account/student/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
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
				`${BASE_URL}/api/Account/seedexcel`,
				formData,
				{
					headers: {
						"Content-Type":
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			console.log(response.data);
			return response.data;
		} else {
			// Handle jika data file tidak ditemukan dalam formData
			console.error("File not found in formData");
			throw new Error("File not found");
		}
	} catch (error) {
		console.error("Error processing file:", error);
		throw new Error("Failed to process file");
	}
};

// edit data siswa
export const editSiswa = async (id: string, data: UserSiswa) => {
	try {
		const response = await axios.put<UserSiswa>(
			`${BASE_URL}/api/Account/edit/student/${id}`,
			data,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Terjadi Kesalahan ketika ");
		throw new Error("Failed to edit data");
	}
};



// get absensi siswa
export const getAbsensi = async () => {
	try {
		const response = await axios.get<Absensi[]>(`${BASE_URL}/api/Attendances`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

export const getTeacherinfo = async () => {
	try {
		const response = await axios.get<IMateriGuru[]>(
			`${BASE_URL}/api/Courses/teachercourses`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch teacherinfo:", error);
		throw new Error("Failed to fetch teacherinfo");
	}
};

export const createMateri = async (data: UploadMateri) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/Courses`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Failed to post materi:", error);
	}
};

export const getClassRoomsByTeacherId = async () => {
	try {
		const response = await axios.get<Ikelas>(
			`${BASE_URL}/api/ClassRooms/classRoomTeacherId`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		// Tangani kesalahan dengan tepat, seperti dengan menampilkan pesan kesalahan atau logging
		console.error("Error fetching class rooms:", error);
		throw error; // lemparkan kembali kesalahan untuk ditangani di tempat lain jika perlu
	}
};

// awal api guru

// get guru
export const getGuru = async () => {
	try {
		const response = await axios.get<UserGuru[]>(
			`${BASE_URL}/api/Account/teachers`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		// Tangani kesalahan dengan tepat, seperti dengan menampilkan pesan kesalahan atau logging
		console.error("Error fetching class rooms:", error);
		throw error; // lemparkan kembali kesalahan untuk ditangani di tempat lain jika perlu
	}
};

// get lesson by id guru
export const getLessonByTeacherId = async () => {
	try {
		const response = await axios.get<Mapel[]>(
			`${BASE_URL}/api/Lessons/lessonTeacherId`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		// Tangani kesalahan dengan tepat, seperti dengan menampilkan pesan kesalahan atau logging
		console.error("Error fetching class rooms:", error);
		throw error; // lemparkan kembali kesalahan untuk ditangani di tempat lain jika perlu
	}
};

// export const getSiswa = async (id: string) => {
// 	try {
// 		const response = await axios.get<UserSiswa>(
// 			`${BASE_URL}/api/Account/student/${id}`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
// 				},
// 			}
// 		);
// 		return response.data;
// 	} catch (error) {
// 		console.log(error);
// 		throw new Error("Failed to get data");
// 	}
// };

// get course by id
export const getCourseById = async (id: string) => {
	try {
		const response = await axios.get<DetailMateri>(
			`${BASE_URL}/api/Courses/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
};

// get guru by id
export const getGuruById = async (id: string)=>{
	try {
		const response = await axios.get<UserGuru>(`${BASE_URL}/api/Account/teacher/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to get data");
	}
}

// create guru
export const createGuru = async (data: UserGuru) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/Account/register/teacher`, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Terjadi Kesalahan ketika ");
		throw new Error("Failed to post data");
	}
};

// akhir api guru
