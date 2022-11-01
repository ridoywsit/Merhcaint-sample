import axios from 'axios';

import { API_URL } from 'environment';
import { RemittanceAdvice } from 'types/remittance.type';
import { Pagination } from 'types/util.type';

export type CreateRemittanceInput = {
  token: string;
};
export const createRemittanceAdvice = ({ token }: CreateRemittanceInput) => {
  return {
    api(remittanceAdvice: RemittanceAdvice) {
      return axios
        .post<{ timeStamp: string; status: number; message: string }>(
          `${API_URL}/documents/remittance-advices`,
          { ...remittanceAdvice },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['createRemittance'];
    },
  };
};

export type UpdateRemittanceInput = {
  token: string;
  id: number;
};

export const updateRemittanceAdvice = ({
  token,
  id,
}: UpdateRemittanceInput) => {
  return {
    api(remittanceAdvice: RemittanceAdvice) {
      return axios
        .put<{ timeStamp: string; status: number; message: string }>(
          `${API_URL}/documents/remittance-advices/${id}`,
          { ...remittanceAdvice },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['createRemittance'];
    },
  };
};

export interface GetRemittanceAdviceListResult extends Pagination {
  content: RemittanceAdvice[];
}

export const getRemittanceAdviceList = ({ token }: { token: string }) => {
  return {
    api() {
      return axios
        .get<GetRemittanceAdviceListResult>(
          `${API_URL}/documents/remittance-advices`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getRemittanceAdviceList'];
    },
  };
};

export type GetRemittanceAdviceById = {
  token: string;
  documentId: number;
};
export const getRemittanceAdviceById = ({
  token,
  documentId,
}: GetRemittanceAdviceById) => {
  return {
    api() {
      return axios
        .get<RemittanceAdvice>(
          `${API_URL}/documents/remittance-advices/${documentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['getRemittanceAdviceList', documentId];
    },
  };
};

export const deleteRemittanceAdvice = ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  return {
    api() {
      return axios
        .delete(`${API_URL}/documents/remittance-advices/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deleteRemittanceAdvice'];
    },
  };
};

export const remittanceDispute = (token: string) => {
  return {
    api(remittanceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/remittance-advices/${remittanceId}/dispute`,
          undefined,
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
export const remittanceUnDispute = (token: string) => {
  return {
    api(remittanceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/remittance-advices/${remittanceId}/un-dispute`,
          undefined,
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
export const remittanceVoid = (token: string) => {
  return {
    api(remittanceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/remittance-advices/${remittanceId}/void`,
          undefined,
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
export const remittanceArchive = (token: string) => {
  return {
    api(remittanceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/remittance-advices/${remittanceId}/archive`,
          undefined,
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
export const remittanceSend = (token?: string) => {
  return {
    api(remittanceId: number) {
      return axios
        .patch(
          `${API_URL}/documents/remittance-advices/${remittanceId}/send`,
          undefined,
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
