"use client"

import { useEffect } from "react";
// Nextjs
import { useRouter } from "next/navigation";
// Components
import { DashboardSidebar } from "./Sidebar";
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Notifications
import { Toaster } from "react-hot-toast";
// Styles
import styles from './Layout.module.css'

export default function DashboardLayout({ tab, children }) {
    
    const { fetchingAuth, auth } = useAppContext();

    const router = useRouter();

    useEffect(() => {
        if(!fetchingAuth && Object.keys(auth).length == 0) {
            return router.push('/login');
        }
    }, [auth, fetchingAuth]);
    
    return (
        <>
            <div className="flex items-start">
                <DashboardSidebar tab={tab} />
                <div className={`${styles.children} h-screen overflow-hidden`}>{children}</div>
            </div>
            <Toaster position={"top-right"} />
        </>
    )
}