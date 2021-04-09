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
