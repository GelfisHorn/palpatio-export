"use client"

import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Components 
import Layout from "../../app/components/Layout";
import Loading from "@/app/components/Loading";
// Notifications
import { toast, Toaster } from "react-hot-toast";
// Styles
import styles from './page.module.css'
import '../../styles/globals.css'
import Link from "next/link";

export default function NewPassword() {

    const router = useRouter();
    const { token } = router.query;

    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");

    const [ loading, setLoading ] = useState(true);
    const [ isTokenValid, setIsTokenValid ] = useState(false);

    useEffect(() => {
        if(!token) {
            return;
        }

        checkToken(token);
    }, [token]);

    async function checkToken(token) {
        try {
            await axios.post('/api/users/checkToken', { token });
            setIsTokenValid(true);    
        } catch (error) {
            setIsTokenValid(false);
        } finally {
            setLoading(false);
        }
    }

    async function handleNewPassword(e) {
        e.preventDefault();

        if ([password, repeatPassword].includes("")) {
            toast.error("Debes llenar todos los campos");
            return;
        }

        try {
            await axios.post('/api/users/newPassword', { token, password });
            toast.success("Has cambiado tu contraseña!");
            setTimeout(() => {
                router.push('/login')
            }, 3000)
            resetPassword();
        } catch (error) {
            toast.error("Hubo un error al cambiar tu contraseña");
        }
    }

    function resetPassword() {
        setPassword("");
        setRepeatPassword("");
    }

    return (
        <Layout>
            <div className={`${styles.container} grid place-content-center`}>
                <div className={"flex flex-col gap-5 text-center shadow-md p-10 rounded-xl"}>
                    <div className={"text-2xl md:text-4xl font-semibold"}>Nueva contraseña</div>
                    {loading && (
                        <div className={"grid place-content-center"}>
                            <Loading />
                        </div>
                    )}
                    {!loading && !isTokenValid && (
                        <div className={"flex flex-col gap-5"}>
                            <h2 className={"uppercase text-lg text-red-500 font-medium"}>Este enlace ha expirado o no es válido</h2>
                            <Link className={"border-2 border-primary text-primary hover:text-white text-lg font-medium hover:bg-primary transition-colors py-2 px-6 rounded-md"} href={"/"}>Volver a inicio</Link>
                        </div>
                    )}
                    {!loading && isTokenValid && (
                        <form onSubmit={handleNewPassword} className={"flex flex-col items-start gap-5"}>
                            <div className={"flex flex-col gap-2 w-full"}>
                                <div className={"flex flex-col items-start gap-1 w-full"}>
                                    <label htmlFor="password">Contraseña</label>
                                    <input className={`${styles.input} py-2`} value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" placeholder={"Escribe tu contraseña"} />
                                </div>
                                <div className={"flex flex-col items-start gap-1 w-full"}>
                                    <label htmlFor="repeatPassword">Repetir contraseña</label>
                                    <input className={`${styles.input} py-2`} value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="password" id="repeatPassword" placeholder={"Repite tu contraseña"} />
                                </div>
                            </div>
                            <button type="submit" className={"py-2 rounded-md bg-primary hover:bg-cyan-800 text-white w-full"}>Cambiar contraseña</button>
                        </form>
                    )}
                </div>
            </div>
            <Toaster position={"top-right"} />
        </Layout>
    )
}