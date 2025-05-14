import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BookingPayload, Semester } from '../types';
import { Button } from '@heroui/button';

interface BookingFormProps {
  roomId: string;
  semesters: Semester[];
  onSubmit: (data: BookingPayload) => void;
  isDisabled?: boolean;
}

const BookingForm: FC<BookingFormProps> = ({ roomId, semesters, onSubmit, isDisabled = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<BookingPayload>({
    defaultValues: {
      roomId,
      semesterId: '',
      note: ''
    }
  });

  const handleFormSubmit = async (data: BookingPayload) => {
    if (isDisabled || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Gửi yêu cầu đặt phòng</h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="semesterId" className="block text-sm font-medium text-gray-700 mb-1">
            Thời gian đăng ký
          </label>
          <select
            id="semesterId"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.semesterId ? 'border-red-500' : ''
            }`}
            disabled={isDisabled || isSubmitting}
            {...register('semesterId', { required: 'Vui lòng chọn học kỳ' })}
          >
            <option value="">-- Chọn học kỳ --</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
          {errors.semesterId && (
            <p className="mt-1 text-sm text-red-600">{errors.semesterId.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú của sinh viên
          </label>
          <textarea
            id="note"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Mong muốn ở cùng bạn, nhu cầu đặc biệt..."
            disabled={isDisabled || isSubmitting}
            {...register('note')}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            disabled={isDisabled || isSubmitting}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm; 