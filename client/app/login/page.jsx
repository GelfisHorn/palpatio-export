"use client"

import axios from 'axios'
// React
import { useState } from 'react'
// Nextjs
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
// Components
import Layout from '../components/Layout'
// Notifications
import { toast, Toaster } from 'react-hot-toast'
// Styles
import styles from './page.module.css'
// Context
import useAppContext from "@/app/hooks/useAppContext";

export default function Login() {
    
    const router = useRouter();

    const { auth, setAuth } = useAppContext();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(Object.keys(auth).length != 0) {
            return;
        }

        if([email, password].includes("")) {
            toast.error("Debes llenar todos los campos");
            return;
        }
        
        try {
            const { data } = await axios.post("/api/users/login", { email, password });
            resetForm();
            setAuth(data);
            localStorage.setItem('auth-token', data.token);
            toast.success("Redireccionando...");
            toast.success("Has iniciado sesión correctamente!");
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000)
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Hubo un error al iniciar sesión");
        }
    }

    function resetForm() {
        setEmail("");
        setPassword("");
    }
    
    return (
        <Layout>
            <div className={`${styles.container} flex items-center px-6 sm:px-20 lg:px-0`}>
                <div className={"hidden lg:block w-full lg:w-1/2"}> 
                    <div className={`${styles["image-container"]}`}>
                        <Image className={`${styles.image}`} src={"/register/register.webp"} fill alt={"Register image"} />
                    </div>
                </div>
                <div className={"flex items-center justify-center w-full lg:w-1/2"}>
                    <form onSubmit={handleSubmit} className={"flex flex-col gap-8 w-full lg:w-2/3"}>
                        <div className={"text-4xl font-bold text-center uppercase text-primary"}>Inicia sesión</div>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"flex flex-col gap-1"}>
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} className={`${styles.input}`} type="email" id="email" placeholder={"Escribe tu email"} />
                            </div>
                            <div className={"flex flex-col gap-1"}>
                                <label htmlFor="password">Contraseña</label>
                                <input value={password} onChange={e => setPassword(e.target.value)} className={`${styles.input}`} type="password" id="password" placeholder={"Escribe tu contraseña"} />
                            </div>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <button disabled={Object.keys(auth).length != 0 ? true : false} className={`py-3 w-full rounded-md text-white font-semibold text-lg ${Object.keys(auth).length != 0 ? "cursor-not-allowed bg-[#0e7490c7]" : "bg-primary"}`} type={"submit"}>{Object.keys(auth).length != 0 ? "Ya iniciaste sesión" : "Iniciar sesión"}</button>
                            <div className={"flex flex-col xl:flex-row items-center justify-between"}>
                                <Link className={"hover:text-primary transition-colors"} href={"/register"}>¿No tienes cuenta? registrate</Link>
                                <Link className={"hover:text-primary transition-colors"} href={"/reset-password"}>Recuperar contraseña</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster position={"top-right"} />
        </Layout>
    )
}