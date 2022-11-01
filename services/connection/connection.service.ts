import { createQueryKeys } from '@lukemorales/query-key-factory';
import axios from 'axios';

import { API_URL } from 'environment';
import { Customer } from 'types/customer.type';
import { Merchant } from 'types/merchant';
import { Supplier } from 'types/supplier.type';

type SearchMerchantInput = {
  company: string;
  token: string;
};

const connectionKeys = createQueryKeys('connections', {
  getMappedCustomer: (merchantId?: number) => ({
    merchantId,
    type: 'customer',
  }),
  getMappedSupplier: (merchantId?: number) => ({
    merchantId,
    type: 'supplier',
  }),
});

export const searchConnectedMerchant = ({
  token,
  company,
}: SearchMerchantInput) => {
  return {
    api() {
      return axios
        .get<Merchant[]>(
          `${API_URL}/connections/merchant/search?company=${company}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['searchMerchant', company];
    },
  };
};

export type GetMappedCustomerInput = {
  token?: string;
  merchantId?: number;
};

export const getMappedCustomer = ({
  token,
  merchantId,
}: GetMappedCustomerInput) => {
  return {
    api() {
      return axios
        .get<Customer>(
          `${API_URL}/connections/get-mapped-customer?anotherMerchantId=${merchantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return connectionKeys.getMappedCustomer(merchantId);
    },
  };
};

export type GetMappedSupplierInput = {
  token?: string;
  merchantId: number;
};
export const getMappedSupplier = ({
  token,
  merchantId,
}: GetMappedSupplierInput) => {
  return {
    api() {
      return axios
        .get<Supplier>(
          `${API_URL}/connections/get-mapped-supplier?anotherMerchantId=${merchantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return connectionKeys.getMappedSupplier(merchantId);
    },
  };
};

export type UpdateMappingInput = {
  merchantId: number;
  customerId?: number;
  supplierId?: number;
};
export const updateMapping = (token?: string) => {
  return {
    api({ merchantId, customerId, supplierId }: UpdateMappingInput) {
      return axios
        .patch(
          `${API_URL}/connections/${merchantId}/mapping`,
          {
            customerId,
            supplierId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
  };
};
