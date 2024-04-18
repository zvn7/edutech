import { useQuery, useQueries } from "@tanstack/react-query";
import {
	getAssignments,
	getAssignmentsIds,
	getAssignmentSubmissions,
	getAssignmentSubmissionsIds,
	getAttendances,
	getAttendancesIds,
	getCourse,
	getCourseClassroom,
	getCourseClassroomIds,
	getCourseIds,
	getLessons,
	getLessonsIds,
	getSchedulesIds,
	getTeacherinfo,
	getUserSiswa,
} from "./api";
import { CourseClassroom } from "../types/materi";

export function useGetUserSiswa() {
	return useQueries({
		queries: [
			{
				queryKey: ["userSiswa"],
				queryFn: getUserSiswa,
			},
		],
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

export function useAssignments(ids: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["assignments", id],
				queryFn: () => getAssignments(id!),
			};
		}),
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

export function useSchedulesIds() {
	return useQuery({
		queryKey: ["schedules"],
		queryFn: getSchedulesIds,
	});
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