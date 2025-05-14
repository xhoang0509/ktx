import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import RoomInfoBox from '../components/RoomInfoBox';
import RoomMembers from '../components/RoomMembers';
import BookingForm from '../components/BookingForm';
import { BookingPayload, RoomDetail, Semester } from '../types';
import { mockRoom, mockSemesters } from '../mockData';

const Booking: FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  console.log({roomId})
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    // Mock data loading
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be API calls
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data
        setRoom({
          ...mockRoom,
          id: roomId || mockRoom.id
        });
        setSemesters(mockSemesters);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [roomId]);

  const handleBookingSubmit = async (data: BookingPayload) => {
    // In a real app, this would be an API call
    console.log('Booking submitted:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message (in a real app, you'd use a toast notification)
    alert('Yêu cầu đặt phòng đã được gửi thành công!');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-gray-700">Không tìm thấy thông tin phòng</h2>
        <button
          onClick={handleBack}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Đặt phòng nội trú</h1>
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Quay lại
        </button>
      </div>

      <div className="space-y-6">
        <RoomInfoBox room={room} />
        <RoomMembers students={room.students} />
        <BookingForm 
          roomId={room.id} 
          semesters={semesters} 
          onSubmit={handleBookingSubmit} 
          isDisabled={room.status === 'Full'} 
        />
      </div>
    </div>
  );
};

export default Booking; 