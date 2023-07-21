import Head from 'next/head';
import { Providers } from './ContextProviders';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css" />
            </Head>
            <Providers>
                <Component {...pageProps} />
            </Providers>
        </>
    )
}