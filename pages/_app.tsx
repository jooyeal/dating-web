import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "../store";
import Router from "next/router";
import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import BottomNavigation from "../components/BottomNavigation";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowLayout, setIsShowLayout] = useState<boolean>(false);
  useEffect(() => {
    if (Router.pathname !== "/regist" && Router.pathname !== "/login") {
      setIsShowLayout(true);
    } else {
      setIsShowLayout(false);
    }
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {isShowLayout && <Appbar />}
        <Component {...pageProps} />
        {isShowLayout && <BottomNavigation />}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
