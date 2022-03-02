import Head from 'next/head';
import '../styles/globals.css';
import AuthContextProvider from '../context/AuthContextProvider';
import ModalContextProvider from '@/context/ModalContextProvider';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

//return <Component {...pageProps} />
function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <>
        <Head>
          <title>Creator</title>
        </Head>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <ModalContextProvider>
              {Component.getLayout(<Component {...pageProps} />)}
            </ModalContextProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Confidiary</title>
        </Head>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <ModalContextProvider>
              <Component {...pageProps} />
            </ModalContextProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </>
    );
  }
}

export default MyApp;
