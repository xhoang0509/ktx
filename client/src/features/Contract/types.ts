import { RoomDetail } from "@features/RoomRegistration/types";

export type ContractStatus = "pending" | "active" | "terminated" | "expired" | "cancelled";

export interface Contract {
    id: string;
    createdAt: string;
    start_date: string;
    end_date: string;
    duration: number; // in months
    status: ContractStatus;
    roomId: string;
    room: RoomDetail;
}

//   {
//     id: '1',
//     createdAt: '2024-01-15T08:30:00Z',
//     start_date: '2024-02-01T00:00:00Z',
//     end_date: '2024-07-31T23:59:59Z',
//     duration: 6,
//     status: 'active',
//     roomId: 'room1',
//     room: {
//       id: 'room1',
//       roomCode: 'A101',
//       building: 'Tòa nhà A',
//       roomType: 'Phòng 4 người'
//     }
//   },
//   {
//     id: '2',
//     createdAt: '2023-07-10T10:15:00Z',
//     start_date: '2023-08-01T00:00:00Z',
//     end_date: '2024-01-31T23:59:59Z',
//     duration: 6,
//     status: 'expired',
//     roomId: 'room2',
//     room: {
//       id: 'room2',
//       roomCode: 'B205',
//       building: 'Tòa nhà B',
//       roomType: 'Phòng 2 người'
//     }
//   },
//   {
//     id: '3',
//     createdAt: '2024-05-20T14:45:00Z',
//     start_date: '2024-06-01T00:00:00Z',
//     end_date: '2024-12-31T23:59:59Z',
//     duration: 7,
//     status: 'pending',
//     roomId: 'room3',
//     room: {
//       id: 'room3',
//       roomCode: 'C310',
//       building: 'Tòa nhà C',
//       roomType: 'Phòng 6 người'
//     }
//   },
//   {
//     id: '4',
//     createdAt: '2023-09-05T09:20:00Z',
//     start_date: '2023-10-01T00:00:00Z',
//     end_date: '2024-03-31T23:59:59Z',
//     duration: 6,
//     status: 'terminated',
//     roomId: 'room4',
//     room: {
//       id: 'room4',
//       roomCode: 'D415',
//       building: 'Tòa nhà D',
//       roomType: 'Phòng 4 người'
//     }
//   }
// ];
