import axios from 'axios';

import { API_URL } from 'environment';
import { TeamInvitation } from 'types/teams.type';
import { Pagination } from 'types/util.type';

export type TeamInvitationListInput = {
  page?: string;
  size?: string;
  sort?: 'asc' | 'desc';
};
export type TeamInvitationListResponse = Pagination & {
  content: TeamInvitation[];
};

export type GetTeamInvitationListInput = TeamInvitationListInput & {
  token: string;
  searchTxt?: string | null;
  invitedOnly?: 'true' | 'false';
  joinedOnly?: 'true' | 'false';
};

export const getTeamInvitationList = ({
  token,
  page = '0',
  size = '10',
  sort = 'asc',
  searchTxt,
  invitedOnly = 'false',
  joinedOnly = 'false',
}: GetTeamInvitationListInput) => {
  const params = new URLSearchParams({
    page: page,
    size: size,
    sort: sort,
  });
  let data: any = {
    invitedOnly: invitedOnly === 'true' ? true : false,
    joinedOnly: joinedOnly === 'true' ? true : false,
  };
  if (searchTxt != null) {
    data = {
      ...data,
      searchTxt: searchTxt,
    };
  }

  return {
    api() {
      const paramString = params.toString();
      return axios
        .post<TeamInvitationListResponse>(
          `${API_URL}/team-invitations/search?${paramString}`,
          data,
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
        'getTeamInvitationList',
        page,
        size,
        sort,
        searchTxt,
        invitedOnly,
        joinedOnly,
      ];
    },
  };
};

export const teamInvitationRequest = (token: string) => {
  return {
    api(teamInfo: Array<TeamInvitation>) {
      return axios
        .post(
          `${API_URL}/team-invitations`,

          teamInfo,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['teamInvitationRequest'];
    },
  };
};

export type CancelTeamInviteInput = {
  email: string;
  code: string;
};

export const cancelTeamInvite = (token: string) => {
  return {
    api(cancelInvite: CancelTeamInviteInput) {
      return axios
        .post(`${API_URL}/team-invitations/reject`, cancelInvite, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['cancelTeamInvite'];
    },
  };
};

export const reInviteTeamInvitation = (token: string) => {
  return {
    api(userId: number) {
      return axios
        .post(
          `${API_URL}/team-invitations/${userId}/re-invite`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      return ['reInviteTeamInvitation'];
    },
  };
};

export const deleteTeamInvitation = (token: string) => {
  return {
    api(teamInvitationId: number) {
      return axios
        .delete(`${API_URL}/team-invitations/${teamInvitationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['deleteTeamInvitation'];
    },
  };
};

export type TeamInvitationJoinInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  code: string;
  profilePic?: File;
};

export const joinTeamInvitation = () => {
  return {
    api(input: TeamInvitationJoinInput) {
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        if (value != null) {
          formData.append(key, value);
        }
      });
      return axios
        .post(`${API_URL}/team-invitations/join`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['joinTeamInvitation'];
    },
  };
};

type CheckTeamInviteStatusInput = {
  email: string;
  code: string;
};

export const checkTeamInviteStatus = () => {
  return {
    api(input: CheckTeamInviteStatusInput) {
      const paramString = new URLSearchParams({
        email: input.email,
        code: input.code,
      }).toString();

      return axios
        .get<boolean>(`${API_URL}/team-invitations/status?${paramString}`)
        .then(({ data }) => data);
    },
    getKey() {
      return ['checkTeamInviteStatus'];
    },
  };
};
