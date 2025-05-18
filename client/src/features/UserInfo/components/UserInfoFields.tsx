import React from 'react';
import { UserDetail } from '../types';
import moment from 'moment';
import { getGender } from '@utils/gender.util';

interface UserInfoFieldsProps {
  user: UserDetail;
}

interface InfoFieldProps {
  label: string;
  value: string | React.ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  const displayValue = value || '-';
  
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium">{displayValue}</p>
    </div>
  );
};

const UserInfoFields: React.FC<UserInfoFieldsProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    return dateString ? moment(dateString).format('DD/MM/YYYY') : '-';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoField label="Họ và tên" value={user.full_name} />
      <InfoField label="Tên đăng nhập" value={user.username} />
      <InfoField label="Mã sinh viên" value={user.student_id} />
      <InfoField label="Giới tính" value={getGender(user.gender)} />
      <InfoField label="Số điện thoại" value={user.phone || 'Chưa có thông tin'} />
      <InfoField label="Khoa" value={user.faculty_name} />
      <InfoField label="Lớp" value={user.class_code} />
      <InfoField 
        label="Trạng thái" 
        value={
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
          </span>
        } 
      />
      <InfoField label="Ngày tạo tài khoản" value={formatDate(user.createdAt)} />
      <InfoField label="Ngày cập nhật thông tin" value={formatDate(user.updatedAt)} />
    </div>
  );
};

export default UserInfoFields; 