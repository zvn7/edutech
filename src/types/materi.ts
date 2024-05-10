export interface CourseClassroom {
  id: number;
  courseId: number;
  nameTeacher: string;
  lessonName: string;
  courseName: string;
  description: string;
  fileName: string;
  linkCourse: string;
  className: string;
  longClassName: string;
  fileData: string;
  createdAt: Date;
}

export interface IMateriGuru {
  courseId: string;
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
  FileData: File | string;
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
