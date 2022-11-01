import axios from 'axios';

import { API_URL } from 'environment';

export const getStates = (country: string, formField: string) => {
  return {
    api() {
      const params = new URLSearchParams();
      params.append('country', country);
      return axios
        .get<string[]>(`${API_URL}/find-states?${params.toString()}`)
        .then(({ data }) => data);
    },
    getKey() {
      return ['getStates', country, formField];
    },
  };
};

export const getUnits = (name: string, formField: string) => {
  return {
    api() {
      const params = new URLSearchParams();
      params.append('name', name);
      return axios
        .get<string[]>(`${API_URL}/find-units?${params.toString()}`)
        .then(({ data }) => data);
    },
    getKey() {
      return ['getUnits', name, formField];
    },
  };
};
export type rolesAndPrivileges = {
  privileges: string[];
  roles: string[];
};

export const getRolesList = () => {
  return {
    api() {
      return axios
        .get<rolesAndPrivileges>(`${API_URL}/roles-and-privileges`)
        .then(({ data }) => data);
    },
    getKey() {
      return ['getRolesList'];
    },
  };
};
