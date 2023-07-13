"use client"

import axios from "axios";
// React
import { useState } from "react";
// Components 
import Layout from "../../app/components/Layout";
// Notifications
import { toast, Toaster } from "react-hot-toast";
// Styles
import styles from './page.module.css'
import '../../styles/globals.css'

export default function ResetPassword() {

    const [ email, setEmail ] = useState("");
    const [ formSent, setFormSent ] = useState(false);

    async function handleResetPassword(e) {
        e.preventDefault();

        if(formSent) {
            return;
        }

        if(!email) {
            toast.error("Debes escribir tu correo electrónico");
            return;
        }

        try {
            setFormSent(true);
            await axios.post('/api/users/resetPassword', { email });
            resetForm();
            toast.success("Se han enviado instrucciones a tu email!");
        } catch (error) {
            toast.error("Hubo un error al recuperar tu contraseña");
        }
    }

    function resetForm() {
        setEmail("");
    }

    return (
        <Layout>
            <div className={`${styles.container} grid place-content-center`}>
                <div className={"flex flex-col gap-5 text-center shadow-md p-10 rounded-xl"}>
                    <div className={"text-2xl md:text-4xl font-semibold"}>Recuperar contraseña</div>
                    <form onSubmit={handleResetPassword} className={"flex flex-col items-start gap-5"}>
                        <div className={"flex flex-col items-start gap-1 w-full"}>
                            <label htmlFor="email">Correo electrónico</label>
                            <input className={`${styles.input} py-2`} value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder={"Escribe tu email"} />
                        </div>
                        <button type="submit" className={"py-2 rounded-md bg-primary hover:bg-cyan-800 text-white w-full"}>Recuperar contraseña</button>
                    </form>
                </div>
            </div>
            <Toaster position={"top-right"} />
        </Layout>
    )
}