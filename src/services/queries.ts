import { useQueries, useQuery } from "@tanstack/react-query";
import {
	getAbsensi,
	getAssigmentByClassroomId,
	getAssigmentByTeacherId,
	getClassRooms,
	getCourseById,
	getGuru,
	getLessonByTeacherId,
	getMapel,
	getMapelClassroom,
	getMapelIds,
	getSiswa,
	getSiswaIds,
	getTeacherinfo,
	getUserInfo,
  getGuruById,
  getClassRoomsByTeacherId,
  getSchedulesAdmin,
} from "./api";
import {
	getAssignments,
	getAssignmentsIds,
	getAssignmentSubmissions,
	getAssignmentSubmissionsIds,
	getAttendances,
	getAttendancesIds,
	getCourse,
	getCourseClassroom,
	getCourseIds,
	getLessons,
	getLessonsIds,
	getSchedulesIds,
} from "./api";

// queries get user login
export function useUserLogin() {
	return useQueries({
		queries: [
			{
				queryKey: ["userinfo"],
				queryFn: getUserInfo,
			},
		],
	});
}

//queries get mapel id
export function useGetMapelId() {
	return useQuery({
		queryKey: ["mapel"],
		queryFn: getMapelIds,
	});
}

// queries get mapel
export function useMapel(id: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (id ?? []).map((id) => {
			return {
				queryKey: ["mapel", id],
				queryFn: () => getMapel(id!),
			};
		}),
	});
}

// queries get siswa
export function useGetSiswaId() {
	return useQuery({
		queryKey: ["siswa"],
		queryFn: getSiswaIds,
	});
}

// queries get siswa
// export function useSiswa(id:string){
//    return useQuery({
//     queryKey:["siswa",id],
//     queryFn:()=>getSiswa(id)
//    })
// }

export function useSiswa(ids: (string | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["siswa", { id }],
				queryFn: () => getSiswa(id!),
			};
		}),
	});
}

// get siswa by id
export function useSiswaDetail(id: string) {
	return useQuery({
		queryKey: ["siswa", id],
		queryFn: () => getSiswa(id),
	});
}

// get guru
export function useGetGuru() {
	return useQuery({
		queryKey: ["guru"],
		queryFn: getGuru,
	});
}

// get guru by id
export function useGuruDetail(id:string){
	return useQuery({
		queryKey:["guru",id],
		queryFn:()=>getGuruById(id)
	})
}

// get absensi
export function useGetAbsensi() {
	return useQuery({
		queryKey: ["absensi"],
		queryFn: getAbsensi,
	});
}

export function useCourseIds() {
	return useQuery({
		queryKey: ["course"],
		queryFn: getCourseIds,
	});
}

export function useCourse(ids: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["course", id],
				queryFn: () => getCourse(id!),
			};
		}),
	});
}

export function useAssignmentsIds() {
	return useQuery({
		queryKey: ["assignments"],
		queryFn: getAssignmentsIds,
	});
}

export function useAssignmentsByTeacherId() {
	return useQuery({
		queryKey: ["assignmentsByTeacherId"],
		queryFn: getAssigmentByTeacherId,
	});
}

export function useAssigmentDetail(ids: (string | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["assigmentDetail", id],
				queryFn: () => getAssignments(id!),
			};
		}),
	});
}

export function useAssignments() {
	return useQuery({
		queryKey: ["assignmentsByClassroomId"],
		queryFn: getAssigmentByClassroomId,
	});
}

export function useAssignmentSubmissionsIds() {
	return useQuery({
		queryKey: ["assignmentSubmissions"],
		queryFn: getAssignmentSubmissionsIds,
	});
}

export function useAssignmentSubmissions(
	ids: (number | undefined)[] | undefined
) {
	return useQueries({
		queries: (ids ?? []).map((assignmentId) => {
			return {
				queryKey: ["assignmentSubmissions", assignmentId],
				queryFn: () => getAssignmentSubmissions(assignmentId!),
			};
		}),
	});
}

export function useLessonsIds() {
	return useQuery({
		queryKey: ["lessons"],
		queryFn: getLessonsIds,
	});
}

export function useLessons(ids: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? [])
			.filter((id) => id !== undefined)
			.map((id) => {
				return {
					queryKey: ["lesson", id],
					queryFn: () => getLessons(id!),
				};
			}),
	});
}

export function useLessonsClassroom() {
	return useQuery({
		queryKey: ["lessonsClassroom"],
		queryFn: getMapelClassroom,
	});
}

export function useSchedulesIds() {
	return useQuery({
		queryKey: ["schedules"],
		queryFn: getSchedulesIds,
	});
}

export function useSchedulesAdmin(){
	return useQuery({
		queryKey: ["schedulesAdmin"],
		queryFn : getSchedulesAdmin
	})
}
// export function useSchedules(ids: (number | undefined)[] | undefined) {
// 	return useQueries({
// 		queries: (ids ?? []).map((id) => {
// 			return {
// 				queryKey: ["schedules", id],
// 				queryFn: () => getSchedules(id!),
// 			};
// 		}),
// 	});
// }

// export function useAttendancesIds() {
// 	return useQuery({
// 		queryKey: ["attendances"],
// 		queryFn: getAttendancesIds,
// 	});
// }

export function useAttendancesIds() {
	return useQuery({
		queryKey: ["attendances"],
		queryFn: getAttendancesIds,
	});
}

const getStudentIdFromToken = (): string | null => {
	const token = localStorage.getItem("token");
	if (token) {
		const payload = token.split(".")[1];
		const decodedPayload = JSON.parse(atob(payload));
		return decodedPayload?.StudentId || null;
	}
	return null;
};

export function useAttendances(ids: (number | undefined)[] | undefined = []) {
	const studentId = getStudentIdFromToken(); // Mendapatkan ID siswa dari token atau tempat penyimpanan lainnya
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["attendances", id],
				queryFn: () => getAttendances(studentId),
			};
		}),
	});
}

export function useCourseClassroom() {
	return useQuery({
		queryKey: ["courseclassroom"],
		queryFn: getCourseClassroom,
	});
}

export function useTeacherinfo() {
	return useQuery({
		queryKey: ["teacherinfo"],
		queryFn: getTeacherinfo,
	});
}

// export function useCourseClassroom(ids: (number | undefined)[] | undefined) {
// 	return useQueries({
// 		queries: (ids ?? []).map((id) => {
// 			return {
// 				queryKey: ["courseclassroom", id],
// 				queryFn: () => getCourseClassroom(id!),
// 			};
// 		}),
// 	});
// }

export function useGetMapelByGuru() {
	return useQuery({
		queryKey: ["lessonByTeacher"],
		queryFn: getLessonByTeacherId,
	});
}

// export function useSiswaDetail(id: string) {
// 	return useQuery({
// 		queryKey: ["siswa", id],
// 		queryFn: () => getSiswa(id),
// 	});
// }

export function useCourseById(id: string) {
	return useQuery({
		queryKey: ["course", id],
		queryFn: () => getCourseById(id),
	});
}

export function useGetClassrooms(){
    return useQuery({
        queryKey: ["classrooms"],
        queryFn: getClassRoomsByTeacherId
    })
}

export function useClassrooms(){
	return useQuery({
		queryKey: ["classrooms"],
		queryFn: getClassRooms
	})
}