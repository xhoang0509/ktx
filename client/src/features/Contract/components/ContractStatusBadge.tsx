import React from 'react';
import { ContractStatus } from '../types';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationCircleIcon 
} from '@heroicons/react/24/solid';

interface ContractStatusBadgeProps {
  status: ContractStatus;
}

const ContractStatusBadge: React.FC<ContractStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: ContractStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Đang chờ',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: <ClockIcon className="w-4 h-4 mr-1" />
        };
      case 'active':
        return {
          label: 'Đang hiệu lực',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: <CheckCircleIcon className="w-4 h-4 mr-1" />
        };
      case 'terminated':
        return {
          label: 'Đã chấm dứt',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: <XCircleIcon className="w-4 h-4 mr-1" />
        };
      case 'expired':
        return {
          label: 'Đã hết hạn',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: <ExclamationCircleIcon className="w-4 h-4 mr-1" />
        };
      case 'cancelled':
        return {
          label: 'Đã hủy',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: <ExclamationCircleIcon className="w-4 h-4 mr-1" />
        };
      default:
        return {
          label: 'Không xác định',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: <ExclamationCircleIcon className="w-4 h-4 mr-1" />
        };
    }
  };

  const { label, bgColor, textColor, icon } = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {icon}
      {label}
    </span>
  );
};

export default ContractStatusBadge; 