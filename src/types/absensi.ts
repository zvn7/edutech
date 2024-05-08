export interface Absensi {
  studentId: string;
  nameStudent: string;
  uniqueNumberOfClassRoom: string;
  attendanceStudent: [
    {
      attendanceId: string;
      status: number;
      date: string;
    }
  ];
}

export interface CreateAbsensi {
  date: string;
  attendanceStudentCreate: Array<{ studentId: string; status: number }> | undefined;
}

export interface AttendancesCalculate {
  presentCount: number;
  excusedCount: number;
  absentCount: number;
}
