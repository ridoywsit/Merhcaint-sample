import axios from 'axios';

import { API_URL } from 'environment';
import { Feedback } from 'types/feedback.type';

export const getFeedbacks = (token: string) => {
  return {
    api: () =>
      axios
        .get(`${API_URL}/feedbacks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    getKey: () => ['getFeedbacks'],
  };
};

export const postFeedbacks = (token: string) => {
  return {
    api(input: Feedback) {
      return axios
        .post(`${API_URL}/feedbacks`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return [postFeedbacks];
    },
  };
};
