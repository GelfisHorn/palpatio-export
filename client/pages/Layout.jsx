// Nextjs
import Head from "next/head";
// Notifications
import { Toaster } from "react-hot-toast";

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title} | Pal Patio Export</title>
            </Head>
            {children}
            <Toaster position={"top-right"} />
        </>
    )
}