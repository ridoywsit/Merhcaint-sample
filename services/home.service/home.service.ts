import axios from 'axios';

import { API_URL } from 'environment';

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  companyName?: string;
  message?: string;
};

export const sendContact = () => {
  return {
    async api(data: Contact) {
      return axios
        .post(`${API_URL}/contact`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.data);
    },
  };
};

export const demoRequest = () => {
  return {
    async api(data: Contact) {
      return axios
        .post(`${API_URL}/contact/demo-request`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.data);
    },
  };
};
