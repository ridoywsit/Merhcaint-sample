import axios from 'axios';

import { API_URL } from 'environment';
import {
  Customer,
  CustomerSearch,
  CustomerSearchInput,
  CustomerSearchResponse,
} from 'types/customer.type';
import { Pageable, Pagination } from 'types/util.type';

export type GetCustomerById = {
  id: number;
  token: string;
};

export const getCustomerById = ({ id, token }: GetCustomerById) => {
  return {
    api() {
      return axios
        .get<Customer>(`${API_URL}/customers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
    getKey() {
      return ['getCustomerById', id];
    },
  };
};

export const createCustomer = (token?: string) => {
  return {
    api(input: Customer) {
      return axios
        .post<Customer>(`${API_URL}/customers`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
  };
};

export const updateCustomers = (token?: string) => {
  return {
    api(input: Customer) {
      return axios
        .put<Customer>(`${API_URL}/customers/${input.id}`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
  };
};

export type DeleteCustomer = {
  token: string;
};

export const deleteCustomer = ({ token }: DeleteCustomer) => {
  return {
    api(id: number) {
      return axios
        .delete<Customer>(`${API_URL}/customers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
  };
};

export interface CustomerWithType extends CustomerSearchResponse {
  type: 'CUSTOMER';
}

export type CustomersSearchResponse = Pagination & {
  content: CustomerWithType[];
};

export type CustomerSearchInputParams = CustomerSearchInput & {
  token?: string;
};

export const customerSearchApi = ({
  token,
  page,
  size,
  searchTxt,
  mapped,
}: CustomerSearchInputParams) => {
  const params = new URLSearchParams({
    page: page ? page.toString() : '0',
    size: size ? size.toString() : '10',
    ...(mapped != null ? { mapped: String(mapped) } : {}),
    searchTxt: searchTxt ? searchTxt : '',
  });
  return {
    api() {
      return axios
        .get<CustomersSearchResponse>(
          `${API_URL}/customers/search?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          const { content, ...rest } = response.data;
          return {
            ...rest,
            content: content.map((customer) => {
              const data: CustomerWithType = { ...customer, type: 'CUSTOMER' };
              return data;
            }),
          };
        });
    },
    getKey() {
      return ['customerSearchApi', page, size, searchTxt ?? null];
    },
  };
};

export const customerSearchApiDTO = ({
  token,
  page,
  size,
  searchTxt,
  mapped,
}: CustomerSearchInputParams) => {
  const params = new URLSearchParams({
    page: page ? page.toString() : '0',
    size: size ? size.toString() : '10',
    ...(mapped != null ? { mapped: String(mapped) } : {}),
    searchTxt: searchTxt ? searchTxt : '',
  });
  return {
    api() {
      return axios
        .get<CustomersSearchResponse>(
          `${API_URL}/customers/search-dto?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          const { content, ...rest } = response.data;
          return {
            ...rest,
            content: content.map((customer) => {
              const data: CustomerWithType = { ...customer, type: 'CUSTOMER' };
              return data;
            }),
          };
        });
    },
    getKey() {
      return ['customerSearchApiDTO', page, size, searchTxt ?? null];
    },
  };
};
