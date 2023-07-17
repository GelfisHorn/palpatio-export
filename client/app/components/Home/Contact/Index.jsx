"use client"

// Notifications
import { toast, Toaster } from 'react-hot-toast'
// Styles
import styles from './Index.module.css'
import { useState } from 'react'
import axios from 'axios';

export default function Contact() {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ message, setMessage ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([name, email, message].includes("")) {
            toast.error("Debes llenar todos los campos");
            return;
        }

        try {
            await axios.post('/api/contact/sendMail', { name, email, message });
            toast.success("Hemos recibido tu mensaje!");
        } catch (error) {
            toast.error("Hubo un error al enviar tu mensaje");
        }
    }

    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <form onSubmit={handleSubmit} className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>Contacto</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>Comunícate con nosotros</h2>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:w-2/3 xl:w-1/2 mx-auto"}>
                    <div className={"flex flex-col gap-1"}>
                        <label htmlFor="name">Tu nombre</label>
                        <input value={name} onChange={e => setName(e.target.value)} className={`${styles.input}`} type="text" name="" id="name" placeholder={"Escribe tu nombre"} />
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <label htmlFor="email">Tu email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className={`${styles.input}`} type="email" name="" id="email" placeholder={"Escribe tu email"} />
                    </div>
                    <div className={"flex flex-col gap-1 md:col-start-1 md:col-end-3"}>
                        <label>Mensaje</label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} className={`${styles.input} resize-none`} rows={5} type="email" name="" placeholder={"Escribe un mensaje"} />
                    </div>
                    <div className={""}>
                        <button className={"flex items-center justify-center gap-2 bg-[#323232] hover:bg-[#252525] transition-colors rounded-[.2rem] text-white py-2 w-full"} type={'submit'}>
                            <span>Enviar Mensaje</span>
                            <i class="fa-regular fa-arrow-right-long text-lg"></i>
                        </button>
                    </div>
                </div>
            </form>
            <Toaster position={"top-right"} />
        </div>
    )
}