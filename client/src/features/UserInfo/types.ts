export interface UserDetail {
  avatar?: string;
  full_name: string;
  username: string;
  student_id: string;
  gender: string;
  phone?: string;
  faculty_name: string;
  class_code: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export const mockUserData: UserDetail = {
  avatar: 'https://i.pravatar.cc/300',
  full_name: 'Nguyễn Văn A',
  username: 'nguyenvana',
  student_id: 'SV12345',
  gender: 'Nam',
  phone: '0987654321',
  faculty_name: 'Công nghệ thông tin',
  class_code: 'IT2019',
  status: 'active',
  createdAt: '2023-09-01T08:00:00Z',
  updatedAt: '2024-05-15T10:30:00Z'
}; 