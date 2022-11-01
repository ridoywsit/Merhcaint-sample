import axios from 'axios';

import { API_URL } from 'environment';
import {
  Supplier,
  SupplierSearch,
  SupplierSearchInput,
  SupplierSearchResponse,
} from 'types/supplier.type';
import { Pageable, Pagination } from 'types/util.type';

export type GetSupplierById = {
  id: number;
  token?: string;
};

export const getSupplierById = ({ id, token }: GetSupplierById) => {
  return {
    api() {
      return axios
        .get<Supplier>(`${API_URL}/suppliers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
    getKey() {
      return ['getSupplierById', id];
    },
  };
};

export const createSupplier = (token?: string) => {
  return {
    api(input: Supplier) {
      return axios
        .post<Supplier>(`${API_URL}/suppliers`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
  };
};

export const updateSuppliers = (token?: string) => {
  return {
    api(input: Supplier) {
      return axios
        .put<Supplier>(`${API_URL}/suppliers/${input.id}`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
  };
};

export type DeleteSupplier = {
  token?: string;
};

export const deleteSupplier = ({ token }: DeleteSupplier) => {
  return {
    api(id: number) {
      return axios
        .delete<Supplier>(`${API_URL}/suppliers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
    },
  };
};

export interface SupplierWithType extends SupplierSearchResponse {
  type: 'SUPPLIER';
}

export type SuppliersSearchResponse = Pagination & {
  content: SupplierWithType[];
};

export type SupplierSearchInputParams = SupplierSearchInput & {
  token?: string;
};

export const supplierSearchApi = ({
  token,
  page,
  size,
  sort,
  searchTxt,
  mapped,
}: SupplierSearchInputParams) => {
  const params = new URLSearchParams({
    page: page ? page.toString() : '0',
    size: size ? size.toString() : '0',
    ...(mapped != null ? { mapped: String(mapped) } : {}),
    searchTxt: searchTxt ? searchTxt : '',
  });
  return {
    api() {
      return axios
        .get<SuppliersSearchResponse>(
          `${API_URL}/suppliers/search?${params.toString()}`,
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
            content: content.map((supplier) => {
              const data: SupplierWithType = { ...supplier, type: 'SUPPLIER' };
              return data;
            }),
          };
        });
    },
    getKey() {
      return ['supplierSearchApi', page, size, sort, searchTxt ?? null];
    },
  };
};

export const supplierSearchApiWithDTO = ({
  token,
  page,
  size,
  sort,
  searchTxt,
  mapped,
}: SupplierSearchInputParams) => {
  const params = new URLSearchParams({
    page: page ? page.toString() : '0',
    size: size ? size.toString() : '0',
    ...(mapped != null ? { mapped: String(mapped) } : {}),
    searchTxt: searchTxt ? searchTxt : '',
  });
  return {
    api() {
      return axios
        .get<SuppliersSearchResponse>(
          `${API_URL}/suppliers/search-dto?${params.toString()}`,
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
            content: content.map((supplier) => {
              const data: SupplierWithType = { ...supplier, type: 'SUPPLIER' };
              return data;
            }),
          };
        });
    },
    getKey() {
      return ['supplierSearchApiWithDTO', page, size, sort, searchTxt ?? null];
    },
  };
};
