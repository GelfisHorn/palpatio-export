"use client"

// React
import { useEffect } from "react";
// Nextjs
import { useRouter } from "next/navigation";
// Components
import Layout from "@/app/components/Dashboard/Layout";

export default function DashboardIndex() {

    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/orders');
    }, [])

    return (
        <Layout tab={"home"}></Layout>
    )
}