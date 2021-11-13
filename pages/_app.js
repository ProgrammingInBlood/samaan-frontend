import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Provider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(pageProps.session);
  return (
    <Provider session={session}>
      <AnimatePresence exitBeforeEnter>
        <ReduxProvider store={store}>
          <Component {...pageProps} updateSession={setSession} />
        </ReduxProvider>
      </AnimatePresence>
    </Provider>
  );
}