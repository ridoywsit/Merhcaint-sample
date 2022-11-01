import axios from 'axios';

import { API_URL } from 'environment';
import { Data } from 'lib/excel/excel.type';
import {
  Invitation,
  InvitationAcceptPayload,
  InvitationSearchInput,
  InvitationStatus,
  InvitationType,
} from 'types/invitation.type';
import { Pagination } from 'types/util.type';

export type InvitationResponse = Pagination & {
  content: Invitation[];
};

export type SendInvitationInput = {
  email: string;
  companyName: string;
};

export const sendInvitation = (token: string) => {
  return {
    api(data: SendInvitationInput[]) {
      return axios.post(`${API_URL}/invitations`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  };
};

export type UploadExcelFileInput = {
  file: File;
};

export type UploadExcelFileResponse = Data;

export const uploadExcelFile = (token: string) => {
  return {
    api(data: UploadExcelFileInput) {
      const formData = new FormData();
      formData.append('file', data.file);
      return axios
        .post<UploadExcelFileResponse>(`/api/excel`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data);
    },
  };
};
export type AcceptInvitationInput = InvitationAcceptPayload & {
  invitationId: number;
};

export const acceptInvitation = (token?: string) => {
  return {
    api({ invitationId, customerId, supplierId }: AcceptInvitationInput) {
      return axios.patch(
        `${API_URL}/invitations/${invitationId}/accept`,
        {
          supplierId,
          customerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
  };
};

export const rejectInvitation = (token: string) => {
  return {
    api(id: number) {
      return axios.delete(`${API_URL}/invitations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  };
};

export const disconnectConnection = (token: string) => {
  return {
    api(id: number) {
      return axios.delete(`${API_URL}/invitations/${id}/disconnect`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  };
};

export type SearchInvitation = {
  company: string;
  token: string;
};

export const getInviteCode = (token: string) => {
  return {
    api() {
      return axios
        .get<string>(`${API_URL}/invitations/code`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['getInviteCode'];
    },
  };
};

type AcceptInviteCode = {
  token: string;
};

export const acceptInviteCode = ({ token }: AcceptInviteCode) => {
  return {
    api(code: string) {
      return axios.post(
        `${API_URL}/invitations/code/${code}/connect`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
  };
};

export type GetInvitationStatusTextInput = {
  status: InvitationStatus;
  type?: InvitationType;
};
export const getInvitationStatusText = ({
  status,
  type,
}: GetInvitationStatusTextInput) => {
  switch (status) {
    case 'PENDING':
      return type === 'SENT' ? 'INVITATION SENT' : 'PENDING CONNECTION';
    case 'ACCEPTED':
      return 'CONNECTED';

    default:
      return type;
  }
};

export type GetAllInvitationInput = {
  token?: string;
  page?: string;
  size?: string;
  sort?: string;
  search: InvitationSearchInput;
};

export const getAllInvitation = ({
  token,
  page,
  size,
  sort,
  search,
}: GetAllInvitationInput) => {
  const params = new URLSearchParams({
    page: page ? page : '0',
    size: size ? size : '10',
    sort: sort ? sort : 'asc',
  });
  return {
    api() {
      return axios
        .post<InvitationResponse>(
          `${API_URL}/invitations/search?${params.toString()}`,
          { ...search },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },

    getKey() {
      return [
        'getAllInvitation',
        page,
        size,
        sort,
        search.searchTxt ?? null,
        search.status ?? null,
        search.type ?? null,
      ] as any[];
    },
  };
};
