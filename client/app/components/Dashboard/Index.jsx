"use client"

// React
import { useEffect } from "react";
// Nextjs
import { useRouter } from "next/navigation";
// Components
import Layout from "@/app/components/Dashboard/Layout";
// Hooks
import useAppContext from "@/app/hooks/useAppContext";

const REDIRECT = {
    "admin": "/dashboard/orders",
    "client": "/dashboard/myorders"
}

export default function DashboardIndex() {

    const { auth } = useAppContext();

    const router = useRouter();

    useEffect(() => {
        if(!auth.permissions) {
            return;
        }
        router.push(REDIRECT[auth.permissions]);
    }, [auth])

    return (
        <Layout tab={"home"}></Layout>
    )
}