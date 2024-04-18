
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

export interface UserGuru{
  id:string,
  teacherId:string,
  nameTeacher: string,
  birthDate:string,
  birthPlace: string,
  address: string,
  phoneNumber: string,
  nip: string,
  username: string,
  password: string,
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