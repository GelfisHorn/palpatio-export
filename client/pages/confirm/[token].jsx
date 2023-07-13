
import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
// Components 
import Layout from "../../app/components/Layout";
import Loading from "@/app/components/Loading";
// Styles
import styles from './page.module.css'
import '../../styles/globals.css'

export default function ConfirmAccount() {

    const router = useRouter();
    const { token } = router.query;

    const [ loading, setLoading ] = useState(true);
    const [ confirmed, setConfirmed ] = useState(false);

    useEffect(() => {
        if(!token) {
            return;
        }
        (async () => {
            await confirmToken(token);
        })();
    }, [token]);

    const confirmToken = async (token) => {
        try {
            await axios.post('/api/users/confirm', { token });
            setConfirmed(true);
        } catch (error) {
            setConfirmed(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <div className={`${styles.container} grid place-content-center`}>
                <div className={"flex flex-col gap-5 text-center shadow-md p-10 rounded-xl"}>
                    <div className={"text-2xl md:text-4xl font-semibold"}>Confirmación de cuenta</div>
                    {loading && (
                        <div className={"grid place-content-center"}>
                            <Loading />
                        </div>
                    )}
                    {!loading && !confirmed && (
                        <div className={"flex flex-col gap-4"}>
                            <div className={"uppercase font-semibold text-red-500 text-xl"}>Este enlace ha expirado o no existe</div>
                            <Link className={"border-2 border-primary text-primary hover:text-white text-lg font-medium hover:bg-primary transition-colors py-2 px-6 rounded-md"} href={"/"}>Volver a inicio</Link>
                        </div>
                    )}
                    {!loading && confirmed && (
                        <div className={"flex flex-col gap-4"}>
                            <div className={"uppercase font-semibold text-primary text-xl"}>Has confirmado tu cuenta!</div>
                            <Link className={"border-2 border-primary text-primary hover:text-white text-lg font-medium hover:bg-primary transition-colors py-2 px-6 rounded-md"} href={"/login"}>Inicia sesión</Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}