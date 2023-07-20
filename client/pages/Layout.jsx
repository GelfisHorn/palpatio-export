// Nextjs
import Head from "next/head";
// Context
import { AppContextProvider } from "@/app/context/AppContext";
// Notifications
import { Toaster } from "react-hot-toast";

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title} | Pal Patio Export</title>
            </Head>
            <AppContextProvider>
                {children}
                <Toaster position={"top-right"} />
            </AppContextProvider>
        </>
    )
}