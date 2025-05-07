import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(["male", "female", "other"])
    gender: "male" | "female" | "other";

    @IsInt()
    @Min(1)
    max_capacity: number;
}

export class UpdateRoomDto {
    @IsString()
    name?: string;

    @IsEnum(["male", "female", "unisex"])
    gender?: "male" | "female" | "unisex";

    @IsInt()
    @Min(1)
    max_capacity?: number;
}
