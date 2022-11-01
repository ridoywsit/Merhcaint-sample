import axios from 'axios';

import { API_URL } from 'environment';
import { Merchant } from 'types/merchant';

type SearchMerchantInput = {
  company: string;
  token: string;
};
export const searchMerchant = ({ token, company }: SearchMerchantInput) => {
  return {
    api() {
      return axios
        .get<Merchant[]>(`${API_URL}/merchants/search?company=${company}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['searchMerchant', company];
    },
  };
};

type GetMerchantById = {
  id: number;
  token: string;
};

export const getMerchantById = ({ token, id }: GetMerchantById) => {
  return {
    api() {
      return axios
        .get<Merchant>(`${API_URL}/merchants/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getMerchantById', id];
    },
  };
};

export const getUserMerchantDetails = (token: string) => {
  return {
    api() {
      return axios
        .get<Merchant>(`${API_URL}/merchants`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getUserMerchantDetails'];
    },
  };
};
export const updateMerchant = (token: string) => {
  return {
    api(input: Merchant) {
      return axios
        .put<Merchant>(`${API_URL}/merchants`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['updateMerchant'];
    },
  };
};
