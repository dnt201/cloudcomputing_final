import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import "@common/styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
