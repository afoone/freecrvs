import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";
import "semantic-ui-css/semantic.min.css";
import MainLayout from "../components/layout/Layout";

function App({ Component, pageProps }) {
  return (
    <div className="ui container">
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
          integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ=="
          crossOrigin="anonymous"
        /> */}
        <link rel="stylesheet" href="/styles/custom.css"></link>
        <link rel="stylesheet" href="/styles/datepicker-full.css"></link>
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
  );
}

export default App;
