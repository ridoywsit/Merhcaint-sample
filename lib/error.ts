import axios, { AxiosError } from 'axios';

import { ErrorResponse } from 'types/util.type';

export const isAxiosError = (
  error: any,
): error is AxiosError<ErrorResponse> => {
  return axios.isAxiosError(error);
};
