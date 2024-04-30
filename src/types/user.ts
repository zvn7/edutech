
export interface UserLogin{
  nameStudent: string,
  nameTeacher: string,
  nis: string,
  nip:string,
  birthDate: string,
  birthPlace: string,
  address: string,
  phoneNumber: string,
  parentName: string,
  gender: number,
  username: string,
  role: number,
  className: string,
  uniqueNumber: string
}

export interface UserGuru {
  id: string;
  status: string;
  nameTeacher: string;
  userName:string,
  password:string,
  birthDate: string;
  birthPlace: string;
  address: string;
  phoneNumber: string;
  nip: string;
  gender: string;
  lessonNames: string[];
  classNames: string[];
}


export interface UserSiswa{
  id:string,
  nis:string,
  nameStudent: string,
  password:string,
  birthDate:string,
  birthPlace: string,
  address: string,
  phoneNumber: string,
  parentName: string,
  gender: number,
  className:string,
  uniqueNumberOfClassRoom: string
}