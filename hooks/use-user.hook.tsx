import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

import { getUser } from 'services/authService';
import { ROUTES } from 'utils/routes';

const useUserHook = () => {
  const { api, getKey } = getUser();
  const router = useRouter();
  const response = useQuery(getKey(), api, {
    onError: (error) => {},
    enabled: false,
  });

  return response;
};

export default useUserHook;
