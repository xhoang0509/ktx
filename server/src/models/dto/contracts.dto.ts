import { IsInt, IsString, IsDateString, Min } from "class-validator";

export class CreateContractDto {
    @IsInt()
    roomId: number;

    @IsDateString()
    start_date: string;

    @IsDateString()
    end_date: string;

    @IsInt()
    @Min(1) // Đảm bảo hợp đồng ít nhất là 1 tháng
    duration: number;
}




export interface UpdateContractStatusDto {
    status: "pending" | "active" | "terminated" | "expired";
}
