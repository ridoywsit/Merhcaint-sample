import axios from 'axios';

import { API_URL } from 'environment';
import { ApprovalPolicyType } from 'pages/app/settings/approval-policy';
import {
  ApprovalPolicyResponse,
  ApproverResponse,
} from 'types/approvalPolicy.';

export const getApprovalPolicy = (token: string) => {
  return {
    api() {
      return axios
        .get<ApprovalPolicyResponse[]>(`${API_URL}/approval-policies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getApprovalPolicy'];
    },
  };
};
export const updateApprovalPolicy = (token: string) => {
  return {
    api(updatedData: any) {
      return axios
        .put(`${API_URL}/approval-policies/${updatedData?.id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['updateApprovalPolicy'];
    },
  };
};

export const createApprovalPolicy = (token: string) => {
  return {
    api(input: any) {
      return axios
        .post(`${API_URL}/approval-policies`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['createApprovalPolicy'];
    },
  };
};

export const getSupplierApprover = (token: string) => {
  return {
    api() {
      return axios
        .get<ApproverResponse[]>(`${API_URL}/users/approval`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getSupplierApprover'];
    },
  };
};

export const deleteApprovalPolicy = (token: string) => {
  return {
    api(id: number) {
      return axios
        .delete(`${API_URL}/approval-policies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deleteApprovalPolicy'];
    },
  };
};
