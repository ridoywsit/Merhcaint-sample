import axios from 'axios';

import { API_URL } from 'environment';
import { Grn } from 'types/grn.type';

type GetGrnByIdInput = {
  token: string;
  id: number;
};
export const getGrnById = ({ id, token }: GetGrnByIdInput) => {
  return {
    api() {
      return axios
        .get<Grn>(`${API_URL}/documents/good-received-notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getGrnById', id];
    },
  };
};

type UpdateGrnByIdInput = {
  token: string;
  id: number;
};
export const updateGrnById = ({ id, token }: UpdateGrnByIdInput) => {
  return {
    api(grn: Grn) {
      return axios
        .put(`${API_URL}/documents/good-received-notes/${id}`, grn, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['updateGrnById', id];
    },
  };
};

type DeleteGrnByIdInput = {
  token: string;
  id: number;
};

export const deleteGrnById = ({ token, id }: DeleteGrnByIdInput) => {
  return {
    api() {
      return axios
        .delete(`${API_URL}/documents/good-received-notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deleteGrnById', id];
    },
  };
};

type CreateGrnInput = {
  token: string;
};
export const createGrn = ({ token }: CreateGrnInput) => {
  return {
    api(grn: Grn) {
      return axios
        .post(`${API_URL}/documents/good-received-notes`, grn, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['createGrn'];
    },
  };
};

export const grnDispute = (token: string) => {
  return {
    api(grnId: number) {
      return axios
        .patch(
          `${API_URL}/documents/good-received-notes/${grnId}/dispute`,
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
export const grnUnDispute = (token: string) => {
  return {
    api(grnId: number) {
      return axios
        .patch(
          `${API_URL}/documents/good-received-notes/${grnId}/un-dispute`,
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
export const grnVoid = (token: string) => {
  return {
    api(grnId: number) {
      return axios
        .patch(
          `${API_URL}/documents/good-received-notes/${grnId}/void`,
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
export const grnArchive = (token: string) => {
  return {
    api(grnId: number) {
      return axios
        .patch(
          `${API_URL}/documents/good-received-notes/${grnId}/archive`,
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

export const grnSend = (token?: string) => {
  return {
    api(grnId: number) {
      return axios
        .patch(
          `${API_URL}/documents/good-received-notes/${grnId}/send`,
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
