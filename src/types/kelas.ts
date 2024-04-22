export interface Ikelas {
	teacherId: string;
	lessons: [
		{
			id: string;
			lessonName: string;
			uniqueNumberOfLesson: number;
		}
	];
	classrooms: [
		{
			className: string;
			uniqueNumberOfClassRoom: number;
		}
	];
}
