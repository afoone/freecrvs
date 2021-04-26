import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";
import "semantic-ui-css/semantic.min.css";
import MainLayout from "../components/layout/Layout";
import { Provider as AuthProvider } from "next-auth/client";
import store from "../redux/store";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <div className="ui container">
      <Head>
        <link rel="stylesheet" href="/styles/custom.css"></link>
        <link rel="stylesheet" href="/styles/datepicker-full.css"></link>
        <meta name="application-name" content="FreeCRVS" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Civil Registration and Vital Statistics" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="msapplication-config"
          content="/static/icons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          href="/static/icons/touch-icon-iphone.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/static/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/static/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/manifest.json" />
        <link
          rel="mask-icon"
          href="/static/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://covid19.crvs.gm" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Civil Registration and Vital Statistics" />
        <meta
          name="twitter:image"
          content="https://covid19.crvs.gm/static/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@afoone" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FreeCRVS" />
        <meta property="og:description" content="Civil Registration and Vital Statistics" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://covid19.crvs.gm" />
        <meta
          property="og:image"
          content="https://covid19.crvs.gm/static/icons/apple-touch-icon.png"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider session={pageProps.session}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
