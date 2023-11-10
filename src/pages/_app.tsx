import "@/_styles/globals.css";
import { inter, roboto_mono } from "../_fonts/fonts";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${roboto_mono.variable}`}>
      <Component {...pageProps} />;
    </main>
  );
}
