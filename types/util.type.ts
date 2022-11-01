import { components } from 'generatedV2/server.type';

import { UnitCode, unitCodes } from '../utils/constants';

import { Merchant } from './merchant';
import { User } from './user';

export type Address = components['schemas']['Address'];

export type ErrorResponse = components['schemas']['ErrorResponse'];

export interface AuthProps {
  token: string;
  user: User;
  merchantDetails: Merchant;
}

export type DocType =
  | 'PURCHASE_ORDER'
  | 'GOOD_RECEIVED_NOTE'
  | 'INVOICE'
  | 'REMITTANCE_ADVICE';

export type TaxType = 'PERCENT' | 'FIXED';

export type LineItem = {
  id?: number;
  name: string;
  description?: string; // not in frontend
  productCode?: string; // not in frontend
  quantity: number;
  unitCode?: UnitCode;
  currencyCode?: CurrencyCode; //? is at the top, should we repeat?
  price: number;
  discount?: number; // calculated
  amount: number; //?  amount = price * quantity
  taxPercentage?: number;
  discountPercentage?: number; // not in frontend
};

export type Sort = components['schemas']['Sort'];
export type Pageable = components['schemas']['PageableObject'];
export type Pagination = {
  totalElements: number;
  totalPages: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
};
export type S3File = components['schemas']['S3File'];
// #region Currency Code
export type CurrencyCode =
  components['schemas']['PurchaseOrder']['currencyCode'];

// #endregion
