import axios from 'axios';

import { API_URL } from 'environment';
import {
  GroupNotificationResponse,
  TopBarNotificationResponse,
} from 'types/notification';

export type GetNotificationInput = {
  page?: string;
  size?: string;
  sort?: string;
  dateFrom?: string;
  dateTo?: string;
  token: string;
};
export const getNotificationsByGroup = ({
  page,
  size,
  sort,
  dateFrom,
  dateTo,
  token,
}: GetNotificationInput) => {
  const defaultDate = new Date().toISOString().split('T')[0];
  const finalPage = page ? page : '0';
  const finalSize = size ? size : '10';
  const finalSort = sort ? sort : 'asc';
  const finalDateFrom = dateFrom ? dateFrom : '2022-10-06';
  const finalDateTo = dateTo ? dateTo : defaultDate;
  const params = new URLSearchParams({
    page: finalPage,
    size: finalSize,
    sort: finalSort,
    dateFrom: finalDateFrom,
    dateTo: finalDateTo,
  }).toString();
  return {
    api() {
      return axios
        .get<GroupNotificationResponse>(
          `${API_URL}/notifications/group?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(({ data }) => data);
    },
    getKey() {
      const page = finalPage ? finalPage : '0';
      const size = finalSize ? finalSize : '10';
      const sort = finalSort ? finalSort : 'asc';
      const dateFrom = finalDateFrom ? finalDateFrom : '';
      const dateTo = finalDateTo ? finalDateTo : '';
      return [
        'getNotificationsByGroup',
        page,
        size,
        sort,
        {
          dateFrom: dateFrom ?? '',
          dateTo: dateTo ?? '',
        },
      ];
    },
  };
};
export const getNotificationsForTopBar = ({
  size,
  token,
}: GetNotificationInput) => {
  const finalSize = size ? size : '5';
  const params = new URLSearchParams({
    size: finalSize,
  }).toString();

  return {
    api() {
      return axios
        .get<TopBarNotificationResponse>(`${API_URL}/notifications?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      const size = finalSize ? finalSize : '5';
      return ['getNotificationsForTopBar', size];
    },
  };
};
