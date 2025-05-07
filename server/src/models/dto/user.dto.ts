export class CreateUserDto {
    username: string;
    password: string;
}

export class UpdateUserDto {
    full_name?: string;
    phone?: string;
    student_id?: string;
    gender?: string;
}

export class LoginUserDto {
    username: string;
    password: string;
}
