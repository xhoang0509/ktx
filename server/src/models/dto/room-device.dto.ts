export class CreateRoomDeviceDto {
    roomId: number;
    deviceId: number;
    quantity: number;
    condition: string;
}

export class UpdateRoomDeviceDto {
    quantity?: number;
    condition?: string;
}