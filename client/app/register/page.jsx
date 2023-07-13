"use client"

import axios from 'axios'
// React
import { useState } from 'react'
// Nextjs
import Image from 'next/image'
import Link from 'next/link'
// Components
import Layout from '../components/Layout'
// Notifications
import { toast, Toaster } from 'react-hot-toast'
// Styles
import styles from './page.module.css'

export default function Register() {
    
    const [ name, setName ] = useState("");
    const [ surname, setSurname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([name, email, password, repeatPassword].includes("")) {
            toast.error("Debes llenar todos los campos");
            return;
        }

        if (password != repeatPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        try {
            await axios.post("/api/users/register", { name, surname, email, password });
            resetForm();
            toast.success("Has creado tu cuenta correctamente!");
        } catch (error) {
            toast.error("Hubo un error al crear tu cuenta");
        }
    }

    function resetForm() {
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
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
                        <div className={"text-4xl font-bold text-center uppercase text-primary"}>Crea tu cuenta</div>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"flex flex-col gap-1"}>
                                <label htmlFor="name">Nombre</label>
                                <input value={name} onChange={e => setName(e.target.value)} className={`${styles.input}`} type="text" id="name" placeholder={"Escribe tu nombre"} />
                            </div>
                            <div className={"flex flex-col gap-1"}>
                                <label htmlFor="surname">Apellido</label>
                                <input value={surname} onChange={e => setSurname(e.target.value)} className={`${styles.input}`} type="text" id="surname" placeholder={"Escribe tu apellido"} />
                            </div>
                            <div className={"flex flex-col gap-1"}>
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={e => setEmail(e.target.value)} className={`${styles.input}`} type="email" id="email" placeholder={"Escribe tu email"} />
                            </div>
                            <div className={"flex flex-col gap-1"}>
                                <label htmlFor="password">Contraseña</label>
                                <input value={password} onChange={e => setPassword(e.target.value)} className={`${styles.input}`} type="password" id="password" placeholder={"Escribe tu contraseña"} />
                            </div>
                            <div className={"flex flex-col gap-1"}>
                                <label htmlFor="repeatPassword">Repetir contraseña</label>
                                <input value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} className={`${styles.input}`} type="password" id="repeatPassword" placeholder={"Repite tu contraseña"} />
                            </div>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <button className={"py-3 w-full rounded-md bg-primary text-white font-semibold text-lg"} type={"submit"}>Crear cuenta</button>
                            <div>
                                <Link className={"hover:text-primary transition-colors"} href={"/login"}>¿Ya tienes cuenta? inicia sesión</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster position={"top-right"} />
        </Layout>
    )
}