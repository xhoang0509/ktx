import { RoomDetail, Semester } from './types';

export const mockRoom: RoomDetail = {
  id: 'room-1',
  roomCode: 'P101',
  building: 'KTX A',
  roomType: '4 người',
  gender: 'Male',
  status: 'Available',
  note: 'Phòng gần cầu thang, có ban công',
  students: [
    {
      id: 'student-1',
      name: 'Nguyễn Văn A',
      studentId: 'SV001',
      className: 'CNTT1'
    },
    {
      id: 'student-2',
      name: 'Trần Văn B',
      studentId: 'SV002',
      className: 'CNTT2'
    }
  ]
};

export const mockSemesters: Semester[] = [
  { id: 'sem-1', name: 'Học kỳ 1 (2023-2024)' },
  { id: 'sem-2', name: 'Học kỳ 2 (2023-2024)' },
  { id: 'sem-3', name: 'Học kỳ hè (2023-2024)' }
]; 