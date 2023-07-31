"use client"

import axios from 'axios';
// React
import { useState } from 'react'
// Notifications
import { toast, Toaster } from 'react-hot-toast'
// Styles
import styles from './Index.module.css'
// Hooks
import useAppContext from '@/app/hooks/useAppContext';
// Locales
import locales from '@/app/langs/components/home/contact';

export default function Contact() {

    const { lang } = useAppContext();

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ message, setMessage ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([name, email, message].includes("")) {
            toast.error(locales[lang].notifications.error.fields);
            return;
        }

        try {
            await axios.post('/api/contact/sendMail', { name, email, message });
            resetForm();
            toast.success(locales[lang].notifications.success);
        } catch (error) {
            toast.error(locales[lang].notifications.error.catch);
        }
    }

    const resetForm = () => {
        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <div className={`${styles.container} py-20 px-6 sm:px-20`}>
            <form onSubmit={handleSubmit} className={"flex flex-col justify-center gap-16 h-full"}>
                <div className={"flex flex-col gap-2 text-center"}>
                    <div className={"uppercase font-bold sm:text-lg text-primary"}>{locales[lang].subtitle}</div>
                    <h2 className={"text-2xl sm:text-4xl font-bold"}>{locales[lang].title}</h2>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:w-2/3 xl:w-1/2 mx-auto"}>
                    <div className={"flex flex-col gap-1"}>
                        <label htmlFor="name">{locales[lang].inputs.name.label}</label>
                        <input value={name} onChange={e => setName(e.target.value)} className={`${styles.input}`} type="text" name="" id="name" placeholder={locales[lang].inputs.name.placeholder} />
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <label htmlFor="email">{locales[lang].inputs.email.label}</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className={`${styles.input}`} type="email" name="" id="email" placeholder={locales[lang].inputs.email.placeholder} />
                    </div>
                    <div className={"flex flex-col gap-1 md:col-start-1 md:col-end-3"}>
                        <label>{locales[lang].inputs.message.label}</label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} className={`${styles.input} resize-none`} rows={5} type="email" name="" placeholder={locales[lang].inputs.message.placeholder} />
                    </div>
                    <div className={""}>
                        <button className={"flex items-center justify-center gap-2 bg-[#323232] hover:bg-[#252525] transition-colors rounded-[.2rem] text-white py-2 w-full"} type={'submit'}>
                            <span>{locales[lang].button}</span>
                            <i className="fa-regular fa-arrow-right-long text-lg"></i>
                        </button>
                    </div>
                </div>
            </form>
            <Toaster position={"top-right"} />
        </div>
    )
}