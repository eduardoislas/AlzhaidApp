export interface RootCaregiver {
    success: boolean;
    caregiver: Caregiver[];
    count: number;
}
  
export interface Caregiver {
    status: boolean,
    _id: string,
    name: string, 
    lastName: string,
    lastNameSecond: string,
    birthdate: string,
    age: number,
    gender: string,
    civilStatus: string,
    school: string,
    occupation: string,
    phone: string,
    email: string,
    patient: Patient,
    registerDate: string,
    user: User;
}

export interface User{
    status: boolean;
    _id: string;
    name: string;
    __v: number;
    role: string;
}


export interface Patient {
    img: string;
    _id: string;
    name: string;
    lastName: string;
    lastNameSecond: string;
    phase: string;
  }