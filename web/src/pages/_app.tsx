import { SessionProvider } from "next-auth/react";
import '../styles/global.css';
console.log('providers', process.env.GITHUB_ID)
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}