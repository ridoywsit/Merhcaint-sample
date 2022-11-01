import axios from 'axios';

import { API_URL } from 'environment';
import { User } from 'types/user';

export const getUserFromApi = (token: string) => {
  return {
    api: () =>
      axios
        .get<User>(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    getKey: () => ['user'],
  };
};

export type UpdateUserInput = {
  user: User;
  token: string;
};

export const updateUser = ({ user, token }: UpdateUserInput) =>
  axios
    .put<User>(`${API_URL}/users`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export type UpdateUserPasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export const updateUserPassword = (token: string) => {
  return {
    api: (input: UpdateUserPasswordInput) =>
      axios
        .patch(`${API_URL}/users/password`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  };
};

export type SearchByMerchantEmailInput = {
  email: string;
  token: string;
};

export type GetUserByIdInput = {
  userId: number;
  token: string;
};

export const getUserById = ({ userId, token }: GetUserByIdInput) => {
  return {
    api: () =>
      axios
        .get(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    getKey: () => ['userById', userId],
  };
};

export const activateUser = (token: string) => {
  return {
    api: (id: number) =>
      axios
        .patch(
          `${API_URL}/users/${id}/activate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => res.data),
    getKey: () => ['activateUser'],
  };
};

export const deactivateUser = (token: string) => {
  return {
    api: (id: number) =>
      axios
        .patch(
          `${API_URL}/users/${id}/deactivate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => res.data),
    getKey: () => ['deactivateUser'],
  };
};

export type AssignRoleInput = {
  id: number;
  roles: string[];
};

export const assignUserRole = (token: string) => {
  return {
    api: ({ id, roles }: AssignRoleInput) =>
      axios
        .patch(
          `${API_URL}/users/${id}/roles`,
          { roles },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => res.data),
    getKey: () => ['assignUserRole'],
  };
};
