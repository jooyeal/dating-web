import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "../store";
import { GetServerSideProps } from "next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx);
  return {
    props: {},
  };
};

export default MyApp;
