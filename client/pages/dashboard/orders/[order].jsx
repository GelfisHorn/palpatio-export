
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Layout
import Layout from "@/pages/Layout";
// Components
import ClientComponent from '@/app/components/Dashboard/Orders/Order'

export default function DashboardOrder() {

    const router = useRouter();
    const { order: orderId } = router.query;

    const [ order, setOrder ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if(!orderId) return;

        handleFetchOrder();
    }, [orderId])

    async function handleFetchOrder() {
        const config = getConfig();

        try {
            const { data } = await axios.post('/api/orders/getById', { orderId, config });
            setOrder(data);
        } catch (error) {
            // return router.push('/dashboard/orders');
        } finally {
            setLoading(false);
        }
    }

    function getConfig() {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        return config;
    }

    return (
        <Layout title={order._id ? `Orden de ${order.contact.name}` : "Cargando..."}>
            <ClientComponent order={order} setOrder={setOrder} loading={loading} />
        </Layout>
    )
} 