import Head from 'next/head';
import '../styles/globals.css';
import AuthContextProvider from '../context/AuthContextProvider';

//return <Component {...pageProps} />
function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <>
        <Head>
          <title>Confidiary</title>
        </Head>
        <AuthContextProvider>
          {Component.getLayout(<Component {...pageProps} />)}
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
          <Component {...pageProps} />
        </AuthContextProvider>
      </>
    );
  }
}

export default MyApp;
