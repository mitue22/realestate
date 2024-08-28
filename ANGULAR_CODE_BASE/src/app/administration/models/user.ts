export interface User {
  id: number;
  fullName: string;
  fullNameAr: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  roleName: string;
  costCenterId: number;
  company: string;
  bank: string;
  glAccountIndex: number;
  glAccountCode: string;
  balance: number;
  prettyCashAmount: number;
  limitPerItem: number;
  allowOverrideLimit: boolean;
  transactionLimit: number;
  status: boolean;
  changePasswordRequired: boolean;
  isChangePassword: boolean;
  costCenterIds: number[];
}

export interface Role {
  id: number;
  name: string;
}
