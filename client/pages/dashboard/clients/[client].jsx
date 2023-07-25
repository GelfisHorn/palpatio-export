
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Layout
import Layout from "@/pages/Layout";
// Components
import ClientComponent from '@/app/components/Dashboard/Clients/Client'
// Notifications
import { toast } from "react-hot-toast";

export default function DashboardOrder() {

    const router = useRouter();
    const { client: clientId } = router.query;

    const [ client, setClient ] = useState({});
    const [ orders, setOrders ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (!clientId) return;

        handleFetchOrder();
    }, [clientId])

    async function handleFetchOrder() {
        const config = getConfig();

        try {
            const { data } = await axios.post('/api/dashboard/clients/getById', { id: clientId, config });
            setClient(data.client);
            setOrders(data.orders);
        } catch (error) {
            toast.error("Hubo un error al obtener al usuario")
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
        <Layout title={client._id ? `${client.name} ${client.surname}` : "Cargando..."}>
            <ClientComponent clientState={{ get: client, set: setClient}} ordersState={{ get: orders, set: setOrders }} loading={loading} />
        </Layout>
    )
} 