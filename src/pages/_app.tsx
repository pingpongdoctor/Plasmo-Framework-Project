import "@/_styles/globals.css";
import { inter, roboto_mono } from "../_fonts/fonts";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} ${roboto_mono.variable}`}>
      <Component {...pageProps} />;
    </main>
  );
}
