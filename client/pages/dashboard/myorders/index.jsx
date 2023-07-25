
import Layout from "@/pages/Layout";
import ClientComponent from '@/app/components/Dashboard/MyOrders/Index'

export default function MyOrders() {
    return (
        <Layout title={"Mis ordenes"}>
            <ClientComponent />
        </Layout>
    )
}