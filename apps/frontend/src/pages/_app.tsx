import Head from "next/head";
import App, { AppContext } from "next/app";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import { firestore } from "../firebase";
import { Interface, Note } from "../layout";
import { COLLECTION_NAME } from "../constants";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <title>Editor Project</title>
      </Head>
      <CssBaseline />
      <Interface initialNotes={pageProps.initialNotes}>
        <Component {...pageProps} />
      </Interface>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const q = query(
    collection(firestore, COLLECTION_NAME),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  const initialNotes: Array<Note> = [];

  querySnapshot.forEach((doc) => {
    const { name, title } = doc.data();
    initialNotes.push({ name, title });
  });

  return {
    ...appProps,
    pageProps: { ...appProps.pageProps, initialNotes },
  };
};

export default MyApp;
