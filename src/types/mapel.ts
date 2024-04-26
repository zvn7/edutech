export interface IMapel{
    id:number,
    lessonName:string,
    uniqueNumberOfLesson:string
    classNames :[],
    teacherLesson:[
        {
            nameTeacher:string,
            classNames :[],
        }
    ]
}

export interface Mapel {
	id: number;
	lessonName: string;
	uniqueNumberOfLesson: string;
    className :[],
}

