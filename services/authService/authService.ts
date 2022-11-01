import axios from 'axios';

import { API_URL } from 'environment';
import { Merchant } from 'types/merchant';
import { Role } from 'types/roles';
import { User } from 'types/user';

const getUserKey = () => ['user'];

const getUser = () => {
  return {
    api() {
      return axios.get<LoginUserResponse>('/api/user').then((res) => res.data);
    },
    getKey() {
      return ['user', 'session'];
    },
  };
};

export type RegisterUserInput = {
  userDetails: User;
  merchantDetails: Merchant;
  inviteCode?: string;
  acceptCode?: string;
};

const registerUser = (input: RegisterUserInput) => {
  const params = new URLSearchParams();
  if (input.inviteCode != null) {
    params.append('invitationCode', input.inviteCode);
  }

  if (input.acceptCode != null) {
    params.append('acceptedInvitationId', input.acceptCode);
  }
  return axios
    .post<string>(`${API_URL}/auth/register?${params.toString()}`, input)
    .then(({ data }) => data);
};
registerUser.getKey = () => ['registerUser'];

export type LoginUserInput = {
  username: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
  merchantDetails: Merchant;
  user: User;
  roles: Role[];
};

const loginUser = (input: LoginUserInput) =>
  axios
    .post<LoginUserResponse>(`${API_URL}/auth/login`, input)
    .then(({ data }) => data);
loginUser.getKey = () => ['loginUser'];

export type ActivateUserInput = {
  email: string;
  token: string;
};

const activateUser = (input: ActivateUserInput) =>
  axios.post(`${API_URL}/auth/activate`, input).then(({ data }) => data);
activateUser.getKey = () => ['activateUser'];

const resetPasswordEmail = (email: string) =>
  axios
    .post(`${API_URL}/auth/forgot-password/${email}`)
    .then(({ data }) => data);
resetPasswordEmail.getKey = () => ['resetPasswordEmail'];

export type ResetPasswordInput = {
  email: string;
  token: string;
  password: string;
};

const resetPassword = (input: ResetPasswordInput) =>
  axios
    .post<string>(`${API_URL}/auth/reset-password`, input)
    .then(({ data }) => data);
resetPassword.getKey = () => ['resetPassword'];

const sessionLogin = (input: LoginUserResponse) =>
  axios.post<User>('/api/login', input).then((res) => res.data);

const sessionLogout = () =>
  axios.post<{}>('/api/logout').then((res) => res.data);

const sessionInfo = () => {
  return {
    api() {
      return axios.get<LoginUserResponse>('/api/user').then((res) => res.data);
    },
    getKey() {
      return ['user', 'session'];
    },
  };
};

const checkEmail = (email: string) =>
  axios.get(`${API_URL}/auth/valid-check/${email}`).then((data) => data);

export {
  getUser,
  registerUser,
  activateUser,
  loginUser,
  resetPasswordEmail,
  resetPassword,
  sessionLogin,
  sessionLogout,
  sessionInfo,
  checkEmail,
};
