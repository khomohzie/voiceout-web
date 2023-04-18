import type { AppProps } from "next/app";
import GlobalStyles from "@styles/globals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <GlobalStyles />
      <ToastContainer position="top-right" theme="colored" />
      <Component {...pageProps} />
    </Provider>
  );
}
