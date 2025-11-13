export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: File | null;
    role: string;
}

export interface RegisterFormType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    file: File | null,
    role: string;
}