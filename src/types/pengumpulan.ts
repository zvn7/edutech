export interface Pengumpulan {
	id: string;
	assignmentId: number;
	classroomId: number;
	submissionTime: string;
	status: string;
	submissionTimeStatus: string | undefined;
	link: string;
	grade?: number | undefined;
	comment?: string | undefined;
	fileData: string;
}
