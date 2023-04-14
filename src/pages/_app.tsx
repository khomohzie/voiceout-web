import type { AppProps } from "next/app";
import GlobalStyles from "@styles/globals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ToastContainer position="top-right" theme="colored" />
      <Component {...pageProps} />
    </>
  );
}
