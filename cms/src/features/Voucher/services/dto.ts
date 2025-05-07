export type VoucherType = {
  name: string;
  code: string;
  discount: number;
  isPercentage: boolean;
  minOrderValue: number;
  isActive: boolean;
  expiryDate: string;
  quantity: number;
};
