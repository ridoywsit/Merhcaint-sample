import axios from 'axios';

import { API_URL } from 'environment';
import { components, operations } from 'generatedV2/server.type';
import useAddressString from 'hooks/use-address.hook';
import { Address, Pagination } from 'types/util.type';

export type AddressListResponse = Pagination & {
  content: Address[];
};

export type GetAddressInput = {
  page?: string;
  size?: string;
  sort?: string;
  token?: string;
  merchantId: string | undefined;
};
export const getAddressList = ({
  page,
  size,
  sort,
  token,
  merchantId,
}: GetAddressInput) => {
  const finalMerchantId = merchantId ? merchantId : '';
  const finalPage = page ? page : '0';
  const finalSize = size ? size : '10';
  const finalSort = sort ? sort : 'asc';
  const params = new URLSearchParams({
    merchantId: finalMerchantId,
    page: finalPage,
    size: finalSize,
    sort: finalSort,
  }).toString();
  return {
    api() {
      return axios
        .get<AddressListResponse>(`${API_URL}/addresses?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      const page = finalPage ? finalPage : '0';
      const size = finalSize ? finalSize : '10';
      const sort = finalSort ? finalSort : 'asc';
      return ['getAddressList', page, size, sort];
    },
  };
};

export const createNewAddress = (token: string) => {
  return {
    api(address: Address) {
      return axios
        .post(`${API_URL}/addresses`, address, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['createNewAddress'];
    },
  };
};
export const updateAddress = (token: string) => {
  return {
    api(address: Address) {
      return axios
        .put(`${API_URL}/addresses/${address.id}`, address, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['updateAddress'];
    },
  };
};

export const deleteAddress = (token: string) => {
  return {
    api(id: number) {
      return axios
        .delete(`${API_URL}/addresses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deleteAddress'];
    },
  };
};

export const getAddressListForDropdown = ({
  token,
  merchantId,
  size,
}: GetAddressInput) => {
  const finalMerchantId = merchantId ? merchantId : '';
  const finalSize = size ? size : '50';
  const params = new URLSearchParams({
    merchantId: finalMerchantId,
    size: finalSize,
  }).toString();
  return {
    api() {
      return axios
        .get<AddressListResponse>(`${API_URL}/addresses?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          let newAddressList = [];
          for (let i = 0; i < data?.content?.length; i++) {
            const element = data?.content[i];
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const addressString = useAddressString(element);
            newAddressList.push({ label: addressString, value: element });
          }
          return newAddressList;
        });
    },
    getKey() {
      const merchantId = finalMerchantId ? finalMerchantId : '0';
      const finalSizeForKey = finalSize ? finalSize : '50';
      return ['getAddressListForDropdown', merchantId, finalSizeForKey];
    },
  };
};
