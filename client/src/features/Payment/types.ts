export interface User {
  id: string;
  full_name: string;
  student_id: string;
  email: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  price: number;
}

export interface ServiceDetail {
  id: string;
  name: string;
  initialReading?: number;
  finalReading?: number;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Bill {
  id: string;
  code: string;
  room: Room;
  user: User;
  services: {
    roomFee: number;
    electricity: ServiceDetail;
    water: ServiceDetail;
    internet: ServiceDetail;
    cleaning: ServiceDetail;
  };
  totalAmount: number;
  createdAt: string;
  status: 'pending' | 'paid' | 'overdue';
}

export interface BillsState {
  bills: Bill[];
  loading: boolean;
  error: string | null;
} 