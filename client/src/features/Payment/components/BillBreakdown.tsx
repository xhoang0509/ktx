import { Bill } from '../types';

interface BillBreakdownProps {
  bill: Bill;
}

export default function BillBreakdown({ bill }: BillBreakdownProps) {
  const { services } = bill;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-lg font-medium text-gray-900">Chi tiết chi phí</h3>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-700">Giá phòng</span>
          </div>
          <span className="font-medium">{formatCurrency(services.roomFee)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-2">⚡</span>
              <span className="text-gray-700">Tiền điện</span>
            </div>
            <span className="font-medium">{formatCurrency(services.electricity.total)}</span>
          </div>
          <div className="bg-white rounded p-3 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-2">
              <div>Chỉ số đầu: {services.electricity.initialReading}</div>
              <div>Chỉ số cuối: {services.electricity.finalReading}</div>
              <div>Số lượng: {services.electricity.quantity} kWh</div>
              <div>Đơn giá: {formatCurrency(services.electricity.unitPrice)}/kWh</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="text-blue-500 mr-2">💧</span>
              <span className="text-gray-700">Tiền nước</span>
            </div>
            <span className="font-medium">{formatCurrency(services.water.total)}</span>
          </div>
          <div className="bg-white rounded p-3 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-2">
              <div>Chỉ số đầu: {services.water.initialReading}</div>
              <div>Chỉ số cuối: {services.water.finalReading}</div>
              <div>Số lượng: {services.water.quantity} m³</div>
              <div>Đơn giá: {formatCurrency(services.water.unitPrice)}/m³</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">🌐</span>
              <span className="text-gray-700">Internet</span>
            </div>
            <span className="font-medium">{formatCurrency(services.internet.total)}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">🧹</span>
              <span className="text-gray-700">Vệ sinh</span>
            </div>
            <span className="font-medium">{formatCurrency(services.cleaning.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 