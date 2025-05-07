import { VoucherType } from "./dto";

export const defaultAddVoucherForm: VoucherType = {
  name: "",
  code: "",
  discount: 1000,
  isPercentage: false,
  minOrderValue: 1000,
  isActive: false,
  expiryDate: "",
  quantity: 1,
};
export const defaultPagination = {
  page: 1,
  limit: 99,
};
