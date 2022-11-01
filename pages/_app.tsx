import 'styles/globals.css';
import 'styles/nProgress.css';
import 'styles/calendar.css';
import 'styles/date-range-picker.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; //

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useState } from 'react';

import MerchaintToast from 'components/MerchaintToast';
import { defaultQueryClient } from 'services/util';

interface ExtendedAppProps extends AppProps {
  pageProps: {
    dehydratedState: any;
  };
}

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const [queryClient] = useState(() => defaultQueryClient);

  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  // Use the layout defined at the page level, if available
  const getLayout = (Component as any).getLayout || ((page: any) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
        <MerchaintToast />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
