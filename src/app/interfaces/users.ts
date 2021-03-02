export interface Users {
    name: string;
    password: string;
    role?: string;
}

// Login
export interface RootLogin {
    success: boolean;
    user: User;
    token: string;
}
  
export interface User {
    status: boolean;
    _id: string;
    name: string;
    __v: number;
    role: string;
}