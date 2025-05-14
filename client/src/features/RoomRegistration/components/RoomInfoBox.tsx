import { FC } from 'react';
import { RoomDetail } from '../types';

interface RoomInfoBoxProps {
  room: RoomDetail;
}

const RoomInfoBox: FC<RoomInfoBoxProps> = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Thông tin chung</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <span className="font-medium w-32">Mã phòng:</span>
            <span>{room.roomCode}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium w-32">Tòa nhà:</span>
            <span>{room.building}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium w-32">Loại phòng:</span>
            <span>{room.roomType}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <span className="font-medium w-32">Giới tính:</span>
            <span>{room.gender === 'Male' ? 'Nam' : 'Nữ'}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium w-32">Tình trạng:</span>
            <span className={`font-medium ${room.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
              {room.status === 'Available' ? 'Còn trống' : 'Đã đầy'}
            </span>
          </div>
          {room.note && (
            <div className="flex items-center mb-2">
              <span className="font-medium w-32">Ghi chú:</span>
              <span>{room.note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomInfoBox; 