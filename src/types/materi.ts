export interface CourseClassroom {
	classroomId: string;
	className: string;
	courses: [
		{
			id: number;
			nameTeacher: string;
			lessonName: string;
			courseName: string;
			description: string;
			fileName: string;
			linkCourse: string;
			uniqueNumberOfLesson: [string];
			fileData: string;
			createdAt: Date;
		}
	];
}

export interface IMateriGuru {
	id: string;
	nameTeacher: string;
	lessonName: string;
	courseName: string;
	description: string;
	fileName: string;
	linkCourse: string;
	className: string;
	longClassName: string;
	fileData: string;
}

export interface UploadMateri {
	id: string;
	CourseName: string;
	Description: string;
	FileData: string;
	LinkCourse: string;
	LessonName: string;
	TeacherId: string;
}

export interface EditMateri {
	id: string;
	CourseName: string;
	Description: string;
	FileData: string;
	LinkCourse: string;
	LessonName: string;
	TeacherId: string;
}

export interface DetailMateri {
	id: string;
	nameTeacher: string;
	courseName: string;
	description: string;
	fileName: string;
	linkCourse: string;
	className: string;
	fileData: string;
	lessonName: string;
	longClassName: string;
}
