import { Html, Head, Main, NextScript } from 'next/document'
import { AppContextProvider } from "@/app/context/AppContext";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css" />
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css" />
            </Head>
            <body>
                <AppContextProvider>
                    <Main />
                    <NextScript />
                </AppContextProvider>
            </body>
        </Html>
    )
}