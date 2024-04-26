export interface Absensi{
    id:string,
    studentId:string,
    nameStudent: string,
    uniqueNumberOfClassRoom: string,
    attendanceStudent:[
        {
          status:number, 
          date:string, 
        }
    ],
}