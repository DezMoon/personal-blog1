import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import "../styles/global.css";
import "../styles/auth.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
