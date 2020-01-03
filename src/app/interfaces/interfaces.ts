export interface Users {
    name: string;
    password: string;
    role?: string;
}

export interface Patients {
    name: string;
    lastName: string;
    birthdate: any;
    lastNameSecond?: string;
    registerDate?: any;
    img?: any;
}