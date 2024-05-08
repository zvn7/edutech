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

export interface Classrooms{
    id:string,
	classRoomId:string,
    className:string,
    longClassName:string,
    uniqueNumberOfClassRoom:string
}