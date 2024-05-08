interface Student {
  studentId: string;
  studentName: string;
  className: string;
  longClassName: string;
}

interface AssignmentSubmissionData {
  alreadyGrades: string;
  notAlreadyGrades: string;
  notYetSubmit: string;
  assignmentSubmissionList: [
    {
      id: string;
      submissionTime: string;
      status: string;
      submissionTimeStatus: string;
      link: string;
      grade: number;
      comment: string;
      assignmentId: string;
      assignmentName: string;
      studentId: string;
      studentName: string;
      className: string;
      fileData: string;
    }
  ];
  studentNotYetSubmit: [
    {
      studentId: string;
      studentName: string;
      className: string;
      longClassName: string;
    }
  ];
}
